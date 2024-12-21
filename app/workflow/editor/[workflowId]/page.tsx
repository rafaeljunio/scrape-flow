import { auth } from '@clerk/nextjs/server'
import React from 'react'

// import { waitFor } from '@/lib/helper/wait-for'
import prisma from '@/lib/prisma'

import { Editor } from './_components/editor'

const EditorPage = async ({ params }: { params: { workflowId: string } }) => {
  const { workflowId } = params

  const { userId } = auth()

  if (!userId) {
    return <div>unauthenticated</div>
  }

  // await waitFor(5000)

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  })

  if (!workflow) {
    return <div>Workflow not found</div>
  }

  return <Editor workflow={workflow} />
}

export default EditorPage
