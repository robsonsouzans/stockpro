
export type User = {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'manager' | 'employee';
  avatarUrl?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  barcode?: string;
  sku: string;
  imageUrl?: string;
  minStock: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductWithStock = Product & {
  currentStock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
};

export type StockMovement = {
  id: string;
  productId: string;
  productName: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  userId: string;
  userName: string;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  count: number;
};

export type StockAlert = {
  id: string;
  productId: string;
  productName: string;
  currentStock: number;
  minStock: number;
  severity: 'low' | 'critical' | 'out';
  createdAt: string;
};

export type DashboardStats = {
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalMovements: number;
  stockValue: number;
};

export type TimeRange = 'today' | 'week' | 'month' | 'year' | 'all';

export type ChartData = {
  label: string;
  value: number;
};

export type StockChartData = {
  date: string;
  inflow: number;
  outflow: number;
};

export type TopProductData = {
  id: string;
  name: string;
  value: number;
  percentage: number;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
};
