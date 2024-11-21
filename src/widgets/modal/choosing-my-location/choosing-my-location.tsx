'use client';

import * as React from 'react';

import { FormAddAddress } from '@/feature/form-add-address';
import { FormModalChoosePickup } from '@/feature/form-modal-choose-pickup';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { Sheet, SheetContent } from '@/shared/components/sheet';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { cn } from '@/shared/lib/utils';
import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';
import { DeliveryTabs } from '@/widgets/delivery-tabs';
import YandexMap from '@/widgets/yandex-map';

const ChoosingMyLocation = () => {
  const { step } = useDelivery();
  const { isOpen, type, onClose, data } = useModal();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isModalOpen = isOpen && type === 'choosingMyLocation';

  const handleMobileClose = () => {
    onClose();
  };

  if (isMobile) {
    return (
      <Sheet open={isModalOpen} onOpenChange={handleMobileClose}>
        <SheetContent
          side={'right'}
          className={'!p-0'}
          classNameClose={'bg-white rounded-full opacity-100 w-12 h-12 center top-4'}
        >
          <div
            className={cn('flex h-full max-h-[100vh] w-full flex-auto overflow-hidden')}
          >
            <div className={'flex w-full flex-col'}>
              <div className={'grid min-h-[40vh] grid-cols-1'}>
                <YandexMap />
              </div>

              <div className='grow p-4'>
                {step === 'addAddress' && (
                  <FormAddAddress addPlateItem={data?.addPlate} />
                )}

                {step === 'booking' && (
                  <FormModalChoosePickup
                    desc={'Выберите ресторан'}
                    title={'Забронировать стол'}
                  />
                )}

                {(step === 'pickup' || step === 'delivery') && (
                  <DeliveryTabs addPlate={data?.addPlate} />
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'mx-auto h-full max-w-5xl bg-white !p-0 md:h-[600px]'}>
        <div className={'grid overflow-hidden sm:rounded-[22px] md:grid-cols-2'}>
          <div
            className={'order-2 w-full grow overflow-hidden px-6 pb-8 pt-5 md:order-1'}
          >
            {step === 'addAddress' && <FormAddAddress addPlateItem={data?.addPlate} />}

            {step === 'booking' && (
              <FormModalChoosePickup
                desc={'Выберите ресторан'}
                title={'Забронировать стол'}
              />
            )}
            {(step === 'pickup' || step === 'delivery') && (
              <DeliveryTabs addPlate={data?.addPlate} />
            )}
          </div>

          <div className={'order-1 grid md:order-2'}>
            <YandexMap zoom={step === 'addAddress' ? 15 : 12} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChoosingMyLocation;
