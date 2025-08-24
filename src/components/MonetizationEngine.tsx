import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Crown,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Gift,
  Lock,
  Unlock,
  Star,
  Award,
  Rocket,
  Diamond
} from 'lucide-react';

interface UpgradePrompt {
  id: string;
  feature: string;
  title: string;
  description: string;
  cta: string;
  urgency: 'low' | 'medium' | 'high';
  social_proof: string;
  benefit: string;
}

export const MonetizationEngine: React.FC = () => {
  const [showUpgrade, setShowUpgrade] = useState(false);

  const upgradePrompts: UpgradePrompt[] = [
    {
      id: 'ai-analysis',
      feature: 'Diagnóstico IA Avançado',
      title: 'Desbloqueie o Poder da IA',
      description: 'Análises capilares 98% mais precisas com nossa IA especializada em colorimetria',
      cta: 'Upgrade para PRO',
      urgency: 'high',
      social_proof: '+2.500 cabeleireiros já usam',
      benefit: 'Aumente sua precisão em 98%'
    },
    {
      id: 'smart-formulas',
      feature: 'Fórmulas Inteligentes',
      title: 'Nunca Mais Erre uma Fórmula',
      description: 'Sistema que calcula automaticamente as proporções perfeitas para cada cabelo',
      cta: 'Experimentar Grátis',
      urgency: 'medium',
      social_proof: '95% dos profissionais aprovam',
      benefit: 'Economize 2h por cliente'
    },
    {
      id: 'client-communication',
      feature: 'Comunicação Automatizada',
      title: 'Clientes Mais Engajadas',
      description: 'WhatsApp automático, lembretes inteligentes e campanhas personalizadas',
      cta: 'Ativar Automação',
      urgency: 'low',
      social_proof: '40% mais retenção de clientes',
      benefit: 'Aumente sua receita em 30%'
    }
  ];

  const conversionTriggers = {
    usage_limit: 85, // Percentual de uso do plano gratuito
    feature_requests: 12, // Tentativas de usar recursos premium
    success_metric: 'R$ 2.350', // Valor que clientes PRO faturam a mais
    time_saved: '8 horas', // Tempo economizado por semana
    client_retention: '+40%' // Aumento na retenção
  };

  const socialProof = [
    { metric: '2.500+', label: 'Profissionais ativos', icon: Users },
    { metric: '98%', label: 'Precisão da IA', icon: Target },
    { metric: 'R$ 3.200', label: 'Faturamento médio extra', icon: DollarSign },
    { metric: '4.9⭐', label: 'Avaliação dos usuários', icon: Star }
  ];

  const planComparison = [
    {
      feature: 'Diagnóstico IA Básico',
      free: true,
      pro: true,
      premium: true
    },
    {
      feature: 'Fórmulas Inteligentes',
      free: false,
      pro: true,
      premium: true
    },
    {
      feature: 'Automação WhatsApp',
      free: false,
      pro: true,
      premium: true
    },
    {
      feature: 'Relatórios Avançados',
      free: false,
      pro: false,
      premium: true
    },
    {
      feature: 'Suporte Prioritário',
      free: false,
      pro: false,
      premium: true
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-300 bg-red-50';
      case 'medium': return 'border-orange-300 bg-orange-50';
      case 'low': return 'border-blue-300 bg-blue-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Usage Progress with Upgrade Prompt */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Você está quase no limite!</h3>
                <p className="text-sm text-muted-foreground">
                  {conversionTriggers.usage_limit}% do seu plano gratuito usado
                </p>
              </div>
            </div>
            <Badge className="bg-orange-100 text-orange-800">
              15 diagnósticos restantes
            </Badge>
          </div>
          
          <Progress value={conversionTriggers.usage_limit} className="h-3 mb-4" />
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Profissionais PRO faturam em média <strong>{conversionTriggers.success_metric}</strong> a mais por mês
            </p>
            <Button className="bg-gradient-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Upgrade Agora
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature Unlock Prompts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {upgradePrompts.map((prompt) => (
          <Card 
            key={prompt.id} 
            className={`transition-smooth hover:shadow-elegant border-2 ${getUrgencyColor(prompt.urgency)}`}
          >
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{prompt.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {prompt.description}
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span>{prompt.benefit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>{prompt.social_proof}</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary">
                <Unlock className="w-4 h-4 mr-2" />
                {prompt.cta}
              </Button>

              {prompt.urgency === 'high' && (
                <p className="text-xs text-center text-red-600 mt-2 font-medium">
                  🔥 Oferta por tempo limitado!
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Social Proof Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Por que profissionais escolhem o Cabelleira.IA PRO?
          </CardTitle>
          <CardDescription className="text-center">
            Resultados reais de quem já fez o upgrade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {socialProof.map((proof, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <proof.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {proof.metric}
                </div>
                <div className="text-sm text-muted-foreground">
                  {proof.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Compare os Planos</CardTitle>
          <CardDescription className="text-center">
            Veja o que você desbloqueia com cada plano
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Funcionalidades</th>
                  <th className="text-center p-4">
                    <div className="flex flex-col items-center">
                      <Gift className="w-6 h-6 text-muted-foreground mb-1" />
                      <span>Gratuito</span>
                    </div>
                  </th>
                  <th className="text-center p-4">
                    <div className="flex flex-col items-center">
                      <Crown className="w-6 h-6 text-primary mb-1" />
                      <span>PRO</span>
                      <Badge className="mt-1 bg-green-100 text-green-800 text-xs">
                        Mais Popular
                      </Badge>
                    </div>
                  </th>
                  <th className="text-center p-4">
                    <div className="flex flex-col items-center">
                      <Diamond className="w-6 h-6 text-purple-600 mb-1" />
                      <span>Premium</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {planComparison.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 font-medium">{item.feature}</td>
                    <td className="text-center p-4">
                      {item.free ? (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-gray-400 text-sm">✗</span>
                        </div>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {item.pro ? (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-gray-400 text-sm">✗</span>
                        </div>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {item.premium ? (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-gray-400 text-sm">✗</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex-1 lg:flex-none">
              Continuar Gratuito
            </Button>
            <Button className="flex-1 lg:flex-none bg-gradient-primary text-lg py-6">
              <Rocket className="w-5 h-5 mr-2" />
              Começar Teste Gratuito PRO
              <Badge className="ml-2 bg-white/20 text-white">
                7 dias grátis
              </Badge>
            </Button>
            <Button variant="outline" className="flex-1 lg:flex-none border-purple-300 text-purple-600 hover:bg-purple-50">
              Ver Premium
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="text-center">
            <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Transforme Seu Negócio Hoje</h3>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              "Depois do Cabelleira.IA PRO, minha agenda ficou 100% lotada e meu faturamento dobrou. 
              A IA me ajuda a entregar resultados perfeitos sempre!" - Marina, São Paulo
            </p>
            <Button size="lg" className="bg-gradient-primary">
              <Sparkles className="w-5 h-5 mr-2" />
              Quero Esses Resultados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};