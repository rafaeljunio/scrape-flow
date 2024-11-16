import { AlertCircle, InboxIcon } from 'lucide-react'
import React, { Suspense } from 'react'

import { GetWorkflowsForUser } from '@/actions/workflows/get-workflows-for-user'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

import CreateWorkflowDialog from './_components/create-workflow-dialog'

const Page = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  )
}

const UserWorkflowsSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  )
}

const UserWorkflows = async () => {
  const workflows = await GetWorkflowsForUser()
  if (!workflows) {
    return (
      <Alert variant={'destructive'}>
        <AlertCircle className="size-4" />
        <AlertTitle>Something went wrong. Please try again later</AlertTitle>
      </Alert>
    )
  }

  if (!workflows.length) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent size-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>

        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button bellow to create your first workflow.
          </p>
        </div>

        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    )
  }

  return <div>&nbsp;</div>
}

export default Page
