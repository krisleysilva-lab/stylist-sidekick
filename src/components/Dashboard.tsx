import { FeatureCard } from "@/components/FeatureCard";
import { 
  Camera, 
  Beaker, 
  MessageSquare, 
  BookOpen, 
  Instagram, 
  Calendar,
  Image,
  Lightbulb
} from "lucide-react";

export const Dashboard = () => {
  const features = [
    {
      title: "Diagnóstico Inteligente",
      description: "Análise de fotos com IA para identificar tom, fundo de clareamento e histórico químico do cabelo.",
      icon: Camera,
      gradient: "primary" as const
    },
    {
      title: "Fórmulas de Coloração",
      description: "Geração automática de fórmulas técnicas para neutralização e coloração baseada no diagnóstico.",
      icon: Beaker,
      gradient: "secondary" as const
    },
    {
      title: "Comunicação WhatsApp",
      description: "Textos prontos e personalizáveis para explicar procedimentos e cuidados pós-química.",
      icon: MessageSquare,
      gradient: "accent" as const
    },
    {
      title: "Biblioteca de Prompts",
      description: "Coleção de prompts especializados em colorimetria, técnicas e atendimento ao cliente.",
      icon: BookOpen,
      gradient: "primary" as const
    },
    {
      title: "Conteúdo para Instagram",
      description: "Geração automática de posts, stories e reels baseados nos atendimentos realizados.",
      icon: Instagram,
      gradient: "secondary" as const
    },
    {
      title: "Calendário de Marketing",
      description: "Planejamento semanal de conteúdo com sugestões personalizadas e automação de posts.",
      icon: Calendar,
      gradient: "accent" as const
    },
    {
      title: "Galeria Antes/Depois",
      description: "Organize e compare resultados dos atendimentos para portfolio e redes sociais.",
      icon: Image,
      gradient: "primary" as const
    },
    {
      title: "Solucionador de Problemas",
      description: "Decision tree interativo para resolver problemas de coloração e neutralização.",
      icon: Lightbulb,
      gradient: "secondary" as const
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Ferramentas inteligentes que transformam seu conhecimento técnico 
            em resultados extraordinários e comunicação profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};