import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Users, Shield } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Administração</h1>
          <p className="text-muted-foreground">Configurações e gerenciamento da equipe</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Em breve</CardTitle>
          <CardDescription>Funcionalidade em desenvolvimento</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Painel Administrativo</p>
          <p className="text-muted-foreground mb-4">
            Gerencie usuários, permissões e configurações avançadas
          </p>
          <Badge variant="secondary">Disponível no Plano PRO</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;