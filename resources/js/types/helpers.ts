export type PartialBy<T, K extends keyof T> = Required<Omit<T, K>> &
  Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Partial<Omit<T, K>> &
  Required<Pick<T, K>>;
