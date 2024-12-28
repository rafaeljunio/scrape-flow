'use client'

import React, { useId } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { TaskParam } from '@/types/task'

type Props = {
  param: TaskParam
}

export const StringParam = ({ param }: Props) => {
  const id = useId()
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>

      <Input id={id} />

      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  )
}
