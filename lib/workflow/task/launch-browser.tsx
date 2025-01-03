import { GlobeIcon, type LucideProps } from 'lucide-react'

import { TaskParamType, TaskType } from '@/types/task'
import type { WorkflowTask } from '@/types/workflow'

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch browser',
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: 'Website Url',
      type: TaskParamType.STRING,
      helperText: 'eg: https://www.google.com',
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
} satisfies WorkflowTask
