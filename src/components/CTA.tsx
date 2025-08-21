import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, Play } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Transforme seu atendimento hoje mesmo
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Junte-se a centenas de cabeleireiros que já descobriram o poder da IA 
                para diagnósticos precisos e comunicação profissional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero" className="group">
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Baixar Grátis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button size="lg" variant="outline-hero">
                <Play className="w-5 h-5 mr-2" />
                Assistir Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">7 dias</div>
                <div className="text-white/80">Teste grátis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/80">Suporte técnico</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">∞</div>
                <div className="text-white/80">Diagnósticos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};