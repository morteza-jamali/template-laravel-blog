export type Data = Array<any>;

export interface SliceProps {
  data: Data;
  count?: number;
}
export const slice = ({ data, count }: SliceProps) =>
  count && count > 0 && count <= data.length ? data.slice(0, count) : data;

export interface AddIdProps {
  data: Data;
}
export const addId = <T>({ data }: AddIdProps): Array<T> =>
  data.map((item, id) => ({ id, ...item }) as unknown as T);

export interface ImportDataProps extends Omit<SliceProps, 'data'> {
  path: string;
}
export const importData = <T>({ path, count }: ImportDataProps) =>
  import(path).then(({ default: data }) =>
    addId<T>({ data: slice({ data, count }) }),
  );
