/* eslint-disable unicorn/no-new-array */
/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable unicorn/no-negated-condition */
/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */
import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import {
  type ICreateOrderArgs,
  createOrder,
  getAddress,
  getOrganisation,
} from '../api/create-order';
import { convertOrders } from '../lib/convert-orders';

import styles from './style.module.css';

import { Button } from '@/shared/components/button';
import { ResponsiveDialog } from '@/shared/components/responsive-dialog';
import Typography from '@/shared/components/typography';
import { formatDate } from '@/shared/lib/format-date';
import { getOnlyNumbers } from '@/shared/lib/phone-mask';
import { trackPurchase } from '@/shared/lib/purchase-metrik';
import { useAddress } from '@/shared/state/address';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';
import { useCart } from '@/widgets/cart-widget/state';

interface ConfirmOrderPoupProps {
  confirmOrderOpen: boolean;
  closeConfirmOrder: () => void;
  deliveryTime: { date: string; time: string } | undefined;
  code: string | undefined;
  nowText: string;
}

const renderValue = (value: string) => {
  switch (value) {
    case 'Наличными при получении': {
      return '0';
    }
    case 'Картой при получении': {
      return '1';
    }
    case 'Картой онлайн': {
      return '2';
    }

    default: {
      return '0';
    }
  }
};

const ConfirmOrderPopup: React.FC<ConfirmOrderPoupProps> = ({
  confirmOrderOpen,
  closeConfirmOrder,
  deliveryTime,
  code,
  nowText = 'Как можно быстрее',
}) => {
  const { isAuth, login } = useAuth();
  const { onOpen, onClose } = useModal();
  const {
    cutlery,
    additives,
    decreaseBonus,
    promocode,
    gifts,
    orders,
    clearCart,
    AddedPromoGifts,
  } = useCart();
  const { address } = useAddress();

  const { getValues } = useFormContext();

  const addressResponse = useMutation({ mutationFn: getAddress });
  const organisationResponse = useMutation({ mutationFn: getOrganisation });
  const { mutateAsync: createOrderResponse, isPending } = useMutation({
    mutationFn: createOrder,
  });

  function generateComment() {
    if (!!getValues('dontCall')) {
      if (!!getValues('comment')?.length) {
        return 'БЕЗ ЗВОНКА ОПЕРАТОРА, ' + getValues('comment');
      } else {
        return 'БЕЗ ЗВОНКА ОПЕРАТОРА';
      }
    } else if (!!getValues('comment')) {
      return getValues('comment');
    } else {
      return '';
    }
  }

  const confirmOrderHandler = async () => {
    // getValues('dontCall') ? (getValues('comment')?.length ? 'БЕЗ ЗВОНКА ОПЕРАТОРА, ' + getValues('comment') : 'БЕЗ ЗВОНКА ОПЕРАТОРА') : getValues('comment') ?? '',
    const requestData: ICreateOrderArgs = {
      Lattitude: '',
      Longitude: '',
      Country: '',
      Street: '',
      HouseNumber: '',
      Apt: '',
      Entreance: '',
      Floor: '',
      DoorNumber: '',
      Commentory: '',
      PolygonID: '',
      IsPrivateHouse: '',
      City: '',
      OrganisationID: '',
      Phone: `+${getOnlyNumbers(getValues('phone')) ?? ''}`,
      Name: getValues('name'),
      Email: getValues('mail'),
      Comment: generateComment() ?? '',
      PayType: renderValue(getValues('pay')),
      Address: address.LastAddressName ?? '',
      Promocode: promocode,
      Points: decreaseBonus,
      Cutlery: cutlery
        .map((item) => {
          return { id: item.id, count: item.countInCart ?? 0 };
        })
        .filter((item) => item.count > 0),
      Additions: additives
        .map((item) => {
          return { id: item.id, count: item.countInCart ?? 0 };
        })
        .filter((item) => item.count > 0),
      Gift: gifts.map((item) => item.id),
      Basket: convertOrders(orders),
      CountCashChange: getValues('moneyChange'),
      OrderDateTime:
        deliveryTime?.time === 'текущее'
          ? 'now'
          : `${deliveryTime?.date} ${deliveryTime?.time}`,
      Code: code,
      PromocodeData: AddedPromoGifts.flatMap((item) =>
        new Array(item.count).fill(item.id),
      ).join(','),
    };

    await (address.LastAddressType === 1
      ? addressResponse.mutateAsync(address.LastAddressID ?? 0).then((data) => {
          requestData.Country =
            address.LastCountry === undefined ? '' : address.LastCountry;
          requestData.Street = address.LastStreet === undefined ? '' : address.LastStreet;
          requestData.HouseNumber =
            address.LastHouseNumber === undefined ? '' : address.LastHouseNumber;
          requestData.Apt = address.LastApt === undefined ? '' : address.LastApt;
          requestData.Entreance =
            address.LastEntreance === undefined ? '' : address.LastEntreance;
          requestData.Floor = address.LastFloor === undefined ? '' : address.LastFloor;
          requestData.DoorNumber =
            address.LastDoorNumber === undefined ? '' : address.LastDoorNumber;
          requestData.Commentory =
            address.LastCommentory === undefined ? '' : address.LastCommentory;
          requestData.IsPrivateHouse =
            address.LastIsPrivateHouse?.toString() === undefined
              ? ''
              : address.LastIsPrivateHouse.toString();
          requestData.Lattitude = address?.LastLat?.toString() ?? '';
          requestData.Longitude = address?.LastLng?.toString() ?? '';
          requestData.PolygonID = address?.LastPolygonID ?? '';
          requestData.City = address?.LastCityName ?? '';
          requestData.OrganisationID = address?.LastAddressOrgID?.toString() ?? '';
        })
      : organisationResponse.mutateAsync(address.LastAddressOrgID ?? 0).then((data) => {
          requestData.Lattitude = address?.LastLat?.toString() ?? '';
          requestData.Longitude = address?.LastLng?.toString() ?? '';
          requestData.City = address?.LastCityName ?? '';
          requestData.OrganisationID = address?.LastAddressOrgID?.toString() ?? '';
          requestData.PolygonID = '';
        }));

    await createOrderResponse(requestData).then((data) => {
      if (!isAuth) {
        login(data);
      }

      if (data.error || data.canOrder === 0 || !data.orderID) {
        const errorTitle =
          data?.popUpTitle?.length > 0
            ? data?.popUpTitle
            : 'Произошла непредвиденная ошибка';
        const errorDescription =
          data?.popUpMessage?.length > 0
            ? data?.popUpMessage
            : 'Пожалуйста повторите попытку';

        onOpen('orderReject', { title: errorTitle, message: errorDescription });
      } else if (!!data.payLink) {
        // onOpen('payFrame', {payLink: data.payLink})
        trackPurchase();
        // window.open(data.payLink, '_blank', 'noopener,noreferrer');
        window.location.href = data.payLink;
        onClose();
      } else {
        trackPurchase();
        onOpen('orderSuccess', { orderID: data.orderID });
      }

      if (data.canOrder === 1) {
        clearCart();
      }
      closeConfirmOrder();
    });
  };

  return (
    <ResponsiveDialog
      open={confirmOrderOpen}
      onClose={closeConfirmOrder}
      classNameOverlay='z-[100]'
      className='z-[101] bg-bgDark'
    >
      <div className={styles.container}>
        <Typography variant='h1' className='text-center max-md:text-lg'>
          Подтвердите данные для заказа
        </Typography>
        <div className={styles.info}>
          <Typography variant='desc' className={`flex gap-x-2 ${styles.text}`}>
            Тип получения:
            <Typography variant='desc' className='text-black'>
              {address.LastAddressType === 1 ? 'Доставка' : 'Самовывоз'}
            </Typography>
          </Typography>
          <Typography variant='desc' className={styles.text}>
            Адрес:
            <Typography variant='desc' className='text-black'>
              {address.LastAddressType === 1
                ? address.LastIsPrivateHouse === 1
                  ? `${address.LastAddressName}, частный дом`
                  : `${address.LastAddressName}, кв ${address.LastDoorNumber}, п ${address.LastEntreance}, эт ${address.LastFloor}`
                : `${address.LastAddressName}`}
            </Typography>
          </Typography>
          <Typography variant='desc' className='flex gap-x-2 pt-3 text-secondary'>
            Предзаказ:
            <Typography variant='desc' className='text-black'>
              {deliveryTime
                ? deliveryTime?.time === 'текущее'
                  ? nowText
                  : `${formatDate(new Date(deliveryTime.date))} в ${deliveryTime.time}`
                : nowText}
            </Typography>
          </Typography>
        </div>
        <Button
          className='mt-8 w-full'
          disabled={isPending}
          onClick={confirmOrderHandler}
        >
          Подтвердить
        </Button>
      </div>
    </ResponsiveDialog>
  );
};

export default ConfirmOrderPopup;
