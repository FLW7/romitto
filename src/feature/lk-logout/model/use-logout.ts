import { useModal } from '@/shared/state/modal';

export function useLogout() {
  const { onOpen } = useModal();

  const handleLogout = () => {
    onOpen('logout');
  };

  return {
    handleLogout,
  };
}
