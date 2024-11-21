'use client';

import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const scriptEl = document.createElement('script');
    const block = document.querySelector('#certificate_widget');

    scriptEl.type = 'text/javascript';
    scriptEl.async = true;
    scriptEl.src =
      'https://widget.metechcards.ru/widget/?client_id=d042b8e8-2147-8365-4401-fb9d743bb64c';
    block?.append(scriptEl);

    return () => {
      scriptEl.remove();
    };
  }, []);

  return <div id='certificate_widget'></div>;
};

export default Home;
