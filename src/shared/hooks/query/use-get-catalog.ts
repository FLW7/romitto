import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getCatalog } from '@/shared/api/get-catalog';
import { QUERY_KEY } from '@/shared/const/query-key';
import { addressInitData, useAddress } from '@/shared/state/address';

export const useGetCatalog = () => {
  const { address, setAddress } = useAddress();
  const { LastAddressOrgID } = address;

  const res = useQuery({
    queryKey: QUERY_KEY.catalog(LastAddressOrgID ?? 0),
    queryFn: async () => await getCatalog(LastAddressOrgID ?? 0),
  });

  useEffect(() => {
    if (res?.data && !!res.data.isReload && res.data.OrgID) {
      setAddress(addressInitData);
      window.location.reload();
    }
  }, [res?.data]);

  return res;
};
