'use client'

// import { Input } from '@/components/ui/input'
import { type TaskParam, TaskParamType } from '@/types/task'

import { StringParam } from './param/string-param'

export const NodeParamField = ({ param }: { param: TaskParam }) => {
  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam param={param} />
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      )
  }
}
