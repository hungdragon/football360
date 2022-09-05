import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Fetches key and passes the result to callback, along with an Error if there is any.
 */
export const getItem = (
  key: string,
  _callback?: (error?: Error, result?: string) => void,
): Promise<string | null> => {
  return AsyncStorage.getItem(key);
};

/**
 * Sets value for key and calls callback on completion, along with an Error if there is any
 */
export const setItem = (
  key: string,
  value: string,
  _callback?: (error?: Error) => void,
): Promise<void> => {
  return AsyncStorage.setItem(key, value);
};

export const removeItem = (
  key: string,
  _callback?: (error?: Error) => void,
): Promise<void> => {
  return AsyncStorage.removeItem(key);
};
