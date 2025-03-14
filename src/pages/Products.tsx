
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

const Products = () => {
  const [isLoading] = useState(false);

  return (
    <DashboardLayout title="Produtos">
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Lista de Produtos</h2>
        <p>Esta página de produtos está em construção.</p>
        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default Products;
