'use server'

import { auth } from '@clerk/nextjs/server'

import prisma from '@/lib/prisma'

export async function GetWorkflowsForUser() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthenticated user')
  }

  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createAt: 'asc',
    },
  })
}
