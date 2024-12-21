import '@xyflow/react/dist/style.css'

import type { Workflow } from '@prisma/client'
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'

import { CreateFlowNode } from '@/lib/workflow/create-flow-node'
import { TaskType } from '@/types/task'

import NodeComponent from './nodes/node-component'

const nodeTypes = {
  // Node: NodeComponent,
  FlowScrapeNode: NodeComponent,
}

export const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}
