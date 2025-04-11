import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image';
  

const LoadingDialouge = ({loading}) => {
  return (
    <AlertDialog open={loading}>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center text-black">Please Wait...let the AI Generate the Course for you</AlertDialogTitle>
          <AlertDialogDescription>
          <div className='flex justify-center py-10'>
          <Image src={'/loader.gif'} width={100} height={100} />
          </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialouge