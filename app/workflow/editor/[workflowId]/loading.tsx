import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="animate-spin stroke-primary" size={30} />
    </div>
  )
}

export default Loading
