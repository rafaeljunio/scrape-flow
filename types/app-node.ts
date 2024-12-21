/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Node } from '@xyflow/react'

import type { TaskType } from './task'

export interface AppNodeData {
  type: TaskType
  inputs: Record<string, string>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any
}

export interface AppNode extends Node {
  data: AppNodeData
}
