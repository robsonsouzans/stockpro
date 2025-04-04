
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Box, Download, Filter, Plus, Search, SlidersHorizontal, AlertCircle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const navigate = useNavigate();

  // Sample inventory data
  const inventoryItems = [
    { id: 1, code: "PRD001", name: "Mouse sem fio", category: "Periféricos", quantity: 35, minStock: 10, status: "normal", lastUpdate: "12/03/2023" },
    { id: 2, code: "PRD002", name: "Teclado mecânico", category: "Periféricos", quantity: 12, minStock: 15, status: "baixo", lastUpdate: "15/03/2023" },
    { id: 3, code: "PRD003", name: "Monitor 24 polegadas", category: "Monitores", quantity: 8, minStock: 5, status: "normal", lastUpdate: "10/03/2023" },
    { id: 4, code: "PRD004", name: "Headset gamer", category: "Áudio", quantity: 2, minStock: 10, status: "crítico", lastUpdate: "18/03/2023" },
    { id: 5, code: "PRD005", name: "Webcam HD", category: "Periféricos", quantity: 18, minStock: 8, status: "normal", lastUpdate: "05/03/2023" },
    { id: 6, code: "PRD006", name: "SSD 500GB", category: "Armazenamento", quantity: 25, minStock: 10, status: "normal", lastUpdate: "08/03/2023" },
    { id: 7, code: "PRD007", name: "Memória RAM 16GB", category: "Componentes", quantity: 5, minStock: 8, status: "baixo", lastUpdate: "14/03/2023" },
    { id: 8, code: "PRD008", name: "Placa de vídeo RTX 3060", category: "Componentes", quantity: 3, minStock: 5, status: "baixo", lastUpdate: "20/03/2023" },
    { id: 9, code: "PRD009", name: "Cabo HDMI 2m", category: "Cabos", quantity: 42, minStock: 15, status: "normal", lastUpdate: "01/03/2023" },
    { id: 10, code: "PRD010", name: "Cooler para CPU", category: "Refrigeração", quantity: 1, minStock: 6, status: "crítico", lastUpdate: "22/03/2023" },
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

  // Filter items based on search query and status filter
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewItemDetails = (id: number) => {
    toast.info(`Visualizando detalhes do item ${id}`);
    // Em uma aplicação real, isso navegaria para uma página de detalhes
    // navigate(`/inventory/${id}`);
  };

  const handleEditItem = (id: number) => {
    toast.info(`Editando item ${id}`);
  };

  const handleDeleteItem = (id: number) => {
    toast.success(`Item ${id} excluído com sucesso`);
  };

  const handleAddItem = () => {
    setOpenAddDialog(false);
    toast.success("Novo item adicionado ao estoque");
  };

  return (
    <DashboardLayout title="Inventário">
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Gestão de Estoque</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1 h-9">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Exportar</span>
            </Button>
            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1 h-9">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Novo Item</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Item</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do novo item a ser adicionado ao estoque.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input id="name" placeholder="Nome do produto" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Categoria
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="perifericos">Periféricos</SelectItem>
                        <SelectItem value="componentes">Componentes</SelectItem>
                        <SelectItem value="armazenamento">Armazenamento</SelectItem>
                        <SelectItem value="monitores">Monitores</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantidade
                    </Label>
                    <Input id="quantity" type="number" placeholder="0" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="minStock" className="text-right">
                      Estoque Mínimo
                    </Label>
                    <Input id="minStock" type="number" placeholder="0" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddItem}>Adicionar Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="todos" className="w-full" onValueChange={value => setStatusFilter(value === "todos" ? "all" : value)}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList className="h-9">
              <TabsTrigger value="todos" className="text-xs sm:text-sm">Todos</TabsTrigger>
              <TabsTrigger value="normal" className="text-xs sm:text-sm">Normal</TabsTrigger>
              <TabsTrigger value="baixo" className="text-xs sm:text-sm">Baixo</TabsTrigger>
              <TabsTrigger value="crítico" className="text-xs sm:text-sm">Crítico</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar item..."
                  className="pl-8 h-9 md:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)}>
                <ToggleGroupItem value="list" aria-label="Lista" className="h-9 px-3" title="Visão em Lista">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                    <line x1="8" x2="21" y1="6" y2="6"/>
                    <line x1="8" x2="21" y1="12" y2="12"/>
                    <line x1="8" x2="21" y1="18" y2="18"/>
                    <line x1="3" x2="3.01" y1="6" y2="6"/>
                    <line x1="3" x2="3.01" y1="12" y2="12"/>
                    <line x1="3" x2="3.01" y1="18" y2="18"/>
                  </svg>
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Grid" className="h-9 px-3" title="Visão em Grid">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid">
                    <rect width="7" height="7" x="3" y="3" rx="1"/>
                    <rect width="7" height="7" x="14" y="3" rx="1"/>
                    <rect width="7" height="7" x="14" y="14" rx="1"/>
                    <rect width="7" height="7" x="3" y="14" rx="1"/>
                  </svg>
                </ToggleGroupItem>
              </ToggleGroup>
              
              <Button variant="outline" size="icon" className="h-9 w-9">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="todos" className="m-0">
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md dark:bg-card">
              {viewMode === "list" ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Código</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead className="hidden md:table-cell">Categoria</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right hidden sm:table-cell">Estoque Mínimo</TableHead>
                        <TableHead className="hidden sm:table-cell">Última Atualização</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                          <TableRow key={item.id} className="hover:bg-muted/40">
                            <TableCell className="font-medium">{item.code}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right hidden sm:table-cell">{item.minStock}</TableCell>
                            <TableCell className="hidden sm:table-cell">{item.lastUpdate}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(item.status)}>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleViewItemDetails(item.id)} title="Ver detalhes">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleEditItem(item.id)} title="Editar">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteItem(item.id)} title="Excluir">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                              <AlertCircle className="h-8 w-8 text-muted-foreground/60" />
                              <p>Nenhum item encontrado.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-md transition-all dark:bg-card/80">
                        <div className="p-4 flex flex-col h-full">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className={getStatusColor(item.status)}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{item.code}</span>
                          </div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                          <div className="mt-auto flex justify-between pt-2 text-sm">
                            <span>Quantidade: <strong>{item.quantity}</strong></span>
                            <span>Mín: {item.minStock}</span>
                          </div>
                          <div className="mt-4 pt-3 border-t border-border flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewItemDetails(item.id)} className="h-8 px-2">
                              Detalhes
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditItem(item.id)} className="h-8 px-2">
                              Editar
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full h-24 flex items-center justify-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle className="h-8 w-8 text-muted-foreground/60" />
                        <p>Nenhum item encontrado.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="normal" className="m-0">
            {/* Content for normal status filter - generated dynamically through the filter */}
          </TabsContent>
          
          <TabsContent value="baixo" className="m-0">
            {/* Content for baixo status filter - generated dynamically through the filter */}
          </TabsContent>
          
          <TabsContent value="crítico" className="m-0">
            {/* Content for crítico status filter - generated dynamically through the filter */}
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground">
          Mostrando {filteredItems.length} de {inventoryItems.length} itens
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
