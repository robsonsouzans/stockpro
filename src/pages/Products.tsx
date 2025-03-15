
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Filter, ArrowUpDown, Package, MoreHorizontal, Eye, Pencil, Trash2, AlertCircle } from "lucide-react";
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
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
  const [selectedProduct, setSelectedProduct] = useState<ProductWithStock | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">Em estoque</Badge>;
      case "low_stock":
        return <Badge variant="outline" className="text-amber-600 border-amber-500 dark:text-amber-400 dark:border-amber-400">Estoque baixo</Badge>;
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

  const handleViewProduct = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handleEditProduct = (id: string) => {
    toast.info(`Editando produto ${id}`);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    setOpenDeleteDialog(false);
    toast.success("Produto excluído com sucesso");
  };

  const confirmDelete = (product: ProductWithStock) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleAdjustStock = (id: string) => {
    toast.info(`Ajustando estoque do produto ${id}`);
  };

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
        <Link to="/products/add">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
        </Link>
      </div>

      {/* Filtros e pesquisa */}
      <Card className="mb-6 dark:bg-card">
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
      <div className={cn("bg-white dark:bg-card rounded-lg overflow-hidden border border-border")}>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estoque
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-card divide-y divide-gray-200 dark:divide-gray-700">
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
                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                      <AlertCircle className="h-12 w-12 mb-4 opacity-20" />
                      <p className="font-medium">Nenhum produto encontrado</p>
                      <p className="text-sm mt-1">Tente modificar sua busca ou adicionar um novo produto.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-cover bg-gray-100 dark:bg-gray-800"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[250px]">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge variant="outline" className="dark:border-gray-600">{product.category}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-col space-y-1">
                        <span>{product.currentStock} unidades</span>
                        {getStockStatusBadge(product.stockStatus)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleViewProduct(product.id)} title="Ver detalhes">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product.id)} title="Editar produto">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleAdjustStock(product.id)} title="Ajustar estoque">
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90" 
                          onClick={() => confirmDelete(product)} title="Excluir produto">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog de confirmação para deleção */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir Produto</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedProduct && (
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium">{selectedProduct.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedProduct.sku}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => selectedProduct && handleDeleteProduct(selectedProduct.id)}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Products;
