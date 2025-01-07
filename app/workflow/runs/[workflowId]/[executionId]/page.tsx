import { auth } from '@clerk/nextjs/server'
import { Loader2Icon } from 'lucide-react'
import { Suspense } from 'react'

import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/get-workflow-execution-with-phases'
import { TopBar } from '@/app/workflow/_components/topbar/top-bar'

import { ExecutionViewer } from './_components/execution-viewer'

const ExecutionViewerPage = ({
  params,
}: {
  params: { executionId: string; workflowId: string }
}) => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <TopBar
        workflowId={params.workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${params.executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <Loader2Icon className="size-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={params.executionId} />
        </Suspense>
      </section>
    </div>
  )
}

export default ExecutionViewerPage

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string
}) {
  const { userId } = auth()
  if (!userId) {
    return <div>unauthenticated</div>
  }

  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId)
  if (!workflowExecution) {
    return <div>Not found</div>
  }

  return <ExecutionViewer initialData={workflowExecution} />
}
