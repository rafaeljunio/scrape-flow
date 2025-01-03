import type { LucideProps } from 'lucide-react'

import type { AppNode } from './app-node'
import type { TaskParam, TaskType } from './task'

export enum WorkflowStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export type WorkflowTask = {
  label: string
  icon: React.FC<LucideProps>
  type: TaskType
  isEntryPoint: boolean
  inputs: TaskParam[]
  outputs: TaskParam[]
  credits: number
}

export type WorkflowExecutionPlanPhase = {
  phase: number
  nodes: AppNode[]
}

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[]
