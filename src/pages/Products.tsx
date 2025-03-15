
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, ArrowUpDown, Package, MoreHorizontal } from "lucide-react";
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
import { ProductWithStock } from "@/types";

// Dados de exemplo para demonstração
const demoProducts: ProductWithStock[] = [
  {
    id: "1",
    name: "Notebook Dell XPS 13",
    description: "Notebook premium com processador Intel i7, 16GB RAM e 512GB SSD",
    price: 8999.99,
    category: "Notebooks",
    sku: "NB-DELL-XPS13",
    barcode: "789012345678",
    imageUrl: "/placeholder.svg",
    minStock: 5,
    currentStock: 7,
    stockStatus: "in_stock",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "iPhone 14 Pro",
    description: "Smartphone Apple com tela Super Retina XDR de 6,1\"",
    price: 6999.99,
    category: "Smartphones",
    sku: "SP-APPLE-IP14P",
    barcode: "789012345679",
    imageUrl: "/placeholder.svg",
    minStock: 10,
    currentStock: 3,
    stockStatus: "low_stock",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Monitor LG 27\" 4K",
    description: "Monitor UHD 4K com HDR10 e 99% sRGB",
    price: 2799.99,
    category: "Monitores",
    sku: "MN-LG-27UL650",
    barcode: "789012345680",
    imageUrl: "/placeholder.svg",
    minStock: 5,
    currentStock: 0,
    stockStatus: "out_of_stock",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Teclado Mecânico Redragon",
    description: "Teclado mecânico RGB com switches Blue",
    price: 399.99,
    category: "Periféricos",
    sku: "PR-RD-K552",
    barcode: "789012345681",
    imageUrl: "/placeholder.svg",
    minStock: 15,
    currentStock: 20,
    stockStatus: "in_stock",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Mouse Logitech MX Master 3",
    description: "Mouse sem fio premium para produtividade",
    price: 649.99,
    category: "Periféricos",
    sku: "PR-LG-MXMST3",
    barcode: "789012345682",
    imageUrl: "/placeholder.svg",
    minStock: 8,
    currentStock: 4,
    stockStatus: "low_stock",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<ProductWithStock[]>(demoProducts);

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge className="bg-green-500 hover:bg-green-600">Em estoque</Badge>;
      case "low_stock":
        return <Badge variant="outline" className="text-amber-600 border-amber-500">Estoque baixo</Badge>;
      case "out_of_stock":
        return <Badge variant="destructive">Sem estoque</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  // Filtrar produtos com base na pesquisa
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Produtos">
      {/* Header com ações */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-primary/10">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <Badge className="ml-2">{products.length} itens</Badge>
        </div>
        <Link to="/add-product">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
        </Link>
      </div>

      {/* Filtros e pesquisa */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Ordenar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Lista de produtos */}
      <div className="bg-white rounded-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Package className="h-12 w-12 mb-4 opacity-20" />
                      <p className="font-medium">Nenhum produto encontrado</p>
                      <p className="text-sm mt-1">Tente modificar sua busca ou adicionar um novo produto.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[250px]">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-col space-y-1">
                        <span>{product.currentStock} unidades</span>
                        {getStockStatusBadge(product.stockStatus)}
                      </div>
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
                          <DropdownMenuItem>
                            <Link to={`/product/${product.id}`} className="w-full flex">
                              Ver detalhes
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Editar produto</DropdownMenuItem>
                          <DropdownMenuItem>Ajustar estoque</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
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

export default Products;
