
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { 
  AlertTriangle, ArrowDown, ArrowUp, Box, 
  DollarSign, Package, ShoppingCart, TrendingDown, TrendingUp 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { cn } from "@/lib/utils";

// Demo data
const stockMovementData = [
  { name: "Jan", entrada: 65, saida: 30 },
  { name: "Fev", entrada: 59, saida: 25 },
  { name: "Mar", entrada: 80, saida: 60 },
  { name: "Abr", entrada: 81, saida: 51 },
  { name: "Mai", entrada: 56, saida: 40 },
  { name: "Jun", entrada: 55, saida: 45 },
  { name: "Jul", entrada: 72, saida: 55 },
];

const topProductsData = [
  { name: "Notebook Dell XPS", value: 120 },
  { name: "iPhone 14 Pro", value: 80 },
  { name: "Monitor LG 27'", value: 60 },
  { name: "Teclado Mecânico", value: 45 },
  { name: "Mouse Logitech", value: 30 },
];

const categoryData = [
  { name: "Eletrônicos", value: 35 },
  { name: "Acessórios", value: 25 },
  { name: "Periféricos", value: 20 },
  { name: "Smartphones", value: 15 },
  { name: "Outros", value: 5 },
];

const lowStockProducts = [
  { id: 1, name: "Notebook Dell XPS", current: 2, min: 5 },
  { id: 2, name: "iPhone 14 Pro", current: 3, min: 10 },
  { id: 3, name: "Monitor LG 27'", current: 1, min: 5 },
];

const COLORS = ["#6366F1", "#8B5CF6", "#D946EF", "#EC4899", "#F43F5E"];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 145,
    totalCategories: 8,
    totalStock: 1245,
    totalValue: 342589.75,
    inMovements: 72,
    outMovements: 55,
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse bg-white/70">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Products */}
            <Card className="glass-card hover-lift">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total de Produtos</p>
                    <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <span className="flex items-center text-green-500 font-medium">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    15%
                  </span>
                  <span className="text-muted-foreground ml-2">vs mês anterior</span>
                </div>
              </div>
            </Card>

            {/* Stock Value */}
            <Card className="glass-card hover-lift">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Valor em Estoque</p>
                    <h3 className="text-2xl font-bold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.totalValue)}
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <span className="flex items-center text-green-500 font-medium">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    8.2%
                  </span>
                  <span className="text-muted-foreground ml-2">vs mês anterior</span>
                </div>
              </div>
            </Card>

            {/* Total Stock */}
            <Card className="glass-card hover-lift">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Itens em Estoque</p>
                    <h3 className="text-2xl font-bold">{stats.totalStock}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Box className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <span className="flex items-center text-green-500 font-medium">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    5.3%
                  </span>
                  <span className="text-muted-foreground ml-2">vs mês anterior</span>
                </div>
              </div>
            </Card>

            {/* Low Stock */}
            <Card className="glass-card hover-lift">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Alerta de Estoque</p>
                    <h3 className="text-2xl font-bold">{lowStockProducts.length}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <span className="flex items-center text-red-500 font-medium">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    2 itens
                  </span>
                  <span className="text-muted-foreground ml-2">em estado crítico</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Stock Movement Chart */}
            <Card className="glass-card col-span-2 hover-lift">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-6">Movimentação de Estoque</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stockMovementData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '12px',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                          border: 'none',
                        }}
                      />
                      <Bar 
                        name="Entrada" 
                        dataKey="entrada" 
                        fill="#6366F1" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <Bar 
                        name="Saída" 
                        dataKey="saida" 
                        fill="#EC4899" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Category Distribution */}
            <Card className="glass-card hover-lift">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-6">Distribuição por Categoria</h3>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '12px',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                          border: 'none',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Movements */}
            <Card className="glass-card hover-lift">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Movimentações Recentes</h3>
                <div className="space-y-4">
                  {[
                    { type: 'in', product: 'Notebook Dell XPS', quantity: 5, date: '10/08/2023' },
                    { type: 'out', product: 'iPhone 14 Pro', quantity: 2, date: '09/08/2023' },
                    { type: 'in', product: 'Monitor LG 27\'', quantity: 10, date: '08/08/2023' },
                    { type: 'out', product: 'Teclado Mecânico', quantity: 3, date: '07/08/2023' },
                  ].map((movement, i) => (
                    <div key={i} className="flex items-center p-3 rounded-lg hover:bg-white/40 transition-colors">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center mr-3",
                        movement.type === 'in' ? "bg-green-100" : "bg-red-100"
                      )}>
                        {movement.type === 'in' ? (
                          <ArrowUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{movement.product}</p>
                            <p className="text-xs text-muted-foreground">{movement.date}</p>
                          </div>
                          <span className={cn(
                            "text-sm font-medium",
                            movement.type === 'in' ? "text-green-600" : "text-red-600"
                          )}>
                            {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-primary text-sm hover:underline">Ver todas</button>
                </div>
              </div>
            </Card>

            {/* Top Products */}
            <Card className="glass-card hover-lift">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Produtos Mais Movimentados</h3>
                <div className="space-y-4">
                  {topProductsData.map((product, i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium text-sm">{product.name}</p>
                          <span className="text-sm">{product.value} un.</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                          <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{ width: `${(product.value / topProductsData[0].value) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Low Stock Alerts */}
            <Card className="glass-card hover-lift">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Alertas de Estoque Baixo</h3>
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="p-3 border border-amber-200 bg-amber-50/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                          <p className="font-medium text-sm">{product.name}</p>
                        </div>
                        <span className="text-sm font-medium text-amber-600">
                          {product.current}/{product.min}
                        </span>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-1.5 mt-2">
                        <div
                          className={cn(
                            "h-1.5 rounded-full",
                            product.current === 0
                              ? "bg-red-500"
                              : product.current < product.min / 2
                              ? "bg-amber-500"
                              : "bg-amber-400"
                          )}
                          style={{ width: `${(product.current / product.min) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full btn-outline text-sm">
                  Solicitar Reposição
                </button>
              </div>
            </Card>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
