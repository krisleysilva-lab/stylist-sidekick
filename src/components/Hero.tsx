import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Camera } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import appMockup from "@/assets/app-mockup.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <Badge 
              variant="secondary" 
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by AI
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Revolução na
                <span className="block bg-gradient-to-r from-secondary-gold to-white bg-clip-text text-transparent">
                  Colorimetria
                </span>
                Profissional
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                O primeiro assistente de IA especializado em coloração capilar. 
                Diagnósticos precisos, fórmulas inteligentes e comunicação assertiva 
                com seus clientes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" variant="hero" className="group">
                <Camera className="w-5 h-5 mr-2 group-hover:rotate-12 transition-smooth" />
                Começar Diagnóstico
              </Button>
              <Button size="lg" variant="outline-hero">
                <Brain className="w-5 h-5 mr-2" />
                Ver Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 text-white/80 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm">+500 cabeleireiros</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm">98% precisão</span>
              </div>
            </div>
          </div>

          {/* App Mockup */}
          <div className="relative">
            <div className="relative">
              <img 
                src={appMockup}
                alt="Beauty AI App Interface" 
                className="w-full max-w-md mx-auto rounded-3xl shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-card rounded-3xl" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl p-3 shadow-card animate-pulse">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary rounded-xl p-3 shadow-card animate-pulse [animation-delay:1s]">
              <Sparkles className="w-6 h-6 text-secondary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};