
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import { lazy, Suspense } from "react";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Lazy-loaded pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const Inventory = lazy(() => import("./pages/Inventory"));
const StockMovement = lazy(() => import("./pages/StockMovement"));

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin h-12 w-12 rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-secondary font-medium">Carregando...</p>
    </div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    } />
    
    <Route path="/products" element={
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Products />
        </Suspense>
      </ProtectedRoute>
    } />
    
    <Route path="/products/add" element={
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <AddProduct />
        </Suspense>
      </ProtectedRoute>
    } />
    
    <Route path="/products/:id" element={
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <ProductDetail />
        </Suspense>
      </ProtectedRoute>
    } />
    
    <Route path="/inventory" element={
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Inventory />
        </Suspense>
      </ProtectedRoute>
    } />
    
    <Route path="/inventory/movements" element={
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <StockMovement />
        </Suspense>
      </ProtectedRoute>
    } />
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
