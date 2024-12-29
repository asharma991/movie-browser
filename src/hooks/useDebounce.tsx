// @ts-nocheck
import { useCallback, useRef } from 'react';

const useDebounce = (fn: () => void, delay: number) => {
  const timerId = useRef<number | undefined | null>();

  const debounce = useCallback(
    function () {
      const context = this;

      clearTimeout(timerId.current);

      timerId.current = setTimeout(function () {
        timerId.current = null;
        fn.apply(context, arguments);
      }, delay);
    },
    [fn, delay]
  );

  return debounce;
};

export default useDebounce;
