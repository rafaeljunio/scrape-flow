'use server'

import { auth } from '@clerk/nextjs/server'
import type { Edge } from '@xyflow/react'
import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'
import { CreateFlowNode } from '@/lib/workflow/create-flow-node'
import {
  createWorkflowSchema,
  type CreateWorkflowSchemaType,
} from '@/schema/workflow'
import type { AppNode } from '@/types/app-node'
import { TaskType } from '@/types/task'
import { WorkflowStatus } from '@/types/workflow'

export async function CreateWorkflow(form: CreateWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form)

  if (!success) {
    throw new Error('invalid form data')
  }

  const { userId } = auth()

  if (!userId) {
    throw new Error('unauthenticated user')
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  }

  // Let's add the flow entry point
  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  })

  if (!result) {
    throw new Error('failed to create workflow')
  }

  redirect(`/workflow/editor/${result.id}}`)
}
