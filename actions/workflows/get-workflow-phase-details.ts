'use server'

import { auth } from '@clerk/nextjs/server'

import prisma from '@/lib/prisma'

export async function GetWorkflowPhaseDetails(phaseId: string) {
  const { userId } = auth()

  if (!userId) {
    throw new Error('unauthenticated')
  }

  return prisma.executionPhase.findUnique({
    where: {
      id: phaseId,
      execution: {
        userId,
      },
    },
  })
}
