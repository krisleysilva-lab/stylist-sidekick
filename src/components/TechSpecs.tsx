import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Cpu, 
  Eye, 
  Smartphone, 
  Shield, 
  Zap, 
  Cloud 
} from "lucide-react";

export const TechSpecs = () => {
  const specs = [
    {
      icon: Cpu,
      title: "IA de Linguagem Avançada",
      description: "GPT-4 especializado em colorimetria com treinamento específico para cabeleireiros profissionais.",
      badges: ["OpenAI", "Prompt Engineering", "Fine-tuning"]
    },
    {
      icon: Eye,
      title: "Visão Computacional",
      description: "Análise precisa de imagens capilares para identificar tons, reflexos e condições do cabelo.",
      badges: ["Computer Vision", "Análise de Cor", "ML"]
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Interface otimizada para uso no salão, com funcionalidades offline e sincronização automática.",
      badges: ["PWA", "Offline", "Responsivo"]
    },
    {
      icon: Shield,
      title: "Segurança de Dados",
      description: "Proteção total das informações dos clientes com criptografia e conformidade LGPD.",
      badges: ["LGPD", "Criptografia", "Backup"]
    },
    {
      icon: Zap,
      title: "Performance Otimizada",
      description: "Processamento rápido de imagens e geração instantânea de respostas técnicas.",
      badges: ["WebGL", "Cache", "CDN"]
    },
    {
      icon: Cloud,
      title: "Integração Completa",
      description: "Conecta com WhatsApp, Instagram, Google Agenda e principais ferramentas do salão.",
      badges: ["APIs", "Webhooks", "Automação"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Tecnologia de Ponta
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desenvolvido com as mais avançadas tecnologias de IA e visão computacional 
            para oferecer a máxima precisão em diagnósticos capilares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specs.map((spec, index) => (
            <Card key={index} className="group hover:shadow-card transition-smooth border-border/50">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:shadow-glow transition-smooth">
                  <spec.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  {spec.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {spec.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {spec.badges.map((badge, badgeIndex) => (
                    <Badge 
                      key={badgeIndex}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};