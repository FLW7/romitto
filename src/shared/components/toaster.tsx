'use client';

import ToastSuccessIcon from '@/assets/icons/toast-success.svg';
import Portal from '@/shared/components/portal';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/shared/components/toast';
import { useToast } from '@/shared/components/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <Portal id={'portal_toast'}>
      <ToastProvider swipeDirection='left'>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} {...props} duration={2000} className='flex items-start'>
              {props.variant === 'success' && (
                <ToastSuccessIcon className='h-9 min-h-9 w-9 min-w-9' />
              )}
              <div className='grid gap-1'>
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              {action}
              <ToastClose className='max-sm:hidden' />
            </Toast>
          );
        })}
        <ToastViewport />
      </ToastProvider>
    </Portal>
  );
}
