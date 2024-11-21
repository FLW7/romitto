import { useEffect, useState } from 'react';

import Link from 'next/link';

import Typography from '@/shared/components/typography';
import { useGetContacts } from '@/shared/hooks/query/use-get-contacts';
import { getOnlyNumbers, phoneMask } from '@/shared/lib/phone-mask';
import { cn } from '@/shared/lib/utils';
import { useAddress } from '@/shared/state/address';
import { useGetDateReservation } from '@/widgets/modal/book-table-date-picker/model/use-get-date-reservation';

const Phone: React.FC<{ className?: string }> = ({ className }) => {
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
    <Link href={`tel:${getOnlyNumbers(phone)}`}>
      <Typography
        variant='desc'
        className={cn('whitespace-nowrap text-primary', className)}
      >
        {phone}
      </Typography>
    </Link>
  );
};

export default Phone;
