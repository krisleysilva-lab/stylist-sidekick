import React, { useState } from 'react';
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
import { 
  Camera, 
  Upload, 
  Brain, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  User,
  Phone,
  Mail
} from 'lucide-react';

interface DiagnosticModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    email: '',
    hairType: '',
    concerns: '',
    previousTreatments: ''
  });

  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);

  const handlePhotoUpload = () => {
    // Simulate AI analysis
    setTimeout(() => {
      setDiagnosisResult({
        hairType: 'Cabelo misto - oleoso na raiz, ressecado nas pontas',
        condition: 'Desidratação severa com danos químicos',
        porosity: 'Alta porosidade',
        recommendations: [
          'Hidratação intensiva com proteínas',
          'Reconstrução capilar em 3 etapas',
          'Coloração com tonalizante sem amônia',
          'Cronograma capilar personalizado'
        ],
        products: [
          'Máscara de Hidratação Intensiva',
          'Ampola de Reconstrução',
          'Leave-in com Proteção UV',
          'Shampoo Low Poo'
        ],
        confidence: 94
      });
      setStep(3);
    }, 2000);
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
                Vamos começar coletando algumas informações básicas
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
                <label className="block text-sm font-medium mb-2">Observações sobre o cabelo</label>
                <Textarea
                  placeholder="Descreva o tipo de cabelo, histórico de químicas, preocupações..."
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
              <h3 className="text-xl font-semibold mb-2">Análise Capilar com IA</h3>
              <p className="text-muted-foreground">
                Envie fotos do cabelo para análise precisa da nossa IA
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center border-dashed border-2 hover:border-primary transition-smooth cursor-pointer">
                <CardContent className="p-0">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium">Tirar Foto</p>
                  <p className="text-xs text-muted-foreground mt-1">Usar câmera</p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center border-dashed border-2 hover:border-primary transition-smooth cursor-pointer">
                <CardContent className="p-0">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium">Upload</p>
                  <p className="text-xs text-muted-foreground mt-1">Galeria</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Dicas para melhor análise:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Boa iluminação natural</li>
                <li>• Cabelo limpo e seco</li>
                <li>• Fotos de frente e perfil</li>
                <li>• Detalhe do couro cabeludo</li>
              </ul>
            </div>

            <Button 
              className="w-full bg-gradient-primary"
              onClick={handlePhotoUpload}
            >
              <Brain className="w-4 h-4 mr-2" />
              Iniciar Análise IA
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diagnóstico Completo</h3>
              <Badge className="bg-green-100 text-green-800">
                {diagnosisResult.confidence}% de precisão
              </Badge>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Análise Capilar</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Tipo:</strong> {diagnosisResult.hairType}</p>
                    <p><strong>Condição:</strong> {diagnosisResult.condition}</p>
                    <p><strong>Porosidade:</strong> {diagnosisResult.porosity}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Recomendações de Tratamento</h4>
                  <ul className="space-y-1 text-sm">
                    {diagnosisResult.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Produtos Recomendados</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {diagnosisResult.products.map((product: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="justify-start p-2">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Compartilhar
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
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Diagnóstico Capilar IA
          </DialogTitle>
          <DialogDescription>
            Análise profissional com inteligência artificial
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