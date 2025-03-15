
import { useState } from "react";
import { ArrowDown, ArrowUp, CalendarIcon, Filter, MoreHorizontal, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { StockMovement } from "@/types";
import { cn } from "@/lib/utils";

// Dados de exemplo para demonstração
const demoMovements: StockMovement[] = [
  {
    id: "1",
    productId: "1",
    productName: "Notebook Dell XPS 13",
    type: "in",
    quantity: 10,
    previousStock: 0,
    newStock: 10,
    reason: "Compra de fornecedor",
    userId: "1",
    userName: "Admin User",
    createdAt: "2023-08-10T15:30:00Z",
  },
  {
    id: "2",
    productId: "2",
    productName: "iPhone 14 Pro",
    type: "in",
    quantity: 5,
    previousStock: 0,
    newStock: 5,
    reason: "Compra de fornecedor",
    userId: "1",
    userName: "Admin User",
    createdAt: "2023-08-09T14:20:00Z",
  },
  {
    id: "3",
    productId: "2",
    productName: "iPhone 14 Pro",
    type: "out",
    quantity: 2,
    previousStock: 5,
    newStock: 3,
    reason: "Venda",
    userId: "1",
    userName: "Admin User",
    createdAt: "2023-08-11T09:45:00Z",
  },
  {
    id: "4",
    productId: "3",
    productName: "Monitor LG 27\" 4K",
    type: "in",
    quantity: 8,
    previousStock: 0,
    newStock: 8,
    reason: "Compra de fornecedor",
    userId: "1",
    userName: "Admin User",
    createdAt: "2023-08-08T16:10:00Z",
  },
  {
    id: "5",
    productId: "3",
    productName: "Monitor LG 27\" 4K",
    type: "out",
    quantity: 8,
    previousStock: 8,
    newStock: 0,
    reason: "Venda",
    userId: "1",
    userName: "Admin User",
    createdAt: "2023-08-15T11:30:00Z",
  },
  {
    id: "6",
    productId: "4",
    productName: "Teclado Mecânico Redragon",
    type: "in",
    quantity: 20,
    previousStock: 0,
    newStock: 20,
    reason: "Compra de fornecedor",
    userId: "1",
    userName: "Admin User",
    createdAt: "2023-08-05T10:15:00Z",
  },
  {
    id: "7",
    productId: "5",
    productName: "Mouse Logitech MX Master 3",
    type: "in",
    quantity: 15,
    previousStock: 0,
    newStock: 15,
    reason: "Compra de fornecedor",
    userId: "1",
    userName: "Admin User",
    createdAt: "2023-08-04T09:20:00Z",
  },
  {
    id: "8",
    productId: "5",
    productName: "Mouse Logitech MX Master 3",
    type: "out",
    quantity: 11,
    previousStock: 15,
    newStock: 4,
    reason: "Venda",
    userId: "1",
    userName: "Admin User",
    createdAt: "2023-08-16T14:50:00Z",
  },
  {
    id: "9",
    productId: "1",
    productName: "Notebook Dell XPS 13",
    type: "out",
    quantity: 3,
    previousStock: 10,
    newStock: 7,
    reason: "Venda",
    userId: "1",
    userName: "Admin User",
    createdAt: "2023-08-17T16:40:00Z",
  },
  {
    id: "10",
    productId: "4",
    productName: "Teclado Mecânico Redragon",
    type: "adjustment",
    quantity: 1,
    previousStock: 20,
    newStock: 21,
    reason: "Correção de inventário",
    userId: "1",
    userName: "Admin User",
    createdAt: "2023-08-18T15:30:00Z",
  },
];

const StockMovementPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [movements, setMovements] = useState<StockMovement[]>(demoMovements);

  // Formatar data
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy 'às' HH:mm", { locale: pt });
  };

  // Filtrar movimentações com base na pesquisa
  const filteredMovements = movements.filter(
    (movement) =>
      movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Movimentação de Estoque">
      {/* Header com ações */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Movimentação de Estoque</h1>
          <Badge className="ml-2">{movements.length} registros</Badge>
        </div>
        <div className="flex gap-2">
          <Button>
            <ArrowDown className="h-4 w-4 mr-2" />
            Registrar Saída
          </Button>
          <Button>
            <ArrowUp className="h-4 w-4 mr-2" />
            Registrar Entrada
          </Button>
        </div>
      </div>

      {/* Filtros e pesquisa */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar movimentações..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                Período
              </Button>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Lista de movimentações */}
      <div className="bg-white rounded-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data e Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque Anterior
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Novo Estoque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="p-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <p className="font-medium">Nenhuma movimentação encontrada</p>
                      <p className="text-sm mt-1">Tente modificar sua busca ou registrar novas movimentações.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMovements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(movement.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-sm">{movement.productName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {movement.type === 'in' && (
                        <Badge className="bg-green-500 hover:bg-green-600">Entrada</Badge>
                      )}
                      {movement.type === 'out' && (
                        <Badge variant="destructive">Saída</Badge>
                      )}
                      {movement.type === 'adjustment' && (
                        <Badge variant="outline" className="text-blue-600 border-blue-500">Ajuste</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "font-medium",
                        movement.type === 'in' ? "text-green-600" : 
                        movement.type === 'out' ? "text-red-600" : 
                        "text-blue-600"
                      )}>
                        {movement.type === 'in' && '+'}
                        {movement.type === 'out' && '-'}
                        {movement.quantity} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {movement.previousStock} unidades
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {movement.newStock} unidades
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {movement.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {movement.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem disabled>Editar</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem disabled className="text-red-600">
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StockMovementPage;
