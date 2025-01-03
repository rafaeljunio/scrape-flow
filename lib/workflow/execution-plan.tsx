import { type Edge, getIncomers } from '@xyflow/react'

import type { AppNode, AppNodeMissingInputs } from '@/types/app-node'
import type {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from '@/types/workflow'

import { TaskRegistry } from './task/registry'

// biome-ignore lint/style/useEnumInitializers: <explanation>
export enum FlowToExecutionPlanValidationError {
  'NO_ENTRY_POINT',
  'INVALID_INPUTS',
}

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan
  error?: {
    type: FlowToExecutionPlanValidationError
    invalidElements?: AppNodeMissingInputs
  }
}

export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[],
): FlowToExecutionPlanType {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint,
  )

  if (!entryPoint) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
      },
    }
  }

  const inputsWithErrors: AppNodeMissingInputs[] = []
  const planned = new Set<string>()

  const invalidInputs = getInvalidInputs(entryPoint, edges, planned)
  if (invalidInputs.length > 0) {
    inputsWithErrors.push({})
  }

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ]

  planned.add(entryPoint.id)

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] }

    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue
      }

      const invalidInputs = getInvalidInputs(currentNode, edges, planned)

      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges)
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          console.error('invalid inputs', currentNode.id, invalidInputs)
          throw new Error('TODO: HANDLE ERROR 1')
        }
        continue
      }

      nextPhase.nodes.push(currentNode)
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id)
    }
    executionPlan.push(nextPhase)
  }

  return { executionPlan }
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs = []
  const inputs = TaskRegistry[node.data.type].inputs
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name]
    const inputValueProvided = inputValue?.length > 0
    if (inputValueProvided) {
      continue
    }

    const incomingEdges = edges.filter((edge) => edge.target === node.id)

    const inputEdgedByOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name,
    )

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputEdgedByOutput &&
      planned.has(inputEdgedByOutput.source)

    if (requiredInputProvidedByVisitedOutput) {
      continue
    } else if (!input.required) {
      if (!inputEdgedByOutput) {
        continue
      }

      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue
      }
    }

    invalidInputs.push(input.name)
  }

  return invalidInputs
}
