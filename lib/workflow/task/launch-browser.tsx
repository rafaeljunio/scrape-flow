import { GlobeIcon, type LucideProps } from 'lucide-react'

import { TaskType } from '@/types/task'

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch browser',
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
}
