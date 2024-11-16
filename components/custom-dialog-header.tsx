'use client'

import type { LucideIcon } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

import { DialogHeader, DialogTitle } from './ui/dialog'
import { Separator } from './ui/separator'

type Props = {
  title?: string
  subTitle?: string
  icon?: LucideIcon

  iconClassName?: string
  titleClassName?: string
  subtitleClassName?: string
}

export const CustomDialogHeader = (props: Props) => {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {props.icon && (
            <props.icon
              size={30}
              className={cn('stroke-primary', props.iconClassName)}
            />
          )}
          {props.title && (
            <p className={cn('text-xl text-primary', props.titleClassName)}>
              {props.title}
            </p>
          )}
          {props.subTitle && (
            <p
              className={cn(
                'text-sm text-muted-foreground',
                props.titleClassName,
              )}
            >
              {props.subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  )
}
