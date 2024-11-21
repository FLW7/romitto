/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable unicorn/no-this-assignment */
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number) => {
  let lastFunc: NodeJS.Timeout | null = null;
  let lastRan: number | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (lastRan) {
      clearTimeout(lastFunc!);
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan! >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    } else {
      func.apply(context, args);
      lastRan = Date.now();
    }
  };
};
