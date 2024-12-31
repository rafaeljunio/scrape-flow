'use client'

// import { Input } from '@/components/ui/input'
import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'

import type { AppNode } from '@/types/app-node'
import { type TaskParam, TaskParamType } from '@/types/task'

import { BrowserInstanceParam } from './param/browser-instance-param'
import { StringParam } from './param/string-param'

export const NodeParamField = ({
  param,
  nodeId,
}: {
  param: TaskParam
  nodeId: string
}) => {
  const { updateNodeData, getNode } = useReactFlow()
  const node = getNode(nodeId) as AppNode
  const value = node?.data?.inputs?.[param.name]

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      })
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs],
  )

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      )
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={''}
          updateNodeParamValue={updateNodeParamValue}
        />
      )
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      )
  }
}
