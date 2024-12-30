'use client'

import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon } from 'lucide-react'
import { toast } from 'sonner'

import { UpdateWorkflow } from '@/actions/workflows/update-workflow'
import { Button } from '@/components/ui/button'

export const SaveBtn = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow()

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success('Flow saved successfully', { id: 'save-workflow' })
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'save-workflow' })
    },
  })

  return (
    <Button
      disabled={saveMutation.isPending}
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject())
        toast.loading('Saving workflow...', { id: 'save-workflow' })
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDefinition,
        })
      }}
    >
      <CheckIcon className="stroke-green-400" size={16} />
      Save
    </Button>
  )
}
