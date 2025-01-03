import type { NodeProps } from '@xyflow/react'
import { memo } from 'react'

import { Badge } from '@/components/ui/badge'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import type { AppNodeData } from '@/types/app-node'

import { NodeCard } from './node-card'
import { NodeHeader } from './node-header'
import { NodeInput, NodeInputs } from './node-inputs'
import { NodeOutput, NodeOutputs } from './node-outputs'

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true'

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData
  const task = TaskRegistry[nodeData.type]
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      {DEV_MODE && <Badge>{props.id}</Badge>}
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>

      <NodeOutputs>
        {task.outputs.map((output) => (
          <NodeOutput key={output.name} output={output} />
        ))}
      </NodeOutputs>
    </NodeCard>
  )
})

export default NodeComponent
NodeComponent.displayName = 'NodeComponent'
