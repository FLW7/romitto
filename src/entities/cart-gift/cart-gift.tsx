/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable unicorn/no-nested-ternary */
import { type SetStateAction, type Dispatch } from 'react';

import GiftGhostIcon from '@/assets/icons/gift-ghost.svg';
import GiftRedIcon from '@/assets/icons/gift-red.svg';
import GiftWhiteIcon from '@/assets/icons/gift-white.svg';
import { checkGiftEligibility } from '@/feature/cart-sum/lib/check-gift-eligibility';
import { Progress } from '@/shared/components/progress';
import TooltipCustom from '@/shared/components/tooltip/tooltip-custom';
import Typography from '@/shared/components/typography';
import { priceFormatter } from '@/shared/lib/price';
import { cn } from '@/shared/lib/utils';
import { useModal } from '@/shared/state/modal';
import { useCart } from '@/widgets/cart-widget/state';

interface CartGiftProps {
  setGiftStep: Dispatch<SetStateAction<number>>;
  min?: boolean;
}

const CartGift: React.FC<CartGiftProps> = ({ setGiftStep, min = false }) => {
  const { onOpen } = useModal();
  const { orderSum, giftLevelPriceArr, gifts, giftsType, availableGifts } = useCart();

  // const [remaining, setRemaining] = useState(0);

  const giftLevelsArr = [...new Set(giftLevelPriceArr)];

  // useEffect(() => {
  //   const nextGift = giftLevelsArr.find((item) => item > orderSum);

  //   setRemaining(nextGift ? nextGift - orderSum : 0);
  // }, [orderSum]);

  return (
    <div className='relative w-full rounded-xl bg-white px-[14px] py-[10px] shadow-cartBlockShadow'>
      {!min && <TooltipCustom id='gift-tooltip' className='text-center' />}
      <div
        className='relative flex w-full items-center gap-x-3'
        data-tooltip-id={`${checkGiftEligibility(availableGifts, gifts, orderSum) ? 'gift-tooltip' : ''}`}
        data-tooltip-html='Вы забыли добавить подарок.<br/> Нажмите, чтобы сделать выбор!'
      >
        {giftLevelsArr.map((item, key) => {
          const isOrderSumGreater = orderSum >= item;

          const isGiftInOrder = gifts.some((gift) => gift.minPrice === item);

          const GiftIcon = isGiftInOrder ? GiftWhiteIcon : GiftRedIcon;

          return (
            <div
              key={key}
              className='flex w-full flex-col items-center bg-white'
              onClick={() => {
                !isGiftInOrder && (giftsType === 1 || giftsType === 3)
                  ? onOpen('getGift')
                  : onOpen('chooseGift');
                setGiftStep(key + 1);
              }}
            >
              {isOrderSumGreater ? (
                <GiftIcon
                  className={cn(isGiftInOrder && 'cursor-pointer', 'mb-2 h-6 w-6')}
                />
              ) : (
                <GiftGhostIcon key={key} className={'mb-2 h-6 w-6'} />
              )}

              <Progress
                value={
                  key === 0 || orderSum > giftLevelsArr[key - 1]
                    ? (orderSum / item) * 100
                    : 0
                }
                className='h-[2px] max-h-[2px] w-[100%] rounded-[8px] bg-lightGray'
                classNameIndicator='bg-main'
              />
              {isOrderSumGreater && !isGiftInOrder ? (
                <Typography
                  variant='desc'
                  className='mt-1 text-[10px] font-semibold !text-main'
                >
                  Забрать
                </Typography>
              ) : (
                <Typography
                  variant='desc'
                  className='mt-1 text-[10px] font-normal !text-secondary'
                >
                  от {priceFormatter(item)}
                </Typography>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartGift;
