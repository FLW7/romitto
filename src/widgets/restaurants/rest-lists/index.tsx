import { useEffect, useRef } from 'react';

import { RestCard } from '@/entities/rest-card';
import { useActivePlaceId } from '@/feature/form-modal-choose-pickup/state/use-active-place-id';
import { useModal } from '@/shared/state/modal';
import { useGetAllOrganizations } from '@/widgets/restaurants/rest-lists/model/use-get-all-organizations';

export const RestLists = () => {
  const { activeId, setActiveId } = useActivePlaceId();
  const { onOpen } = useModal();
  const { data } = useGetAllOrganizations();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current.querySelector(`#rest_${activeId}`);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeId]);

  return (
    <section
      ref={ref}
      className={'scrollbar-thin flex flex-col gap-3 lg:gap-1 lg:overflow-y-auto'}
    >
      {data?.map((org) => (
        <RestCard
          id={org.id}
          item={org}
          key={org.id}
          isActive={activeId === org.id}
          onClick={() => {
            setActiveId(org.id);
            onOpen('detailRest', { org });
          }}
        />
      ))}
    </section>
  );
};
