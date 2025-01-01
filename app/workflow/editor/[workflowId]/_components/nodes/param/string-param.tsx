/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useId, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { ParamProps } from '@/types/app-node'

export const StringParam = ({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value)

  const id = useId()

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let Component: any = Input

  if (param.variant === 'textarea') {
    Component = Textarea
  }

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>

      <Component
        id={id}
        disabled={disabled}
        className="text-xs"
        value={internalValue}
        placeholder="Enter value here"
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        onChange={(e: any) => setInternalValue(e.target.value)}
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
      />

      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  )
}
