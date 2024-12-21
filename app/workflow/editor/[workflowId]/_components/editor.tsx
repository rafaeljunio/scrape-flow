'use client'

import type { Workflow } from '@prisma/client'
import { ReactFlowProvider } from '@xyflow/react'

import { FlowEditor } from './flow-editor'

export const Editor = ({ workflow }: { workflow: Workflow }) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <section className="flex h-full overflow-auto">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  )
}
