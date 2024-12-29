import { useCallback, useRef } from 'react';

const useDebounce = (fn, delay) => {
  const timerId = useRef<number | undefined | null>();

  const debounce = useCallback(
    function () {
      let context = this,
        args = arguments;

      clearTimeout(timerId.current);

      timerId.current = setTimeout(function () {
        timerId.current = null;
        fn.apply(context, args);
      }, delay);
    },
    [fn, delay]
  );

  return debounce;
};

export default useDebounce;
