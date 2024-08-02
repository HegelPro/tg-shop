import { decrement, increment } from "./math";

export interface Counter<T> {
  data: T;
  counter: number;
}

export const wrapCounter = <T>(data: T): Counter<T> => ({
  data,
  counter: 0
})

export const unwrapCounter = <T>(wrappedData: Counter<T>): T => {
  return wrappedData.data
}

export const incrementCounter = <T>(dataCounter: Counter<T>): Counter<T> => ({
  ...dataCounter,
  counter: increment(dataCounter.counter)
})

export const decrementCounter = <T>(dataCounter: Counter<T>): Counter<T> => ({
  ...dataCounter,
  counter: decrement(dataCounter.counter)
})
