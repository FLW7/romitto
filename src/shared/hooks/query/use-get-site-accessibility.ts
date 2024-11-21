import { useMutation } from '@tanstack/react-query';

import { getSiteAccessibility } from '@/shared/api/gat-site-accessibility';
import { useToast } from '@/shared/components/use-toast';
import { SiteAccessibilityEn } from '@/shared/type/site-accessibility-en';
interface PropsMutate {
  code?: string;
}
interface Props {
  setIsOff: (value: boolean) => void;
}

export const useGetSiteAccessibilityMutation = ({ setIsOff }: Props) => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ code }: PropsMutate) => await getSiteAccessibility({ code }),
    onSuccess: (data) => {
      if (data?.Access === SiteAccessibilityEn.TRUE) {
        setIsOff(false);
      } else {
        toast({ title: 'Код неверный' });
      }
    },
  });
};
