import { useFormContext } from 'react-hook-form';

import styles from '../style.module.css';

import RightArrowIcon from '@/assets/icons/arrow-right.svg';
import TooltipCustom from '@/shared/components/tooltip/tooltip-custom';
import Typography from '@/shared/components/typography';
import { formatDate } from '@/shared/lib/format-date';
import { cn } from '@/shared/lib/utils';
import { useAddress } from '@/shared/state/address';

interface AdressBlockProps {
  openTimePicker: () => void;
  onClickAddress: () => void;
  deliveryTime: { date: string; time: string } | undefined;
  className?: string;
  nowText?: string;
  tooltipTitle?: string;
  tooltipTime?: string;
  title: string;
}

const AdressBlock: React.FC<AdressBlockProps> = ({
  openTimePicker,
  onClickAddress,
  deliveryTime,
  className,
  title,
  tooltipTitle,
  tooltipTime,
  nowText = 'Как можно быстрее',
}) => {
  const { address } = useAddress();

  const { formState } = useFormContext();

  return (
    <div
      className={cn(
        className,
        styles.adressBlock,
        formState.errors.date ? '!border-main' : 'border-lightGray',
      )}
    >
      <TooltipCustom id='address-tooltip' offset={20} defaultIsOpen closeOnScroll />
      <div
        className={`flex cursor-pointer items-center justify-between border-b border-lightGray pb-[14px]`}
        data-tooltip-id='address-tooltip'
        data-tooltip-content={tooltipTitle ?? 'Не забудьте проверить адрес доставки'}
        onClick={onClickAddress}
      >
        <div>
          <Typography variant='p' className='mb-1 font-semibold'>
            {title}
          </Typography>
          <Typography variant='desc' className='font-normal text-secondary'>
            {address.LastAddressName ?? 'Выберите адрес'}
          </Typography>
        </div>
        <RightArrowIcon size={20} stroke={'#C0C0C0'} />
      </div>
      <div
        data-tooltip-id={`address-tooltip`}
        data-tooltip-content={tooltipTime ?? 'Выберите время доставки'}
        className={`flex ${address?.LastAddressType === 1 && 'cursor-pointer'} items-center justify-between pt-3`}
        onClick={openTimePicker}
      >
        {deliveryTime ? (
          <>
            <Typography variant='desc'>
              {deliveryTime.time === 'текущее'
                ? nowText
                : `${formatDate(new Date(deliveryTime.date))} в ${deliveryTime.time}`}
            </Typography>
            <RightArrowIcon size={20} stroke={'#C0C0C0'} />
          </>
        ) : (
          <div className='flex w-full items-center justify-between'>
            <Typography
              variant='desc'
              className={`font-semibold ${formState.errors.date ? '!text-main' : 'text-primary'}`}
            >
              Только предзаказ
            </Typography>
            <div className='flex items-center gap-2'>
              <Typography
                variant='desc'
                className={`font-medium ${formState.errors.date ? '!text-main' : 'text-primary'}`}
              >
                Выбрать время
              </Typography>
              <RightArrowIcon size={20} stroke={'#C0C0C0'} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdressBlock;
