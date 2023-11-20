import { useCallback, useRef } from "react";

export const useDebounce = (delay = 300, executeFirstTime = true) => {
  const debouncing = useRef<NodeJS.Timeout | undefined>();
  const shouldExecuteImmediately = useRef(executeFirstTime);

  const debounce = useCallback(
    (func: () => void) => {
      if (shouldExecuteImmediately.current) {
        shouldExecuteImmediately.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }
        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay]
  );

  return { debounce };
};
