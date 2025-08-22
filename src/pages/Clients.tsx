import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Phone,
  Mail,
  Calendar,
  Heart,
  Star,
  Gift,
  Camera,
  MoreVertical,
  MapPin,
  CreditCard
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const clients = [
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      phone: '(11) 99999-9999',
      avatar: null,
      lastVisit: '2024-01-15',
      totalSpent: 2350,
      visits: 15,
      rating: 5,
      loyaltyPoints: 450,
      status: 'vip',
      birthday: '1990-05-15',
      address: 'São Paulo, SP',
      preferences: ['Corte moderno', 'Coloração'],
      notes: 'Cliente fiel, prefere horários da manhã'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(11) 88888-8888',
      avatar: null,
      lastVisit: '2024-01-20',
      totalSpent: 890,
      visits: 6,
      rating: 4.8,
      loyaltyPoints: 120,
      status: 'regular',
      birthday: '1985-08-22',
      address: 'São Paulo, SP',
      preferences: ['Hidratação', 'Escova'],
      notes: 'Cabelo ressecado, recomendada linha nutritiva'
    },
    {
      id: 3,
      name: 'Carla Oliveira',
      email: 'carla.oliveira@email.com',
      phone: '(11) 77777-7777',
      avatar: null,
      lastVisit: '2024-01-10',
      totalSpent: 150,
      visits: 1,
      rating: 5,
      loyaltyPoints: 15,
      status: 'new',
      birthday: '1995-12-03',
      address: 'São Paulo, SP',
      preferences: ['Corte', 'Coloração'],
      notes: 'Primeira visita, gostou muito do atendimento'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'regular': return 'bg-blue-100 text-blue-800';
      case 'new': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'vip': return 'VIP';
      case 'regular': return 'Regular';
      case 'new': return 'Nova';
      default: return status;
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    
    const matchesTab = activeTab === 'all' || client.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const clientStats = {
    total: clients.length,
    vip: clients.filter(c => c.status === 'vip').length,
    regular: clients.filter(c => c.status === 'regular').length,
    new: clients.filter(c => c.status === 'new').length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie sua carteira de clientes e histórico
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
          <Button className="bg-gradient-primary hover:scale-105 transition-smooth">
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{clientStats.total}</div>
            <div className="text-sm text-muted-foreground">Total de Clientes</div>
          </CardContent>
        </Card>
        
        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{clientStats.vip}</div>
            <div className="text-sm text-muted-foreground">Clientes VIP</div>
          </CardContent>
        </Card>
        
        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{clientStats.regular}</div>
            <div className="text-sm text-muted-foreground">Clientes Regulares</div>
          </CardContent>
        </Card>
        
        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6 text-center">
            <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{clientStats.new}</div>
            <div className="text-sm text-muted-foreground">Novos Clientes</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>
                {filteredClients.length} clientes encontrados
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="vip">VIP</TabsTrigger>
              <TabsTrigger value="regular">Regulares</TabsTrigger>
              <TabsTrigger value="new">Novos</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            {filteredClients.map((client) => (
              <Card 
                key={client.id} 
                className="transition-smooth hover:shadow-elegant hover:scale-[1.01] cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {client.avatar ? (
                          <img 
                            src={client.avatar} 
                            alt={client.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                        )}
                        <Button 
                          size="sm" 
                          variant="secondary"
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-0"
                        >
                          <Camera className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-foreground">
                            {client.name}
                          </h3>
                          <Badge className={getStatusColor(client.status)}>
                            {getStatusText(client.status)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(client.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                            <span className="text-sm text-muted-foreground ml-1">
                              {client.rating}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {client.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {client.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {client.address}
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Última visita:</span>
                            <span className="font-medium">
                              {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Total gasto:</span>
                            <span className="font-medium text-green-600">
                              R$ {client.totalSpent.toLocaleString('pt-BR')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Gift className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Pontos:</span>
                            <span className="font-medium text-purple-600">
                              {client.loyaltyPoints}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Phone className="w-4 h-4 mr-2" />
                            Ligar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Enviar Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Ver Histórico
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Editar Perfil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {client.notes && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Observações:</strong> {client.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm 
                    ? 'Tente buscar por outro termo'
                    : 'Que tal cadastrar seu primeiro cliente?'
                  }
                </p>
                {!searchTerm && (
                  <Button className="bg-gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Cliente
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;