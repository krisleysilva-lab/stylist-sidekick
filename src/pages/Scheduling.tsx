import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  Phone,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Scheduling: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

  const appointments = [
    {
      id: 1,
      client: 'Ana Silva',
      phone: '(11) 99999-9999',
      service: 'Corte + Escova',
      time: '09:00',
      duration: '1h 30min',
      price: 'R$ 120',
      status: 'confirmado',
      professional: 'Você'
    },
    {
      id: 2,
      client: 'Maria Santos',
      phone: '(11) 88888-8888',
      service: 'Coloração Completa',
      time: '10:30',
      duration: '3h',
      price: 'R$ 350',
      status: 'em-andamento',
      professional: 'Você'
    },
    {
      id: 3,
      client: 'Carla Oliveira',
      phone: '(11) 77777-7777',
      service: 'Hidratação + Corte',
      time: '14:00',
      duration: '2h',
      price: 'R$ 180',
      status: 'pendente',
      professional: 'Você'
    },
    {
      id: 4,
      client: 'Julia Costa',
      phone: '(11) 66666-6666',
      service: 'Manicure + Pedicure',
      time: '16:00',
      duration: '1h',
      price: 'R$ 80',
      status: 'confirmado',
      professional: 'Assistente'
    }
  ];

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800 border-green-200';
      case 'em-andamento': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado': return 'Confirmado';
      case 'em-andamento': return 'Em Andamento';
      case 'pendente': return 'Pendente';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie seus agendamentos e horários
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
          <Button className="bg-gradient-primary hover:scale-105 transition-smooth">
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="font-semibold">
                {selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </h3>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                <div key={index} className="text-center text-xs font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 6;
                const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = date.toDateString() === selectedDate.toDateString();
                
                return (
                  <Button
                    key={i}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 w-8 p-0 text-xs",
                      isToday && "bg-primary text-primary-foreground",
                      isSelected && !isToday && "bg-muted"
                    )}
                    onClick={() => setSelectedDate(date)}
                  >
                    {day > 0 && day <= 31 ? day : ''}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Schedule View */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <CardTitle className="capitalize">
                    {formatDate(selectedDate)}
                  </CardTitle>
                  <CardDescription>
                    {appointments.length} agendamentos hoje
                  </CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar cliente..."
                      className="w-60 pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Time Column */}
                <div className="hidden lg:block lg:col-span-2">
                  <div className="space-y-1">
                    {timeSlots.map((time) => (
                      <div key={time} className="h-20 flex items-start pt-1">
                        <span className="text-sm text-muted-foreground font-medium">
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Appointments Column */}
                <div className="lg:col-span-10">
                  <div className="space-y-3">
                    {appointments.map((appointment, index) => (
                      <Card 
                        key={appointment.id} 
                        className={cn(
                          "transition-smooth hover:shadow-elegant hover:scale-[1.02] cursor-pointer border-l-4",
                          getStatusColor(appointment.status).includes('green') && "border-l-green-500",
                          getStatusColor(appointment.status).includes('blue') && "border-l-blue-500",
                          getStatusColor(appointment.status).includes('yellow') && "border-l-yellow-500",
                          getStatusColor(appointment.status).includes('red') && "border-l-red-500"
                        )}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full text-white font-medium">
                                {appointment.client.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">
                                  {appointment.client}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-1">
                                  {appointment.service}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {appointment.time} - {appointment.duration}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {appointment.professional}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="font-semibold text-foreground">
                                  {appointment.price}
                                </p>
                                <Badge className={cn("text-xs", getStatusColor(appointment.status))}>
                                  {getStatusText(appointment.status)}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                <Button size="sm" variant="outline">
                                  <Phone className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MessageSquare className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {appointments.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhum agendamento hoje
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Que tal agendar o primeiro cliente do dia?
                  </p>
                  <Button className="bg-gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Agendamento
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;