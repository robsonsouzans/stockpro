
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  const [product, setProduct] = useState<ProductWithStock | null>(demoProducts[id] || null);
  const [movements, setMovements] = useState<StockMovement[]>(getProductMovements(id));

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
          badge: <Badge className="bg-green-500 hover:bg-green-600">Em estoque</Badge>,
          color: "text-green-600",
          message: "O estoque está adequado",
        };
      case "low_stock":
        return {
          label: "Estoque baixo",
          badge: <Badge variant="outline" className="text-amber-600 border-amber-500">Estoque baixo</Badge>,
          color: "text-amber-600",
          message: "Estoque abaixo do mínimo recomendado",
        };
      case "out_of_stock":
        return {
          label: "Sem estoque",
          badge: <Badge variant="destructive">Sem estoque</Badge>,
          color: "text-red-600",
          message: "Produto indisponível - repor com urgência",
        };
      default:
        return {
          label: "Desconhecido",
          badge: <Badge variant="outline">Desconhecido</Badge>,
          color: "text-gray-600",
          message: "",
        };
    }
  };

  if (!product) {
    return (
      <DashboardLayout title="Produto não encontrado">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center py-8">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Produto não encontrado</h2>
            <p className="text-gray-500 mb-6">O produto com o ID '{id}' não existe.</p>
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
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Ajustar estoque
          </Button>
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" className="gap-2">
            <Trash className="h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Informações do produto */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">SKU</dt>
                    <dd className="mt-1 text-sm font-semibold">{product.sku}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Código de barras</dt>
                    <dd className="mt-1 text-sm font-semibold">{product.barcode || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Categoria</dt>
                    <dd className="mt-1">
                      <Badge variant="outline">{product.category}</Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Preço</dt>
                    <dd className="mt-1 text-lg font-bold">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Criado em</dt>
                    <dd className="mt-1 text-sm">{formatDate(product.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Última atualização</dt>
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
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <span className={stockStatus?.color}>{stockStatus?.label}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  {stockStatus?.message && (
                    <>
                      {product.stockStatus === "out_of_stock" || product.stockStatus === "low_stock" ? (
                        <AlertTriangle className={cn(
                          "h-4 w-4",
                          product.stockStatus === "out_of_stock" ? "text-red-600" : "text-amber-600"
                        )} />
                      ) : (
                        <Package className="h-4 w-4 text-green-600" />
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
                  <span className="text-sm font-medium text-gray-500">Estoque atual</span>
                  <span className="font-bold text-xl">{product.currentStock}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mt-2">
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
              
              <div className="pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Estoque mínimo</span>
                  <span className="font-medium">{product.minStock}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Valor em estoque</span>
                  <span className="font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price * product.currentStock)}
                  </span>
                </div>
              </div>
              
              <Button className="w-full mt-2" disabled={product.stockStatus !== "low_stock" && product.stockStatus !== "out_of_stock"}>
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
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data e Hora
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {movements.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-4 text-center">
                          <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                            <p>Nenhuma movimentação registrada para este produto.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      movements.map((movement) => (
                        <tr key={movement.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(movement.createdAt)}
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
              <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                <p>Histórico em desenvolvimento.</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Anotações</h3>
              <div className="flex flex-col items-center justify-center py-6 text-gray-500">
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
