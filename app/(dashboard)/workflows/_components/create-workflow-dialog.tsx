'use client'

import { Layers2Icon } from 'lucide-react'
import React, { useState } from 'react'

import CustomDialogHeader from '@/components/custom-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create workflow'}</Button>
      </DialogTrigger>
      <DialogTrigger className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />
      </DialogTrigger>
    </Dialog>
  )
}

export default CreateWorkflowDialog
