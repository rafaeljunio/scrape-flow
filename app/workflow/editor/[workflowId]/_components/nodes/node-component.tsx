import type { NodeProps } from '@xyflow/react'
import { memo } from 'react'

import { TaskRegistry } from '@/lib/workflow/task/registry'
import type { AppNodeData } from '@/types/app-node'

import { NodeCard } from './node-card'
import { NodeHeader } from './node-header'
import { NodeInput, NodeInputs } from './node-inputs'

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData
  const task = TaskRegistry[nodeData.type]
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} />
        ))}
      </NodeInputs>
    </NodeCard>
  )
})

export default NodeComponent
NodeComponent.displayName = 'NodeComponent'
