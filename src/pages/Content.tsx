import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, FileText } from 'lucide-react';

const Content: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Área de Conteúdo</h1>
          <p className="text-muted-foreground">Cursos e materiais educativos</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Em breve</CardTitle>
          <CardDescription>Funcionalidade em desenvolvimento</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Área de Conteúdo Educativo</p>
          <p className="text-muted-foreground mb-4">
            Acesse cursos, vídeos e materiais para aperfeiçoar suas técnicas
          </p>
          <Badge variant="secondary">Disponível no Plano PRO</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default Content;