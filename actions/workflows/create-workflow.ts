'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'
import {
  createWorkflowSchema,
  type CreateWorkflowSchemaType,
} from '@/schema/workflow'
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

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: 'TODO',
      ...data,
    },
  })

  if (!result) {
    throw new Error('failed to create workflow')
  }

  redirect(`/workflow/editor/${result.id}}`)
}
