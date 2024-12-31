'use client'

import type { ParamProps } from '@/types/app-node'

export const BrowserInstanceParam = ({ param }: ParamProps) => {
  return <p className="text-xs">{param.name}</p>
}
