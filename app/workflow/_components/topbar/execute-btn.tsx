'use client'

import { useExecutionPlan } from '@/components/hooks/use-execution-plan'
import { Button } from '@/components/ui/button'

export const ExecuteBtn = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan()

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate()
        console.log('--- plan ---')
        console.table(plan)
      }}
    >
      ExecuteBtn
    </Button>
  )
}
