import 'server-only'

import type { ExecutionPhase } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import type { AppNode } from '@/types/app-node'
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from '@/types/workflow'

import { waitFor } from '../helper/wait-for'
import prisma from '../prisma'
import { TaskRegistry } from './task/registry'

export async function ExecuteWorkflow(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: { id: executionId },
    include: { workflow: true, phases: true },
  })

  if (!execution) {
    throw new Error('execution not found')
  }

  const environment = {
    phases: {},
  }

  await initializeWorkflowExecution(executionId, execution.workflowId)
  await initializePhaseStatuses(execution)

  const creditsConsumed = 0
  let executionFailed = false
  for (const phase of execution.phases) {
    // await waitFor(3000)
    const phaseExecution = await executeWorkflowPhase(phase)
    if (!phaseExecution.success) {
      executionFailed = true
      break
    }
  }

  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creditsConsumed,
  )

  revalidatePath('/workflows/runs')
}

async function initializeWorkflowExecution(
  executionId: string,
  workflowId: string,
) {
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  })

  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executionId,
    },
  })
}

async function initializePhaseStatuses(execution: any) {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase: any) => phase.id),
      },
    },
    data: {
      status: ExecutionPhaseStatus.PENDING,
    },
  })
}

async function finalizeWorkflowExecution(
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
  creditsConsumed: number,
) {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED

  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed,
    },
  })

  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executionId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((err) => {})
}

async function executeWorkflowPhase(phase: ExecutionPhase) {
  const startedAt = new Date()
  const node = JSON.parse(phase.node) as AppNode

  // Update phase status
  await prisma.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
    },
  })

  const creditsRequired = TaskRegistry[node.data.type].credits
  console.log(
    `Executing phase ${phase.name} with ${creditsRequired} credits required`,
  )

  // TODO: decrement user balance (with required credits)

  // Execute phase simulation
  await waitFor(2000)
  const success = Math.random() < 0.7

  await finalizePhase(phase.id, success)
  return { success }
}

async function finalizePhase(phaseId: string, success: boolean) {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED

  await prisma.executionPhase.update({
    where: {
      id: phaseId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
    },
  })
}
