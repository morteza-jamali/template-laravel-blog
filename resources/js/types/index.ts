export type Id = string | number;

export type KanbanColumn = {
  id: Id;
  title: string;
};

export type KanbanTask = {
  id: Id;
  columnId: Id;
  content: string;
  title?: string;
  status?: 'to do' | 'in progress' | 'done' | 'unassigned' | string;
  comments?: number;
  users?: number;
};

export type OrderStatus = 'shipped' | 'processing' | 'cancelled' | string;

export type Orders = {
  id: string;
  product: string;
  date: string;
  total: number;
  status: OrderStatus;
  payment_method: string;
};

export type InvoiceStatus =
  | 'pending'
  | 'sent'
  | 'cancelled'
  | 'approved'
  | 'suspended'
  | string;

export type Invoices = {
  id: string;
  full_name: string;
  email: string;
  address: string;
  country: string;
  status: InvoiceStatus;
  amount: number;
  issue_date: string;
  description: string;
  client_email: string;
  client_address: string;
  client_country: string;
  client_name: string;
  client_company: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  created_at: string;
  updated_at: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  created_at: string;
  updated_at: string;
};

export type Post = {
  id: number;
  author: number;
  view: number;
  like: number;
  title: string;
  slug: string;
  content: string;
  categories: string;
  tags: string;
  cover: string;
  status: 'publish' | 'draft';
  created_at: string;
  updated_at: string;
};

export type CompletePost = Omit<Post, 'categories'> & {
  categories: Array<Category>;
};
