import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/shared/api/profile';
import { QUERY_KEY } from '@/shared/const/query-key';
import { getCookie } from '@/shared/lib/cookies';
import { useAuth } from '@/shared/state/auth';

export const useGetProfile = () => {
  const { logout } = useAuth();
  const token = getCookie('token');

  const data = useQuery({
    enabled: !!token,
    queryKey: QUERY_KEY.profile(token ?? ''),
    queryFn: async () => await getProfile(),
  });

  const profile = data.data;

  useEffect(() => {
    if (profile?.error) {
      logout();
    }
  }, [logout, profile]);

  return data;
};
