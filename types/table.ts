export interface Column<T> {
  title: string;
  dataIndex?: keyof T;
  key: string;
  width?: string;
  render?: (text: any, record: T) => React.ReactNode;
}
