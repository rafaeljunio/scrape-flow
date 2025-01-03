import type { TaskType } from '@/types/task'
import type { WorkflowTask } from '@/types/workflow'

import { ExtractTextFromElementTask } from './extract-text-from-element'
import { LaunchBrowserTask } from './launch-browser'
import { PageToHtmlTask } from './page-to-html'

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K }
}

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
}
