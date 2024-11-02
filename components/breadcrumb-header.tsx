'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from './ui/breadcrumb'

export const BreadcrumbHeader = () => {
  const pathName = usePathname()
  const paths = pathName === '/' ? [''] : pathName?.split('/')

  return (
    <div className="flex items-center flex-start">
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                  {path === '' ? 'home' : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
