
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Box, Download, Filter, Plus } from "lucide-react";

const Inventory = () => {
  // Sample inventory data
  const inventoryItems = [
    { id: 1, code: "PRD001", name: "Mouse sem fio", quantity: 35, minStock: 10, status: "normal" },
    { id: 2, code: "PRD002", name: "Teclado mecânico", quantity: 12, minStock: 15, status: "baixo" },
    { id: 3, code: "PRD003", name: "Monitor 24 polegadas", quantity: 8, minStock: 5, status: "normal" },
    { id: 4, code: "PRD004", name: "Headset gamer", quantity: 2, minStock: 10, status: "crítico" },
    { id: 5, code: "PRD005", name: "Webcam HD", quantity: 18, minStock: 8, status: "normal" },
  ];

  // Function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "baixo":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "crítico":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <DashboardLayout title="Inventário">
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Gestão de Estoque</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Novo Item
            </Button>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Estoque Mínimo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.minStock}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Mostrando {inventoryItems.length} itens do inventário
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
