/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from '@xyflow/react'
import React, { type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import type { TaskParam } from '@/types/task'

import { NodeParamField } from './node-param-field'

export const NodeInputs = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>
}

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParam
  nodeId: string
}) => {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            '!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4',
          )}
        />
      )}
    </div>
  )
}
