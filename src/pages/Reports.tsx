
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BarChart2, PieChart } from "lucide-react";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell,
  Legend, 
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer, 
  Sector,
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { Download, Filter } from "lucide-react";

const Reports = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [activeIndex, setActiveIndex] = useState(0);

  // Sample data for the bar chart
  const barData = [
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

  // Sample data for the pie chart
  const pieData = [
    { name: 'Eletrônicos', value: 400 },
    { name: 'Periféricos', value: 300 },
    { name: 'Acessórios', value: 200 },
    { name: 'Cabos', value: 150 },
    { name: 'Outros', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-medium">
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">
          {`${value} unidades`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  return (
    <DashboardLayout title="Relatórios">
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">Análise de Estoque</h2>
          <div className="flex flex-wrap items-center gap-3">
            <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
              <ToggleGroupItem value="1m">1M</ToggleGroupItem>
              <ToggleGroupItem value="3m">3M</ToggleGroupItem>
              <ToggleGroupItem value="6m">6M</ToggleGroupItem>
              <ToggleGroupItem value="1y">1A</ToggleGroupItem>
            </ToggleGroup>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <Card className="p-6 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h2 className="text-lg font-medium">Movimentação de Estoque</h2>
              <p className="text-sm text-muted-foreground">Entradas e saídas nos últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-4">
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
                data={barData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="entrada" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saida" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h3 className="flex items-center gap-2 text-lg font-medium">
                  <PieChart className="h-5 w-5 text-primary" />
                  Produtos por Categoria
                </h3>
                <p className="text-sm text-muted-foreground">Distribuição atual do estoque</p>
              </div>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="p-6 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h3 className="flex items-center gap-2 text-lg font-medium">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  Resumo de Vendas
                </h3>
                <p className="text-sm text-muted-foreground">Performance por período</p>
              </div>
            </div>
            <div className="flex items-center justify-center h-80">
              <div className="text-center space-y-4">
                <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  Relatório detalhado de vendas por período em desenvolvimento.
                </p>
                <Button variant="outline" className="mx-auto">Solicitar acesso</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
