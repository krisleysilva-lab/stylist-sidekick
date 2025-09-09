import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Palette, 
  Scissors, 
  CheckCircle, 
  Target,
  Clock,
  AlertTriangle,
  Download,
  Share
} from 'lucide-react';

interface HairAnalysisResultProps {
  analysis: any;
  clientName?: string;
  onShare?: () => void;
  onDownload?: () => void;
}

export const HairAnalysisResult: React.FC<HairAnalysisResultProps> = ({ 
  analysis, 
  clientName, 
  onShare, 
  onDownload 
}) => {
  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Análise Capilar Profissional</h2>
        {clientName && (
          <p className="text-muted-foreground">Cliente: {clientName}</p>
        )}
        <Badge className="mt-2 bg-green-100 text-green-800">
          Diagnóstico Completo
        </Badge>
      </div>

      {/* Diagnóstico Técnico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Diagnóstico Técnico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-primary">Altura de Tom Atual</p>
              <p>{analysis.diagnostico_tecnico?.altura_tom_atual || 'Não identificado'}</p>
            </div>
            <div>
              <p className="font-medium text-primary">Nuances/Reflexos</p>
              <p>{analysis.diagnostico_tecnico?.nuances_reflexos_atual || 'Não identificado'}</p>
            </div>
            <div>
              <p className="font-medium text-primary">Fundo de Clareamento</p>
              <p>{analysis.diagnostico_tecnico?.fundo_clareamento || 'Não aplicável'}</p>
            </div>
            <div>
              <p className="font-medium text-primary">Estrutura do Fio</p>
              <p>{analysis.diagnostico_tecnico?.estrutura_fio || 'Não identificado'}</p>
            </div>
          </div>
          {analysis.diagnostico_tecnico?.historico_quimico && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="font-medium text-yellow-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Histórico Químico
              </p>
              <p className="text-yellow-700 text-sm mt-1">
                {analysis.diagnostico_tecnico.historico_quimico}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Análise do Objetivo */}
      {analysis.analise_objetivo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Objetivo Técnico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-primary">Tom Desejado</p>
                <p>{analysis.analise_objetivo.altura_tom_desejada || 'A definir'}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Nuances Desejadas</p>
                <p>{analysis.analise_objetivo.nuances_desejadas || 'A definir'}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Técnica Recomendada</p>
                <p>{analysis.analise_objetivo.tecnica_recomendada || 'A definir'}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Marca Recomendada</p>
                <p>{analysis.analise_objetivo.marca_recomendada || 'Não especificada'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fórmula Técnica */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Fórmula Técnica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.formula_tecnica?.pre_tratamento && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-medium text-blue-800">Pré-tratamento</p>
              <p className="text-blue-700 text-sm mt-1">
                {analysis.formula_tecnica.pre_tratamento}
              </p>
            </div>
          )}
          
          {analysis.formula_tecnica?.descoloracao && (
            <div>
              <p className="font-medium text-primary mb-2">Descoloração</p>
              <p className="text-sm bg-gray-50 p-3 rounded-lg font-mono">
                {analysis.formula_tecnica.descoloracao}
              </p>
            </div>
          )}

          {analysis.formula_tecnica?.tonalizacao && (
            <div>
              <p className="font-medium text-primary mb-2">Tonalização</p>
              <p className="text-sm bg-gray-50 p-3 rounded-lg font-mono">
                {analysis.formula_tecnica.tonalizacao}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {analysis.formula_tecnica?.tempo_acao && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium">Tempo de Ação</p>
                  <p>{analysis.formula_tecnica.tempo_acao}</p>
                </div>
              </div>
            )}
            
            {analysis.formula_tecnica?.tecnica_aplicacao && (
              <div>
                <p className="font-medium text-primary">Técnica de Aplicação</p>
                <p>{analysis.formula_tecnica.tecnica_aplicacao}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Visagismo */}
      {analysis.visagismo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-primary" />
              Análise de Visagismo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-primary">Formato do Rosto</p>
                <p>{analysis.visagismo.formato_rosto || 'Não identificado'}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Temperatura da Pele</p>
                <p>{analysis.visagismo.temperatura_pele || 'Não identificada'}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Subtom</p>
                <p>{analysis.visagismo.subtom || 'Não identificado'}</p>
              </div>
            </div>

            {analysis.visagismo.cores_harmonicas && analysis.visagismo.cores_harmonicas.length > 0 && (
              <div>
                <p className="font-medium text-primary mb-3">Cores Harmônicas Recomendadas</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.visagismo.cores_harmonicas.map((cor: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {cor}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {analysis.visagismo.cortes_recomendados && analysis.visagismo.cortes_recomendados.length > 0 && (
              <div>
                <p className="font-medium text-primary mb-3">Cortes Recomendados</p>
                <ul className="space-y-2">
                  {analysis.visagismo.cortes_recomendados.map((corte: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      {corte}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.visagismo.tecnicas_modernas && analysis.visagismo.tecnicas_modernas.length > 0 && (
              <div>
                <p className="font-medium text-primary mb-3">Técnicas Modernas Sugeridas</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.visagismo.tecnicas_modernas.map((tecnica: string, idx: number) => (
                    <Badge key={idx} className="bg-purple-100 text-purple-800">
                      {tecnica}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Observações Profissionais */}
      {analysis.observacoes_profissionais && (
        <Card>
          <CardHeader>
            <CardTitle>Observações Profissionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.observacoes_profissionais.cuidados_especiais && (
              <div>
                <p className="font-medium text-primary">Cuidados Especiais</p>
                <p className="text-sm">{analysis.observacoes_profissionais.cuidados_especiais}</p>
              </div>
            )}
            
            {analysis.observacoes_profissionais.retoque_estimado && (
              <div>
                <p className="font-medium text-primary">Retoque Estimado</p>
                <p className="text-sm">{analysis.observacoes_profissionais.retoque_estimado}</p>
              </div>
            )}

            {analysis.observacoes_profissionais.produtos_manutencao && (
              <div>
                <p className="font-medium text-primary mb-2">Produtos para Manutenção</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.observacoes_profissionais.produtos_manutencao.map((produto: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {produto}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Ações */}
      <div className="flex gap-3 pt-4">
        {onShare && (
          <Button variant="outline" onClick={onShare} className="flex-1">
            <Share className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        )}
        {onDownload && (
          <Button variant="outline" onClick={onDownload} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        )}
        <Button className="flex-1 bg-gradient-primary">
          Agendar Serviço
        </Button>
      </div>
    </div>
  );
};