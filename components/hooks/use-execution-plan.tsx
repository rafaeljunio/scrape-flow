import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'

import { FlowToExecutionPlan } from '@/lib/workflow/execution-plan'
import type { AppNode } from '@/types/app-node'

export const useExecutionPlan = () => {
  const { toObject } = useReactFlow()

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject()
    const { executionPlan } = FlowToExecutionPlan(nodes as AppNode[], edges)
    return executionPlan
  }, [toObject])

  return generateExecutionPlan
}
