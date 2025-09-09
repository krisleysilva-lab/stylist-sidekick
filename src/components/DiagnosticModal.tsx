import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  Camera, 
  Upload, 
  Brain, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  User,
  Phone,
  Mail,
  ImageIcon,
  Loader2,
  Target,
  Palette,
  Scissors,
  X
} from 'lucide-react';

interface DiagnosticModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const currentImageRef = useRef<HTMLInputElement>(null);
  const referenceImageRef = useRef<HTMLInputElement>(null);
  
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    email: '',
    hairType: '',
    concerns: '',
    previousTreatments: '',
    preferredBrand: ''
  });

  const [images, setImages] = useState({
    current: null as string | null,
    reference: null as string | null
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (type: 'current' | 'reference', file?: File) => {
    try {
      let selectedFile = file;
      
      if (!selectedFile) {
        const input = type === 'current' ? currentImageRef.current : referenceImageRef.current;
        if (!input || !input.files || !input.files[0]) return;
        selectedFile = input.files[0];
      }

      const base64 = await convertImageToBase64(selectedFile);
      setImages(prev => ({ ...prev, [type]: base64 }));
      
      toast({
        title: "Imagem carregada",
        description: `Foto ${type === 'current' ? 'atual' : 'de referência'} adicionada com sucesso`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar imagem",
        variant: "destructive"
      });
    }
  };

  const handleProfessionalAnalysis = async () => {
    if (!images.current) {
      toast({
        title: "Erro",
        description: "Foto atual é obrigatória para análise",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-hair', {
        body: {
          currentImage: images.current,
          referenceImage: images.reference,
          clientInfo: clientData
        }
      });

      if (error) throw error;

      if (data.success) {
        setAnalysisResult(data.analysis);
        setStep(3);
        toast({
          title: "Análise concluída",
          description: "Diagnóstico profissional gerado com sucesso",
        });
      } else {
        throw new Error(data.error || 'Erro na análise');
      }
    } catch (error) {
      console.error('Erro na análise:', error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível completar a análise. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dados da Cliente</h3>
              <p className="text-muted-foreground">
                Informações para análise personalizada
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome da Cliente</label>
                <Input
                  placeholder="Digite o nome completo"
                  value={clientData.name}
                  onChange={(e) => setClientData({...clientData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <Input
                    placeholder="(11) 99999-9999"
                    value={clientData.phone}
                    onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-mail</label>
                  <Input
                    type="email"
                    placeholder="email@exemplo.com"
                    value={clientData.email}
                    onChange={(e) => setClientData({...clientData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Marca de preferência</label>
                <Input
                  placeholder="Ex: Wella, L'Oréal, Schwarzkopf..."
                  value={clientData.preferredBrand}
                  onChange={(e) => setClientData({...clientData, preferredBrand: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Histórico e observações</label>
                <Textarea
                  placeholder="Histórico de químicas, tipo de cabelo, desejos, preocupações..."
                  value={clientData.concerns}
                  onChange={(e) => setClientData({...clientData, concerns: e.target.value})}
                  className="min-h-20"
                />
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-primary"
              onClick={() => setStep(2)}
              disabled={!clientData.name || !clientData.phone}
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Análise Profissional com IA</h3>
              <p className="text-muted-foreground">
                Upload das fotos para diagnóstico técnico completo
              </p>
            </div>

            <div className="space-y-4">
              {/* Foto Atual - Obrigatória */}
              <div>
                <label className="block text-sm font-medium mb-2 text-red-600">
                  📸 Foto Atual da Cliente (Obrigatória)
                </label>
                <Card className={`p-4 border-2 border-dashed transition-smooth cursor-pointer ${
                  images.current ? 'border-green-500 bg-green-50' : 'border-primary hover:border-primary/70'
                }`}>
                  <CardContent className="p-0" onClick={() => currentImageRef.current?.click()}>
                    {images.current ? (
                      <div className="relative">
                        <img 
                          src={images.current} 
                          alt="Foto atual" 
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImages(prev => ({ ...prev, current: null }));
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium">Adicionar Foto Atual</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Cabelo, rosto e tom de pele visíveis
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <input
                  ref={currentImageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload('current', e.target.files?.[0])}
                />
              </div>

              {/* Foto Referência - Opcional */}
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  🎯 Foto de Referência (Opcional)
                </label>
                <Card className={`p-4 border-2 border-dashed transition-smooth cursor-pointer ${
                  images.reference ? 'border-blue-500 bg-blue-50' : 'border-muted hover:border-muted-foreground'
                }`}>
                  <CardContent className="p-0" onClick={() => referenceImageRef.current?.click()}>
                    {images.reference ? (
                      <div className="relative">
                        <img 
                          src={images.reference} 
                          alt="Foto referência" 
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImages(prev => ({ ...prev, reference: null }));
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Target className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium">Adicionar Referência</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Resultado desejado (opcional)
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <input
                  ref={referenceImageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload('reference', e.target.files?.[0])}
                />
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Dicas para análise perfeita:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Boa iluminação natural</li>
                <li>• Cabelo limpo e seco</li>
                <li>• Rosto e cabelo visíveis</li>
                <li>• Tom de pele bem iluminado</li>
              </ul>
            </div>

            <Button 
              className="w-full bg-gradient-primary"
              onClick={handleProfessionalAnalysis}
              disabled={!images.current || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Iniciar Análise Profissional
                </>
              )}
            </Button>
          </div>
        );

      case 3:
        if (!analysisResult) return null;
        
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diagnóstico Profissional</h3>
              <Badge className="bg-green-100 text-green-800">
                Análise Completa
              </Badge>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Diagnóstico Técnico */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    Diagnóstico Técnico
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Altura de Tom:</strong> {analysisResult.diagnostico_tecnico?.altura_tom_atual}</p>
                    <p><strong>Nuances/Reflexos:</strong> {analysisResult.diagnostico_tecnico?.nuances_reflexos_atual}</p>
                    <p><strong>Fundo de Clareamento:</strong> {analysisResult.diagnostico_tecnico?.fundo_clareamento}</p>
                    <p><strong>Estrutura:</strong> {analysisResult.diagnostico_tecnico?.estrutura_fio}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Fórmula Técnica */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-primary" />
                    Fórmula Técnica
                  </h4>
                  <div className="space-y-2 text-sm">
                    {analysisResult.formula_tecnica?.descoloracao && (
                      <p><strong>Descoloração:</strong> {analysisResult.formula_tecnica.descoloracao}</p>
                    )}
                    {analysisResult.formula_tecnica?.tonalizacao && (
                      <p><strong>Tonalização:</strong> {analysisResult.formula_tecnica.tonalizacao}</p>
                    )}
                    {analysisResult.formula_tecnica?.tempo_acao && (
                      <p><strong>Tempo:</strong> {analysisResult.formula_tecnica.tempo_acao}</p>
                    )}
                    {analysisResult.formula_tecnica?.tecnica_aplicacao && (
                      <p><strong>Técnica:</strong> {analysisResult.formula_tecnica.tecnica_aplicacao}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Visagismo */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-primary" />
                    Análise de Visagismo
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p><strong>Formato do Rosto:</strong> {analysisResult.visagismo?.formato_rosto}</p>
                      <p><strong>Tom de Pele:</strong> {analysisResult.visagismo?.temperatura_pele}</p>
                    </div>
                    
                    {analysisResult.visagismo?.cores_harmonicas && (
                      <div>
                        <p className="font-medium mb-2">Cores Harmônicas:</p>
                        <div className="space-y-1">
                          {analysisResult.visagismo.cores_harmonicas.map((cor: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="mr-2 mb-1">
                              {cor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {analysisResult.visagismo?.cortes_recomendados && (
                      <div>
                        <p className="font-medium mb-2">Cortes Recomendados:</p>
                        <ul className="space-y-1">
                          {analysisResult.visagismo.cortes_recomendados.map((corte: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-1" />
                              {corte}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Observações */}
              {analysisResult.observacoes_profissionais && (
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Observações Profissionais</h4>
                    <div className="space-y-2 text-sm">
                      {analysisResult.observacoes_profissionais.cuidados_especiais && (
                        <p><strong>Cuidados:</strong> {analysisResult.observacoes_profissionais.cuidados_especiais}</p>
                      )}
                      {analysisResult.observacoes_profissionais.retoque_estimado && (
                        <p><strong>Retoque:</strong> {analysisResult.observacoes_profissionais.retoque_estimado}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => {
                setStep(1);
                setAnalysisResult(null);
                setImages({ current: null, reference: null });
              }}>
                Nova Análise
              </Button>
              <Button className="flex-1 bg-gradient-primary">
                Agendar Serviço
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Diagnóstico Capilar Profissional
          </DialogTitle>
          <DialogDescription>
            Análise técnica completa com visagismo por IA
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-smooth ${
                  step >= stepNum 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-8 h-1 mx-2 transition-smooth ${
                    step > stepNum ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};