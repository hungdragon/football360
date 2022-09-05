import {useRef, useEffect} from 'react';
import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';

// Áp dụng`useDispatch` and `useSelector` cho toàn bộ ứng dụng
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Delay gọi hàm sau 1 khoảng thời gian
 * @param callback : Hàm xử lý sau khoảng thời gian delay
 * @param delay: thời gian delay theo second
 */
export const useInterval = (
  callback: () => void,
  delay: number | undefined,
): void => {
  const savedCallback = useRef<() => void>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay) {
      const id = setInterval(tick, delay * 1000);
      return () => clearInterval(id);
    }
  }, [delay]);
};
