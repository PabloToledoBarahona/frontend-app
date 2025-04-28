'use client';

import * as Toast from '@radix-ui/react-toast';
import { useState } from 'react';

interface ToastSuccessProps {
  message: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ToastSuccess({ message, open, setOpen }: ToastSuccessProps) {
  return (
    <Toast.Provider>
      <Toast.Root
        className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-gray-800 text-sm"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="font-semibold mb-1">Éxito</Toast.Title>
        <Toast.Description>{message}</Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-6 right-6 flex flex-col gap-2 w-80 max-w-full z-50" />
    </Toast.Provider>
  );
}