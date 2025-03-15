
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductWithStock, StockMovement } from "@/types";
import { ArrowLeft, ArrowUpDown, Edit, Trash, Package, BarChart4, Truck, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Dados de exemplo para demonstração
const demoProducts: Record<string, ProductWithStock> = {
  "1": {
    id: "1",
    name: "Notebook Dell XPS 13",
    description: "Notebook premium com processador Intel i7, 16GB RAM e 512GB SSD. Tela de 13.4 polegadas Full HD, design ultrafino e bateria de longa duração. Ideal para profissionais que precisam de desempenho e portabilidade.",
    price: 8999.99,
    category: "Notebooks",
    sku: "NB-DELL-XPS13",
    barcode: "789012345678",
    imageUrl: "/placeholder.svg",
    minStock: 5,
    currentStock: 7,
    stockStatus: "in_stock",
    createdAt: "2023-08-01T10:30:00Z",
    updatedAt: "2023-08-17T16:45:00Z",
  },
  "2": {
    id: "2",
    name: "iPhone 14 Pro",
    description: "Smartphone Apple com tela Super Retina XDR de 6,1\", processador A16 Bionic, câmera tripla de 48MP e Face ID. Disponível em Preto Espacial.",
    price: 6999.99,
    category: "Smartphones",
    sku: "SP-APPLE-IP14P",
    barcode: "789012345679",
    imageUrl: "/placeholder.svg",
    minStock: 10,
    currentStock: 3,
    stockStatus: "low_stock",
    createdAt: "2023-08-02T11:20:00Z",
    updatedAt: "2023-08-11T09:50:00Z",
  },
  "3": {
    id: "3",
    name: "Monitor LG 27\" 4K",
    description: "Monitor UHD 4K com HDR10 e 99% sRGB, conexões HDMI e DisplayPort, ajuste de altura e inclinação.",
    price: 2799.99,
    category: "Monitores",
    sku: "MN-LG-27UL650",
    barcode: "789012345680",
    imageUrl: "/placeholder.svg",
    minStock: 5,
    currentStock: 0,
    stockStatus: "out_of_stock",
    createdAt: "2023-08-03T09:15:00Z",
    updatedAt: "2023-08-15T11:35:00Z",
  },
};

// Movimentações de estoque para o produto
const getProductMovements = (productId: string): StockMovement[] => {
  return [
    {
      id: "1",
      productId,
      productName: demoProducts[productId]?.name || "",
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
      id: "3",
      productId,
      productName: demoProducts[productId]?.name || "",
      type: "out",
      quantity: 3,
      previousStock: 10,
      newStock: 7,
      reason: "Venda",
      userId: "1",
      userName: "Admin User",
      createdAt: "2023-08-17T16:40:00Z",
    },
  ];
};

const ProductDetail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductWithStock | null>(demoProducts[id] || null);
  const [movements, setMovements] = useState<StockMovement[]>(getProductMovements(id));
  const [openStockDialog, setOpenStockDialog] = useState(false);
  const [stockAdjustment, setStockAdjustment] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Formatar data
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: pt });
  };

  const getStockStatusInfo = () => {
    if (!product) return null;

    switch (product.stockStatus) {
      case "in_stock":
        return {
          label: "Em estoque",
          badge: <Badge className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">Em estoque</Badge>,
          color: "text-green-600 dark:text-green-400",
          message: "O estoque está adequado",
        };
      case "low_stock":
        return {
          label: "Estoque baixo",
          badge: <Badge variant="outline" className="text-amber-600 border-amber-500 dark:text-amber-400 dark:border-amber-400">Estoque baixo</Badge>,
          color: "text-amber-600 dark:text-amber-400",
          message: "Estoque abaixo do mínimo recomendado",
        };
      case "out_of_stock":
        return {
          label: "Sem estoque",
          badge: <Badge variant="destructive">Sem estoque</Badge>,
          color: "text-red-600 dark:text-red-400",
          message: "Produto indisponível - repor com urgência",
        };
      default:
        return {
          label: "Desconhecido",
          badge: <Badge variant="outline">Desconhecido</Badge>,
          color: "text-gray-600 dark:text-gray-400",
          message: "",
        };
    }
  };

  const handleEditProduct = () => {
    toast.info(`Editando produto ${product?.name}`);
  };

  const handleDeleteProduct = () => {
    setOpenDeleteDialog(false);
    toast.success(`Produto ${product?.name} excluído com sucesso`);
    navigate('/products');
  };

  const handleAdjustStock = () => {
    if (!product) return;
    
    const newStock = product.currentStock + stockAdjustment;
    
    // Determine new stock status
    let newStockStatus = "in_stock";
    if (newStock <= 0) {
      newStockStatus = "out_of_stock";
    } else if (newStock < product.minStock) {
      newStockStatus = "low_stock";
    }
    
    // Update product
    const updatedProduct = {
      ...product,
      currentStock: newStock,
      stockStatus: newStockStatus as "in_stock" | "low_stock" | "out_of_stock",
      updatedAt: new Date().toISOString()
    };
    
    // Add movement
    const newMovement: StockMovement = {
      id: (Date.now()).toString(),
      productId: product.id,
      productName: product.name,
      type: stockAdjustment > 0 ? "in" : "out",
      quantity: Math.abs(stockAdjustment),
      previousStock: product.currentStock,
      newStock,
      reason: "Ajuste manual",
      userId: "1",
      userName: "Admin User",
      createdAt: new Date().toISOString(),
    };
    
    setProduct(updatedProduct);
    setMovements([newMovement, ...movements]);
    setOpenStockDialog(false);
    setStockAdjustment(0);
    
    toast.success(`Estoque atualizado: ${newStock} unidades`);
  };

  const handleRequestRestock = () => {
    if (!product) return;
    toast.success(`Reposição solicitada para ${product.name}`);
  };

  if (!product) {
    return (
      <DashboardLayout title="Produto não encontrado">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center py-8">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Produto não encontrado</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">O produto com o ID '{id}' não existe.</p>
            <Link to="/products">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para produtos
              </Button>
            </Link>
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  const stockStatus = getStockStatusInfo();

  return (
    <DashboardLayout title="Detalhes do Produto">
      {/* Header com ações */}
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
        <div className="flex items-center space-x-4">
          <Link to="/products">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {stockStatus?.badge}
        </div>
        <div className="flex space-x-2">
          <Dialog open={openStockDialog} onOpenChange={setOpenStockDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Ajustar estoque
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajustar Estoque</DialogTitle>
                <DialogDescription>
                  Informe a quantidade a ser adicionada ou removida do estoque.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Produto:</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estoque atual:</span>
                    <span>{product.currentStock} unidades</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adjustment">Ajuste de quantidade:</Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setStockAdjustment(prev => prev - 1)}
                      disabled={product.currentStock + stockAdjustment - 1 < 0}
                    >
                      -
                    </Button>
                    <Input 
                      id="adjustment" 
                      type="number" 
                      className="text-center"
                      value={stockAdjustment}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setStockAdjustment(val);
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setStockAdjustment(prev => prev + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {stockAdjustment > 0 
                      ? `Adicionando ${stockAdjustment} unidades` 
                      : stockAdjustment < 0 
                        ? `Removendo ${Math.abs(stockAdjustment)} unidades` 
                        : "Sem alteração"}
                  </p>
                </div>
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Novo estoque:</span>
                    <span className="font-bold">{product.currentStock + stockAdjustment} unidades</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={handleAdjustStock} disabled={stockAdjustment === 0}>
                  Confirmar Ajuste
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="gap-2" onClick={handleEditProduct}>
            <Edit className="h-4 w-4" />
            Editar
          </Button>
          
          <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash className="h-4 w-4" />
                Excluir
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Excluir Produto</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.sku}</p>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDeleteProduct}>
                  Excluir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Informações do produto */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">SKU</dt>
                    <dd className="mt-1 text-sm font-semibold">{product.sku}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Código de barras</dt>
                    <dd className="mt-1 text-sm font-semibold">{product.barcode || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Categoria</dt>
                    <dd className="mt-1">
                      <Badge variant="outline" className="dark:border-gray-600">{product.category}</Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Preço</dt>
                    <dd className="mt-1 text-lg font-bold">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Criado em</dt>
                    <dd className="mt-1 text-sm">{formatDate(product.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Última atualização</dt>
                    <dd className="mt-1 text-sm">{formatDate(product.updatedAt)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <BarChart4 className="h-5 w-5 mr-2 text-primary" />
              Informações de Estoque
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</span>
                  <span className={stockStatus?.color}>{stockStatus?.label}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  {stockStatus?.message && (
                    <>
                      {product.stockStatus === "out_of_stock" || product.stockStatus === "low_stock" ? (
                        <AlertTriangle className={cn(
                          "h-4 w-4",
                          product.stockStatus === "out_of_stock" ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"
                        )} />
                      ) : (
                        <Package className="h-4 w-4 text-green-600 dark:text-green-400" />
                      )}
                      <span className={cn(
                        "text-sm",
                        stockStatus.color
                      )}>
                        {stockStatus.message}
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Estoque atual</span>
                  <span className="font-bold text-xl">{product.currentStock}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 mt-2">
                  <div
                    className={cn(
                      "h-2.5 rounded-full",
                      product.stockStatus === "in_stock"
                        ? "bg-green-500"
                        : product.stockStatus === "low_stock"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    )}
                    style={{
                      width: `${
                        product.currentStock >= product.minStock
                          ? 100
                          : (product.currentStock / product.minStock) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Estoque mínimo</span>
                  <span className="font-medium">{product.minStock}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Valor em estoque</span>
                  <span className="font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price * product.currentStock)}
                  </span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-2" 
                disabled={product.stockStatus !== "low_stock" && product.stockStatus !== "out_of_stock"}
                onClick={handleRequestRestock}
              >
                <Truck className="h-4 w-4 mr-2" />
                Solicitar Reposição
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs para movimentações e outras informações */}
      <Tabs defaultValue="movements" className="mb-6">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="movements">Movimentações</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="notes">Anotações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="movements" className="mt-6">
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Movimentações de Estoque</h3>
                <Button variant="outline" size="sm">Ver Todas</Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Data e Hora
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Quantidade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Estoque Anterior
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Novo Estoque
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Motivo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Usuário
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-card divide-y divide-gray-200 dark:divide-gray-700">
                    {movements.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-4 text-center">
                          <div className="flex flex-col items-center justify-center py-6 text-gray-500 dark:text-gray-400">
                            <p>Nenhuma movimentação registrada para este produto.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      movements.map((movement) => (
                        <tr key={movement.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {formatDate(movement.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {movement.type === 'in' && (
                              <Badge className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">Entrada</Badge>
                            )}
                            {movement.type === 'out' && (
                              <Badge variant="destructive">Saída</Badge>
                            )}
                            {movement.type === 'adjustment' && (
                              <Badge variant="outline" className="text-blue-600 border-blue-500 dark:text-blue-400 dark:border-blue-400">Ajuste</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={cn(
                              "font-medium",
                              movement.type === 'in' ? "text-green-600 dark:text-green-400" : 
                              movement.type === 'out' ? "text-red-600 dark:text-red-400" : 
                              "text-blue-600 dark:text-blue-400"
                            )}>
                              {movement.type === 'in' && '+'}
                              {movement.type === 'out' && '-'}
                              {movement.quantity} unidades
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {movement.previousStock} unidades
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {movement.newStock} unidades
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {movement.reason}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {movement.userName}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Histórico de Alterações</h3>
              <div className="flex flex-col items-center justify-center py-6 text-gray-500 dark:text-gray-400">
                <p>Histórico em desenvolvimento.</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Anotações</h3>
              <div className="flex flex-col items-center justify-center py-6 text-gray-500 dark:text-gray-400">
                <p>Anotações em desenvolvimento.</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProductDetail;
