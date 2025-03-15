
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BarChart2, PieChart } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const Reports = () => {
  // Sample data for the chart
  const data = [
    {
      name: 'Jan',
      entrada: 4000,
      saida: 2400,
    },
    {
      name: 'Fev',
      entrada: 3000,
      saida: 1398,
    },
    {
      name: 'Mar',
      entrada: 2000,
      saida: 9800,
    },
    {
      name: 'Abr',
      entrada: 2780,
      saida: 3908,
    },
    {
      name: 'Mai',
      entrada: 1890,
      saida: 4800,
    },
    {
      name: 'Jun',
      entrada: 2390,
      saida: 3800,
    },
  ];

  return (
    <DashboardLayout title="Relatórios">
      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Movimentação de Estoque</h2>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-sm">
                <span className="h-3 w-3 rounded-full bg-primary"></span>
                Entradas
              </span>
              <span className="flex items-center gap-1 text-sm">
                <span className="h-3 w-3 rounded-full bg-destructive"></span>
                Saídas
              </span>
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entrada" fill="#0091EA" />
                <Bar dataKey="saida" fill="#FF5252" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="text-primary" />
              <h3 className="text-lg font-medium">Resumo de Vendas</h3>
            </div>
            <p className="text-muted-foreground">
              Relatório detalhado de vendas por período está em desenvolvimento.
            </p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="text-primary" />
              <h3 className="text-lg font-medium">Produtos por Categoria</h3>
            </div>
            <p className="text-muted-foreground">
              Distribuição de produtos por categoria está em desenvolvimento.
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
