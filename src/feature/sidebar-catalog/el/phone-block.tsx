import { useEffect, useState } from 'react';

import Link from 'next/link';

import PhoneIcon from '@/assets/icons-yap/call.svg';
import Typography from '@/shared/components/typography';
import { useGetContacts } from '@/shared/hooks/query/use-get-contacts';
import { getOnlyNumbers, phoneMask } from '@/shared/lib/phone-mask';
import { useAddress } from '@/shared/state/address';
import { useGetDateReservation } from '@/widgets/modal/book-table-date-picker/model/use-get-date-reservation';

const PhoneBlock = () => {
  const { address } = useAddress();
  const { data: contacts } = useGetContacts();
  const { data: dataOrg } = useGetDateReservation(String(address?.LastAddressOrgID));

  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (dataOrg?.phone && address?.LastAddressOrgID) {
      setPhone(dataOrg?.phone);
    } else {
      contacts?.contacts?.[0].data && setPhone(phoneMask(contacts?.contacts?.[0].data));
    }
  }, [dataOrg?.phone, address?.LastAddressOrgID, contacts?.contacts]);

  return (
    <Link
      href={`tel:${getOnlyNumbers(phone)}`}
      className='flex w-full items-center justify-between rounded-xl px-[13px] pb-[11px] pt-2 shadow-sidebarCatalog'
    >
      <div>
        <Typography variant='desc' className='text-xs text-secondary'>
          Телефон
        </Typography>
        <Typography variant='desc' className='text-base font-medium'>
          {phone}
        </Typography>
      </div>
      <PhoneIcon className={'h-7 w-7'} />
    </Link>
  );
};

export default PhoneBlock;
