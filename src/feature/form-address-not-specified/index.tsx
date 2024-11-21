import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { useAuth } from '@/shared/state/auth';
import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

export const FormAddressNotSpecified: React.FC<{ addPlate?: ICartOrderItem }> = ({
  addPlate,
}) => {
  const { onOpen } = useModal();
  const { setStep } = useDelivery();
  const { isAuth } = useAuth();

  return (
    <div>
      <div className={'mx-auto flex flex-col gap-3'}>
        <Button
          className={'w-full'}
          onClick={() => {
            setStep('delivery');
            onOpen('choosingMyLocation', { addPlate });
          }}
        >
          Указать адрес
        </Button>
        <Button
          className={'w-full'}
          variant={'outline'}
          onClick={() => {
            setStep('pickup');
            onOpen('choosingMyLocation', { addPlate });
          }}
        >
          Забрать из ресторана
        </Button>
      </div>

      {!isAuth && (
        <div className={'mt-4 flex items-center justify-center gap-1.5'}>
          <Typography variant={'p2'} className={'font-semibold'}>
            Уже есть аккаунт?
          </Typography>
          <Button
            variant={'link'}
            className={'p-0'}
            onClick={() => {
              onOpen('login');
            }}
          >
            Войти
          </Button>
        </div>
      )}
    </div>
  );
};
