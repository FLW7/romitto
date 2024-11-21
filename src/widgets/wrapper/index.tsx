'use client';
import { useState } from 'react';

import { AdAppModalDynamic } from '../modal/ad-app-modal/ad-app-modal-dynamic';
import CartModal from '../modal/cart-modal/cart-modal';
import { ChoosingCityDynamic } from '../modal/choosing-city/choosing-city.dynamic';
import { SidebarCatalogDynamic } from '../modal/sidebar-catalog-modal/sidebar-catalog.dynamic';

import useMediaQuery from '@/shared/hooks/use-media-query';
import { useTimer } from '@/shared/hooks/use-timer';
import {
  SiteAccessibility,
  type ISiteAccessibility,
} from '@/shared/state/site-accessibility';
import { Footer } from '@/widgets/footer';
import Header from '@/widgets/header/ui/header';
import HeaderMobile from '@/widgets/header/ui/header-mobile/index';
import { AddressNotSpecifiedDynamic } from '@/widgets/modal/address-not-specified/address-not-specified.dynamic';
import { BookTableDynamic } from '@/widgets/modal/book-table/book-table.dynamic';
import { BookTableDatePickerDynamic } from '@/widgets/modal/book-table-date-picker/book-table-date-picker.dynamic';
import { CallbackDynamic } from '@/widgets/modal/callback/callback.dynamic';
import { ChoosingMyLocationDynamic } from '@/widgets/modal/choosing-my-location/choosing-my-location.dynamic';
import { DetailMealDynamic } from '@/widgets/modal/detail-meal/detail-meal.dynamic';
import { LoginDynamic } from '@/widgets/modal/login/login.dynamic';
import { OrderRejectDynamic } from '@/widgets/modal/order-reject/order-reject.dynamic';
import { OrderSuccessDynamic } from '@/widgets/modal/order-success/order-success.dynamic';
import PayFrame from '@/widgets/modal/pay-frame/pay-frame';
import { PlacingOrderDynamic } from '@/widgets/modal/placing-order/placing-order.dynamic';
import { RateOrderDynamic } from '@/widgets/modal/rate-order/rate-order.dynamic';
import { RegisterDynamic } from '@/widgets/modal/register/register.dynamic';
import { SiteOff } from '@/widgets/site-off';

interface Props {
  children: React.ReactNode;
  site: Partial<ISiteAccessibility> | null;
}

export const Wrapper = ({ children, site }: Props) => {
  useTimer();
  const [isOff, setIsOff] = useState(
    site?.ru?.siteAccessibility === SiteAccessibility.OFF,
  );
  // const { setCityId } = useCityStore();
  // const { mutateAsync } = useMutation({ mutationFn: getCities });

  const isMobile = useMediaQuery('(max-width:1024px)');

  // useEffect(() => {
  //   if (!getCookie('adAppShowed')) {
  //     setTimeout(() => {
  //       onOpen('adApp');
  //       setCookie('adAppShowed', 'true', 1);
  //     }, 30_000);
  //   }
  // }, [getCookie('adAppShowed')]);

  // let domain = '';

  // if (typeof window !== 'undefined') {
  //   domain = window.location.hostname;
  // }
  // useEffect(() => {
  //   void mutateAsync(domain).then((data) => {
  //     setCityId(data?.cities?.id ? Number(data?.cities?.id) : 0);
  //   });
  // }, [domain]);

  return (
    <>
      {isOff ? (
        <SiteOff ru={site?.ru} setIsOff={setIsOff} />
      ) : (
        <>
          {isMobile ? <HeaderMobile /> : <Header />}
          {children}
          <Footer />

          {/* MODALS */}
          <RateOrderDynamic />
          <LoginDynamic />
          <RegisterDynamic />
          <CartModal />
          <SidebarCatalogDynamic />
          <ChoosingMyLocationDynamic />
          <BookTableDatePickerDynamic />
          <AddressNotSpecifiedDynamic />
          <OrderRejectDynamic />
          <OrderSuccessDynamic />
          <PlacingOrderDynamic />
          <BookTableDynamic />
          <CallbackDynamic />
          <PayFrame />
          {/* <PDFMenuDynamic /> */}
          <ChoosingCityDynamic />
          <DetailMealDynamic />
          <AdAppModalDynamic />
        </>
      )}
    </>
  );
};
