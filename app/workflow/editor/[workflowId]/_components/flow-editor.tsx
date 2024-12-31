import '@xyflow/react/dist/style.css'

import type { Workflow } from '@prisma/client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  type Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import type React from 'react'
import { useCallback, useEffect } from 'react'

import { DeletableEdge } from '@/app/workflow/_components/edges/deletable-edge'
import { CreateFlowNode } from '@/lib/workflow/create-flow-node'
import type { AppNode } from '@/types/app-node'
import type { TaskType } from '@/types/task'

import NodeComponent from './nodes/node-component'

const nodeTypes = {
  // Node: NodeComponent,
  FlowScrapeNode: NodeComponent,
}

const edgeTypes = {
  default: DeletableEdge,
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 2 }

export const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  // const [nodes, setNodes, onNodesChange] = useNodesState([
  //   CreateFlowNode(TaskType.LAUNCH_BROWSER),
  // ])

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow()

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

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const taskType = event.dataTransfer.getData('application/reactflow')
      if (typeof taskType === 'undefined' || !taskType) return

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode = CreateFlowNode(taskType as TaskType, position)
      setNodes((nds) => nds.concat(newNode))
    },
    [screenToFlowPosition, setNodes],
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds))
      if (!connection.targetHandle) return
      // Remove input value if is present on connection

      const node = nodes.find((nd) => nd.id === connection.target)
      if (!node) return
      const nodeInputs = node.data.inputs
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: '',
        },
      })
    },
    [nodes, setEdges, updateNodeData],
  )

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}
