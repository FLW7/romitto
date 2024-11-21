import { AppBlock } from './el/app-block';
import Header from './el/header';
import { Links } from './el/links';
import PhoneBlock from './el/phone-block';

const SidebarCatalog = () => {
  return (
    <div className={'relative flex max-h-[100vh] flex-col'}>
      <Header />
      <div className={'mt-3 flex flex-col gap-y-[60px] px-4'}>
        <Links />
        <PhoneBlock />
        <AppBlock />
      </div>
    </div>
  );
};

export default SidebarCatalog;
