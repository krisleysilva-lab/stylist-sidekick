import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  CreditCard,
  Banknote,
  PieChart,
  FileText,
  Plus,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from 'lucide-react';

const Financial: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const financialStats = {
    revenue: 12450,
    expenses: 3200,
    profit: 9250,
    growth: 12.5
  };

  const monthlyData = [
    { month: 'Jan', revenue: 8500, expenses: 2800 },
    { month: 'Fev', revenue: 9200, expenses: 3100 },
    { month: 'Mar', revenue: 11800, expenses: 3500 },
    { month: 'Abr', revenue: 12450, expenses: 3200 },
  ];

  const transactions = [
    {
      id: 1,
      type: 'income',
      description: 'Serviço - Ana Silva',
      amount: 120,
      date: '2024-01-22',
      method: 'Cartão de Crédito',
      status: 'completed'
    },
    {
      id: 2,
      type: 'income',
      description: 'Produto - Shampoo Premium',
      amount: 85,
      date: '2024-01-22',
      method: 'PIX',
      status: 'completed'
    },
    {
      id: 3,
      type: 'expense',
      description: 'Compra de Produtos',
      amount: 350,
      date: '2024-01-21',
      method: 'Cartão de Débito',
      status: 'completed'
    },
    {
      id: 4,
      type: 'income',
      description: 'Serviço - Maria Santos',
      amount: 180,
      date: '2024-01-21',
      method: 'Dinheiro',
      status: 'completed'
    },
    {
      id: 5,
      type: 'expense',
      description: 'Aluguel do Salão',
      amount: 1200,
      date: '2024-01-20',
      method: 'Transferência',
      status: 'completed'
    }
  ];

  const paymentMethods = [
    { method: 'PIX', amount: 4250, percentage: 34, color: 'text-green-600' },
    { method: 'Cartão de Crédito', amount: 3890, percentage: 31, color: 'text-blue-600' },
    { method: 'Cartão de Débito', amount: 2650, percentage: 21, color: 'text-purple-600' },
    { method: 'Dinheiro', amount: 1660, percentage: 14, color: 'text-orange-600' }
  ];

  const getTransactionIcon = (type: string) => {
    return type === 'income' ? (
      <ArrowUpRight className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDownRight className="w-4 h-4 text-red-600" />
    );
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Financeiro</h1>
          <p className="text-muted-foreground">
            Controle completo das suas finanças
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Relatório
          </Button>
          <Button className="bg-gradient-primary hover:scale-105 transition-smooth">
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Faturamento
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(financialStats.revenue)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{financialStats.growth}%
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Despesas
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(financialStats.expenses)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="w-3 h-3 text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    -5%
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-red-100">
                <CreditCard className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Lucro Líquido
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(financialStats.profit)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +18%
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Margem de Lucro
                </p>
                <p className="text-2xl font-bold text-foreground">
                  74.3%
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">
                    +2.1%
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
            <CardDescription>
              Histórico das últimas movimentações financeiras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-4">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="income">Receitas</TabsTrigger>
                <TabsTrigger value="expense">Despesas</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg transition-smooth hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        <span>•</span>
                        <span>{transaction.method}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Concluído
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              Ver Todas as Transações
            </Button>
          </CardContent>
        </Card>

        {/* Payment Methods & Goals */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>
                Distribuição das formas de recebimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{method.method}</span>
                    <span className="text-muted-foreground">
                      {method.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={method.percentage} className="flex-1 h-2" />
                    <span className={`text-sm font-medium ${method.color}`}>
                      {formatCurrency(method.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meta Mensal</CardTitle>
              <CardDescription>
                Progresso da meta de faturamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  83%
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatCurrency(12450)} de {formatCurrency(15000)}
                </div>
              </div>
              
              <Progress value={83} className="h-3" />
              
              <div className="text-center text-sm text-muted-foreground">
                Faltam {formatCurrency(2550)} para atingir a meta
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span>Dias restantes no mês:</span>
                  <span className="font-medium">9 dias</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Média diária necessária:</span>
                  <span className="font-medium text-primary">
                    {formatCurrency(283)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Financial;