import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  Calendar,
  DollarSign,
  Heart,
  Gift,
  Zap,
  Settings,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'reminder' | 'promotion' | 'birthday' | 'payment' | 'review';
  title: string;
  message: string;
  client: string;
  scheduledFor: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  channel: 'whatsapp' | 'sms' | 'email';
  automated: boolean;
}

export const SmartNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'reminder',
      title: 'Lembrete de Agendamento',
      message: 'Olá Ana! Sua sessão de coloração está agendada para amanhã às 14h. Confirme sua presença 😊',
      client: 'Ana Silva',
      scheduledFor: '2024-01-23T09:00',
      status: 'pending',
      channel: 'whatsapp',
      automated: true
    },
    {
      id: '2',
      type: 'birthday',
      title: 'Feliz Aniversário!',
      message: 'Parabéns Maria! 🎉 Que tal comemorar com um desconto especial de 20% em qualquer serviço?',
      client: 'Maria Santos',
      scheduledFor: '2024-01-24T10:00',
      status: 'sent',
      channel: 'whatsapp',
      automated: true
    },
    {
      id: '3',
      type: 'promotion',
      title: 'Promoção Especial',
      message: 'Carla, seu cabelo merece cuidado especial! Ofertas imperdíveis em tratamentos até sexta 💆‍♀️',
      client: 'Carla Oliveira',
      scheduledFor: '2024-01-22T16:00',
      status: 'delivered',
      channel: 'sms',
      automated: false
    }
  ]);

  const [settings, setSettings] = useState({
    autoReminders: true,
    birthdayMessages: true,
    promotionMessages: true,
    paymentReminders: true,
    reviewRequests: true
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Clock className="w-4 h-4" />;
      case 'birthday': return <Gift className="w-4 h-4" />;
      case 'promotion': return <Zap className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      case 'review': return <Heart className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'sms': return <Phone className="w-4 h-4 text-blue-600" />;
      case 'email': return <Mail className="w-4 h-4 text-purple-600" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const stats = {
    total: notifications.length,
    pending: notifications.filter(n => n.status === 'pending').length,
    sent: notifications.filter(n => n.status === 'sent').length,
    delivered: notifications.filter(n => n.status === 'delivered').length
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                Comunicação Inteligente
              </CardTitle>
              <CardDescription>
                Sistema automatizado de notificações e engajamento
              </CardDescription>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configurar
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Bell className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="font-semibold text-lg">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <div className="font-semibold text-lg">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Send className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold text-lg">{stats.sent}</div>
              <div className="text-sm text-muted-foreground">Enviadas</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-lg">{stats.delivered}</div>
              <div className="text-sm text-muted-foreground">Entregues</div>
            </div>
          </div>

          {/* Automation Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Automações Ativas</CardTitle>
              <CardDescription>Configure as mensagens automáticas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-medium">Lembretes de Agendamento</p>
                    <p className="text-sm text-muted-foreground">24h antes do horário marcado</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.autoReminders}
                  onCheckedChange={(checked) => setSettings({...settings, autoReminders: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Gift className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="font-medium">Mensagens de Aniversário</p>
                    <p className="text-sm text-muted-foreground">Parabéns personalizados com desconto</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.birthdayMessages}
                  onCheckedChange={(checked) => setSettings({...settings, birthdayMessages: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="font-medium">Promoções Segmentadas</p>
                    <p className="text-sm text-muted-foreground">Ofertas baseadas no perfil da cliente</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.promotionMessages}
                  onCheckedChange={(checked) => setSettings({...settings, promotionMessages: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="font-medium">Pedidos de Avaliação</p>
                    <p className="text-sm text-muted-foreground">48h após o atendimento</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.reviewRequests}
                  onCheckedChange={(checked) => setSettings({...settings, reviewRequests: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg mb-4">Mensagens Recentes</h3>
            
            {notifications.map((notification) => (
              <Card key={notification.id} className="transition-smooth hover:shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.type === 'reminder' ? 'bg-blue-100' :
                        notification.type === 'birthday' ? 'bg-purple-100' :
                        notification.type === 'promotion' ? 'bg-orange-100' :
                        'bg-gray-100'
                      }`}>
                        {getTypeIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          {notification.automated && (
                            <Badge variant="outline" className="text-xs">
                              Auto
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          Para: {notification.client}
                        </p>
                        
                        <div className="bg-muted/30 p-3 rounded-lg mb-3">
                          <p className="text-sm">{notification.message}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(notification.scheduledFor).toLocaleString('pt-BR')}
                          </div>
                          <div className="flex items-center gap-1">
                            {getChannelIcon(notification.channel)}
                            {notification.channel.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={getStatusColor(notification.status)}>
                        {notification.status === 'pending' && 'Pendente'}
                        {notification.status === 'sent' && 'Enviada'}
                        {notification.status === 'delivered' && 'Entregue'}
                        {notification.status === 'failed' && 'Falhou'}
                      </Badge>
                      
                      {notification.status === 'pending' && (
                        <Button size="sm" className="mt-2 bg-gradient-primary">
                          Enviar Agora
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button className="w-full bg-gradient-primary">
              <MessageSquare className="w-4 h-4 mr-2" />
              Nova Mensagem Personalizada
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};