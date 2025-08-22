import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Progress } from '@/components/ui/progress';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { currentPlan, isWithinLimits } = useSubscription();

  const stats = [
    {
      title: 'Faturamento do Mês',
      value: 'R$ 12.450',
      change: '+12%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Agendamentos Hoje',
      value: '8',
      change: '+2',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Clientes Ativas',
      value: '156',
      change: '+15',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Avaliação Média',
      value: '4.9',
      change: '+0.1',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const todayAppointments = [
    { id: 1, client: 'Ana Silva', service: 'Corte + Escova', time: '09:00', status: 'confirmado' },
    { id: 2, client: 'Maria Santos', service: 'Coloração', time: '10:30', status: 'em-andamento' },
    { id: 3, client: 'Carla Oliveira', service: 'Hidratação', time: '14:00', status: 'pendente' },
    { id: 4, client: 'Julia Costa', service: 'Manicure', time: '16:00', status: 'confirmado' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'em-andamento': return 'bg-blue-100 text-blue-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado': return 'Confirmado';
      case 'em-andamento': return 'Em Andamento';
      case 'pendente': return 'Pendente';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('dashboard.welcome')}, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Aqui está um resumo do seu salão hoje
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Hoje
          </Button>
          <Button className="bg-gradient-primary hover:scale-105 transition-smooth">
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-smooth hover:shadow-elegant hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="w-3 h-3 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agendamentos Hoje */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Agendamentos de Hoje</span>
              <Badge variant="secondary">{todayAppointments.length} agendamentos</Badge>
            </CardTitle>
            <CardDescription>
              Gerencie os agendamentos do dia atual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg transition-smooth hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full text-white font-medium">
                    {appointment.client.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{appointment.client}</p>
                    <p className="text-sm text-muted-foreground">{appointment.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {appointment.time}
                    </div>
                    <Badge className={getStatusColor(appointment.status)} variant="secondary">
                      {getStatusText(appointment.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              Ver Todos os Agendamentos
            </Button>
          </CardContent>
        </Card>

        {/* Performance e Limites */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho do Mês</CardTitle>
              <CardDescription>Seus números comparados ao mês anterior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Meta de Faturamento</span>
                  <span>83%</span>
                </div>
                <Progress value={83} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Satisfação do Cliente</span>
                  <span>98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Taxa de Retenção</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {currentPlan && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Plano Atual</span>
                  <Badge variant={currentPlan.id === 'free' ? 'secondary' : 'default'}>
                    {currentPlan.name}
                  </Badge>
                </CardTitle>
                <CardDescription>Uso dos recursos do seu plano</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Clientes</span>
                    <span>
                      {currentPlan.limits.clients === -1 ? 'Ilimitado' : `156/${currentPlan.limits.clients}`}
                    </span>
                  </div>
                  {currentPlan.limits.clients !== -1 && (
                    <Progress value={(156 / currentPlan.limits.clients) * 100} className="h-2" />
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Usuários</span>
                    <span>
                      {currentPlan.limits.users === -1 ? 'Ilimitado' : `1/${currentPlan.limits.users}`}
                    </span>
                  </div>
                  {currentPlan.limits.users !== -1 && (
                    <Progress value={(1 / currentPlan.limits.users) * 100} className="h-2" />
                  )}
                </div>

                {currentPlan.id === 'free' && (
                  <Button className="w-full bg-gradient-primary" size="sm">
                    Fazer Upgrade
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;