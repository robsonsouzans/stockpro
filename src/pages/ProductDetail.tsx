
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <DashboardLayout title="Detalhes do Produto">
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Detalhes do Produto: {id}</h2>
        <p>Esta página de detalhes do produto está em construção.</p>
      </Card>
    </DashboardLayout>
  );
};

export default ProductDetail;
