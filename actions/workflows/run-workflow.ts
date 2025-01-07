'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'
import { ExecuteWorkflow } from '@/lib/workflow/execute-workflow'
import { FlowToExecutionPlan } from '@/lib/workflow/execution-plan'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import {
  ExecutionPhaseStatus,
  type WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from '@/types/workflow'

export async function RunWorkflow(form: {
  workflowId: string
  flowDefinition?: string
}) {
  const { userId } = auth()

  if (!userId) {
    throw new Error('unauthenticated')
  }

  const { workflowId, flowDefinition } = form
  if (!workflowId) {
    throw new Error('workflowId is required')
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  })

  if (!workflow) {
    throw new Error('workflow not found')
  }

  // biome-ignore lint/style/useConst: <explanation>
  let executionPlan: WorkflowExecutionPlan
  if (!flowDefinition) {
    throw new Error('flow definition is not defined')
  }

  const flow = JSON.parse(flowDefinition)
  const result = FlowToExecutionPlan(flow.nodes, flow.edges)
  if (result.error) {
    throw new Error('flow definition not valid')
  }

  if (!result.executionPlan) {
    throw new Error('no execution plan generated')
  }

  // eslint-disable-next-line prefer-const
  executionPlan = result.executionPlan

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            }
          })
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  })

  if (!execution) {
    throw new Error('workflow execution not created')
  }

  ExecuteWorkflow(execution.id)
  redirect(`/workflow/runs/${workflowId}/${execution.id}`)
}
