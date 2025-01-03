import { type LucideProps, TextIcon } from 'lucide-react'

import { TaskParamType, TaskType } from '@/types/task'
import type { WorkflowTask } from '@/types/workflow'

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: 'Extract text from element',
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: 'Html',
      type: TaskParamType.STRING,
      required: true,
      variant: 'textarea',
    },
    {
      name: 'Selector',
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: 'Extracted text',
      type: TaskParamType.STRING,
    },
  ],
} satisfies WorkflowTask
