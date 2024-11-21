let isClient = false;

if (typeof window !== 'undefined') {
  isClient = true;
}

const setCookie = (name: string, value: string, days = 30) => {
  if (!isClient) return;

  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();

  // eslint-disable-next-line unicorn/no-document-cookie
  document.cookie = `${name}=${value};expires=${expires};path=/`;
};

const getCookie = (name: string) => {
  if (!isClient) return null;

  const cookies = document.cookie.split(';');

  for (const cooky of cookies) {
    const cookie = cooky.trim().split('=');

    if (cookie[0] === name) return cookie[1];
  }

  return null;
};

const removeCookie = (name: string) => {
  if (!isClient) return;
  // eslint-disable-next-line unicorn/no-document-cookie
  document.cookie = `${name}=;expires=${new Date(0).toUTCString()};path=/`;
};

export { setCookie, getCookie, removeCookie };
