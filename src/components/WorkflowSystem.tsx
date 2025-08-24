import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  Phone,
  MessageSquare,
  Palette,
  Scissors,
  Camera,
  Brain,
  Plus,
  ArrowRight
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  icon: any;
  estimatedTime: string;
  actions: Array<{
    label: string;
    action: () => void;
    variant?: 'default' | 'outline' | 'destructive';
  }>;
}

export const WorkflowSystem: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  const workflows: WorkflowStep[] = [
    {
      id: 'diagnosis',
      title: 'Diagnóstico Capilar IA',
      description: 'Análise inteligente do cabelo da cliente',
      status: 'completed',
      icon: Brain,
      estimatedTime: '5 min',
      actions: [
        { label: 'Ver Resultado', action: () => console.log('Ver resultado') },
        { label: 'Novo Diagnóstico', action: () => console.log('Novo diagnóstico'), variant: 'outline' }
      ]
    },
    {
      id: 'consultation',
      title: 'Consulta Personalizada',
      description: 'Conversa sobre expectativas e possibilidades',
      status: 'in-progress',
      icon: MessageSquare,
      estimatedTime: '15 min',
      actions: [
        { label: 'Continuar Consulta', action: () => console.log('Continuar') },
        { label: 'Pausar', action: () => console.log('Pausar'), variant: 'outline' }
      ]
    },
    {
      id: 'formula',
      title: 'Fórmula Inteligente',
      description: 'IA calcula a mistura perfeita de produtos',
      status: 'pending',
      icon: Palette,
      estimatedTime: '3 min',
      actions: [
        { label: 'Gerar Fórmula', action: () => console.log('Gerar fórmula') }
      ]
    },
    {
      id: 'service',
      title: 'Execução do Serviço',
      description: 'Aplicação dos produtos e procedimentos',
      status: 'pending',
      icon: Scissors,
      estimatedTime: '120 min',
      actions: [
        { label: 'Iniciar Serviço', action: () => console.log('Iniciar') }
      ]
    },
    {
      id: 'documentation',
      title: 'Documentação e Fotos',
      description: 'Registro do antes e depois',
      status: 'pending',
      icon: Camera,
      estimatedTime: '10 min',
      actions: [
        { label: 'Adicionar Fotos', action: () => console.log('Fotos') }
      ]
    },
    {
      id: 'payment',
      title: 'Finalização e Pagamento',
      description: 'Cobrança e agendamento de retorno',
      status: 'pending',
      icon: DollarSign,
      estimatedTime: '5 min',
      actions: [
        { label: 'Processar Pagamento', action: () => console.log('Pagamento') }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const completedSteps = workflows.filter(w => w.status === 'completed').length;
  const progress = (completedSteps / workflows.length) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                Fluxo de Atendimento IA
              </CardTitle>
              <CardDescription>
                Sistema inteligente para otimizar cada etapa do atendimento
              </CardDescription>
            </div>
            <Badge className={getStatusColor('in-progress')}>
              {completedSteps}/{workflows.length} Concluídas
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progresso do Atendimento</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {workflows.map((step, index) => (
              <Card 
                key={step.id}
                className={`transition-smooth cursor-pointer ${
                  activeWorkflow === step.id 
                    ? 'ring-2 ring-primary shadow-elegant' 
                    : 'hover:shadow-card'
                }`}
                onClick={() => setActiveWorkflow(activeWorkflow === step.id ? null : step.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          step.status === 'completed' ? 'bg-green-600' :
                          step.status === 'in-progress' ? 'bg-blue-600' : 'bg-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <step.icon className={`w-5 h-5 ${
                          step.status === 'completed' ? 'text-green-600' :
                          step.status === 'in-progress' ? 'text-blue-600' : 'text-muted-foreground'
                        }`} />
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {step.estimatedTime}
                        </div>
                        {getStatusIcon(step.status)}
                      </div>
                    </div>
                  </div>

                  {activeWorkflow === step.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-wrap gap-2">
                        {step.actions.map((action, idx) => (
                          <Button
                            key={idx}
                            size="sm"
                            variant={action.variant || 'default'}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.action();
                            }}
                            className={!action.variant ? 'bg-gradient-primary' : ''}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Sistema inteligente orientado por IA para máxima eficiência
              </div>
              <Button className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Novo Atendimento
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};