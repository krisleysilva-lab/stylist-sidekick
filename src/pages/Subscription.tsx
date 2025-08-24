import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { MonetizationEngine } from '@/components/MonetizationEngine';

const Subscription: React.FC = () => {
  const { currentPlan, plans, subscribeTo } = useSubscription();

  const handleUpgrade = async (planId: string) => {
    try {
      await subscribeTo(planId);
    } catch (error) {
      console.error('Erro ao fazer upgrade:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Planos e Assinatura</h1>
        <p className="text-muted-foreground">
          Escolha o plano ideal para o seu negócio de beleza
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`transition-smooth hover:shadow-elegant hover:scale-105 ${
              currentPlan?.id === plan.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center">
                {plan.id === 'free' && <Sparkles className="w-6 h-6 text-white" />}
                {plan.id === 'professional' && <Crown className="w-6 h-6 text-white" />}
                {plan.id === 'salon' && <Crown className="w-6 h-6 text-white" />}
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-primary">
                {plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}
                {plan.price > 0 && <span className="text-sm text-muted-foreground">/mês</span>}
              </div>
              {currentPlan?.id === plan.id && (
                <Badge className="bg-green-100 text-green-800">Plano Atual</Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>Usuários: {plan.limits.users === -1 ? 'Ilimitado' : plan.limits.users}</div>
                  <div>Clientes: {plan.limits.clients === -1 ? 'Ilimitado' : plan.limits.clients}</div>
                  <div>Armazenamento: {plan.limits.storage}</div>
                </div>
              </div>

              <Button 
                className="w-full"
                variant={currentPlan?.id === plan.id ? "outline" : "default"}
                onClick={() => currentPlan?.id !== plan.id && handleUpgrade(plan.id)}
                disabled={currentPlan?.id === plan.id}
              >
                {currentPlan?.id === plan.id ? 'Plano Atual' : 'Escolher Plano'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monetization Engine */}
      <MonetizationEngine />
    </div>
  );
};

export default Subscription;