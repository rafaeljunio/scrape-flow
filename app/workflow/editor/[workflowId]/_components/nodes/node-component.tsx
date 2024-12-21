import type { NodeProps } from '@xyflow/react'
import { memo } from 'react'

import type { AppNodeData } from '@/types/app-node'

import { NodeCard } from './node-card'
import { NodeHeader } from './node-header'

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
    </NodeCard>
  )
})

export default NodeComponent
NodeComponent.displayName = 'NodeComponent'
