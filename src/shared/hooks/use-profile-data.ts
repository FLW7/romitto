import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@/shared/const/query-key';
import { getCookie } from '@/shared/lib/cookies';
import type { IProfileResponse } from '@/shared/type/profile';

export const useProfileData = () => {
  const client = useQueryClient();
  const profile = client.getQueryData(QUERY_KEY.profile(getCookie('token') ?? ''));

  return profile as IProfileResponse;
};
