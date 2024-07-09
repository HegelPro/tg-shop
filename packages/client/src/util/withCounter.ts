export interface WithCounter<T> {
  data: T;
  counter: number;
}


export const wrapWithCounter = <T>(data: T): WithCounter<T> => {
  return {
    data,
    counter: 0
  }
}

export const unwrapWithCounter = <T>(wrappedData: WithCounter<T>): T => {
  return wrappedData.data
}

export const incrementCounterReducer = <T>(dataWithCounter: WithCounter<T>): WithCounter<T> => {
  return {
    ...dataWithCounter,
    counter: dataWithCounter.counter + 1
  }
}

export const decrementCounterReducer = <T>(dataWithCounter: WithCounter<T>): WithCounter<T> => {
  return {
    ...dataWithCounter,
    counter: dataWithCounter.counter - 1
  }
}