export const normalizr = <T extends { id: string | number }>(input: ReadonlyArray<T>) =>
  input.reduce<Record<string | number, T>>((acc, next) => {
    acc[next.id] = next
    return acc
  }, {})
