'use client';

import * as React from 'react';

import { X } from 'lucide-react';

import { FormAddAddress } from '@/feature/form-add-address';
import { FormModalChoosePickup } from '@/feature/form-modal-choose-pickup';
import { Button } from '@/shared/components/button';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { MapTabs } from '@/shared/components/map-tabs';
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
          className={'bg-bgMain !p-0'}
          hideCloseButton
          // classNameClose={'bg-white rounded-full opacity-100 w-12 h-12 center top-4'}
        >
          <div className={cn('relative flex h-full w-full flex-auto overflow-hidden')}>
            <div className={'flex h-full w-full flex-col'}>
              <div
                className={cn(
                  'grid grid-cols-1',
                  step === 'addAddress'
                    ? 'h-[calc(100vh-300px)]'
                    : 'h-[calc(100vh-370px)]',
                )}
              >
                <div className='absolute left-4 right-4 top-2 z-10 flex max-w-full items-center gap-2'>
                  <div className='w-full'>
                    <MapTabs />
                  </div>
                  <Button
                    variant={'destructive'}
                    size={'destructive'}
                    className='min-h-11 min-w-11 rounded-full bg-bgTetriary shadow-mapTabsShadow'
                    onClick={handleMobileClose}
                  >
                    <X size={24} className='stroke-primary' />
                  </Button>
                </div>

                {/* для обновления размера контейнера карты вшитого в YM */}
                {step !== 'addAddress' && <YandexMap defaultStep={step} />}
                {step === 'addAddress' && <YandexMap defaultStep={step} />}
              </div>

              <div className='absolute bottom-0 w-full overflow-hidden rounded-t-3xl bg-bgMain p-4 pt-6'>
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
      <DialogContent className={'mx-auto h-full max-w-5xl bg-bgMain !p-0 md:h-[600px]'}>
        <div className={'grid overflow-hidden sm:rounded-3xl md:grid-cols-2'}>
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
