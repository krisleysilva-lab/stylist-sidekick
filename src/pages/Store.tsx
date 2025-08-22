import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store as StoreIcon, Plus, ShoppingCart, Package } from 'lucide-react';

const Store: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Loja Online</h1>
          <p className="text-muted-foreground">Gerencie seus produtos e vendas</p>
        </div>
        <Button className="bg-gradient-primary hover:scale-105 transition-smooth">
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6 text-center">
            <Package className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">45</div>
            <div className="text-sm text-muted-foreground">Produtos</div>
          </CardContent>
        </Card>
        
        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6 text-center">
            <ShoppingCart className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">128</div>
            <div className="text-sm text-muted-foreground">Vendas</div>
          </CardContent>
        </Card>
        
        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6 text-center">
            <StoreIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">R$ 5.690</div>
            <div className="text-sm text-muted-foreground">Faturamento</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Em breve</CardTitle>
          <CardDescription>Funcionalidade em desenvolvimento</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <StoreIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Loja Online em Desenvolvimento</p>
          <p className="text-muted-foreground mb-4">
            Em breve você poderá vender seus produtos online diretamente pelo Cabelleira
          </p>
          <Badge variant="secondary">Disponível no Plano PRO</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default Store;