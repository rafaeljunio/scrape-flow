'use client'

import { useReactFlow } from '@xyflow/react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export const NodeCard = ({
  children,
  nodeId,
  isSelected,
}: {
  nodeId: string
  children: ReactNode
  isSelected: boolean
}) => {
  const { getNode, setCenter } = useReactFlow()
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId)
        if (!node) return
        const { position, measured } = node
        if (!position || !measured) return
        const { width, height } = measured
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const x = position.x + width! / 2
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const y = position.y + height! / 2

        if (x === undefined || y === undefined) return

        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        })
      }}
      className={cn(
        'rounded-md cursor-pointer bg-background border-2 first-letter:border-separate w-[420px] text-xs gap-1 flex flex-col',
        isSelected && 'border-primary',
      )}
    >
      {children}
    </div>
  )
}
