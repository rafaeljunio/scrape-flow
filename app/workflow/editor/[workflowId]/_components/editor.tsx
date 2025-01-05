'use client'

import type { Workflow } from '@prisma/client'
import { ReactFlowProvider } from '@xyflow/react'

import { TaskMenu } from '@/app/workflow/_components/task-menu'
import { TopBar } from '@/app/workflow/_components/topbar/top-bar'
import { FlowValidationContextProvider } from '@/components/context/flow-validation-context'

import { FlowEditor } from './flow-editor'

export const Editor = ({ workflow }: { workflow: Workflow }) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <TopBar
            title="Workflow editor"
            subtitle={workflow.name}
            workflowId={workflow.id}
          />
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  )
}
