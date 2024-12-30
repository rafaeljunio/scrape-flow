import '@xyflow/react/dist/style.css'

import type { Workflow } from '@prisma/client'
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import { useEffect } from 'react'

import { CreateFlowNode } from '@/lib/workflow/create-flow-node'
import { TaskType } from '@/types/task'

import NodeComponent from './nodes/node-component'

const nodeTypes = {
  // Node: NodeComponent,
  FlowScrapeNode: NodeComponent,
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 2 }

export const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  // const [nodes, setNodes, onNodesChange] = useNodesState([
  //   CreateFlowNode(TaskType.LAUNCH_BROWSER),
  // ])

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { setViewport } = useReactFlow()

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition)

      if (!flow) return

      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])

      if (!flow.viewport) return

      const { x = 0, y = 0, zoom = 1 } = flow.viewport
      setViewport({ x, y, zoom })
    } catch (error) {}
  }, [workflow.definition, setEdges, setNodes, setViewport])

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        // fitView
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}
