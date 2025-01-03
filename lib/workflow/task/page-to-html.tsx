import { CodeIcon, type LucideProps } from 'lucide-react'

import { TaskParamType, TaskType } from '@/types/task'
import type { WorkflowTask } from '@/types/workflow'

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: 'Get html from page',
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    {
      name: 'Html',
      type: TaskParamType.STRING,
    },
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
} satisfies WorkflowTask
