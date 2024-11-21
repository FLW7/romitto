'use client';

import { OrgDetail } from '@/feature/org-detail';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';
import { type IOrganizationItem } from '@/widgets/restaurants/rest-lists/type';

const DetailRestModal = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = isOpen && type === 'detailRest';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        className={
          'h-full overflow-y-auto bg-white !p-0 text-black sm:h-auto sm:overflow-visible'
        }
        hideCloseButton={isMobile}
      >
        {data?.org && <OrgDetail org={data?.org as IOrganizationItem} />}
      </DialogContent>
    </Dialog>
  );
};

export default DetailRestModal;
