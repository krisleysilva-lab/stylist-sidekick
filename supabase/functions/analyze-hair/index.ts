import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { currentImage, referenceImage, clientInfo = {} } = await req.json();

    if (!currentImage) {
      return new Response(
        JSON.stringify({ error: "Imagem atual é obrigatória" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Iniciando análise capilar profissional...');

    const messages = [
      {
        role: "system",
        content: `Você é um especialista global em coloração capilar e visagismo, consultor técnico de grandes marcas como L'Oréal Professionnel, Wella, Schwarzkopf, Keune, Alfaparf, Redken, Joico, Truss.

RESPONDA SEMPRE EM FORMATO JSON com esta estrutura EXATA:
{
  "diagnostico_tecnico": {
    "altura_tom_atual": "ex: 4 (castanho médio)",
    "nuances_reflexos_atual": "ex: .3 dourado, .7 marrom",
    "fundo_clareamento": "ex: laranja forte",
    "estrutura_fio": "ex: médio, poroso",
    "historico_quimico": "ex: sem química, relaxamento antigo"
  },
  "analise_objetivo": {
    "altura_tom_desejada": "ex: 7 (loiro médio)",
    "nuances_desejadas": "ex: .1 cinza, .11 cinza intenso",
    "tecnica_recomendada": "ex: descoloração global + tonalização",
    "marca_recomendada": "Wella, L'Oréal, etc"
  },
  "formula_tecnica": {
    "pre_tratamento": "ex: Olaplex No.1 + No.2",
    "descoloracao": "ex: Wella Blondor + OX 30vol (1:2)",
    "tonalizacao": "ex: Koleston 7/1 + 0/11 + OX 20vol (1:1.5)",
    "tempo_acao": "ex: 45min descoloração + 25min tonalização",
    "tecnica_aplicacao": "ex: aplicação global, raiz por último"
  },
  "visagismo": {
    "temperatura_pele": "ex: quente, fria, neutra",
    "subtom": "ex: dourado, rosado, oliva",
    "formato_rosto": "ex: oval, redondo, quadrado",
    "cores_harmonicas": [
      "ex: Castanho chocolate 4/7",
      "ex: Loiro mel 7/3", 
      "ex: Ruivo cobre 6/4"
    ],
    "cortes_recomendados": [
      "ex: Long bob com camadas",
      "ex: Corte reto na altura dos ombros",
      "ex: Shag moderno com franja"
    ],
    "tecnicas_modernas": [
      "ex: Balayage frio",
      "ex: Root melting"
    ]
  },
  "observacoes_profissionais": {
    "cuidados_especiais": "ex: usar shampoo matizador",
    "retoque_estimado": "ex: 6-8 semanas",
    "produtos_manutencao": ["ex: Shampoo purple", "ex: Máscara reconstrutora"]
  }
}

Seja EXTREMAMENTE técnico e preciso. Use números reais de colorações disponíveis no mercado brasileiro.`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Análise técnica profissional solicitada:

FOTO ATUAL DA CLIENTE:
Analise a altura de tom, nuances, fundo de clareamento, estrutura do fio, formato de rosto, temperatura de pele.

${referenceImage ? 'FOTO DE REFERÊNCIA DESEJADA:\nAnalise o objetivo técnico a ser alcançado.' : 'Sem referência específica - sugira opções harmônicas.'}

INFORMAÇÕES ADICIONAIS:
${JSON.stringify(clientInfo, null, 2)}

Forneça diagnóstico técnico completo com fórmulas reais de coloração e análise de visagismo.`
          },
          {
            type: "image_url",
            image_url: {
              url: currentImage,
              detail: "high"
            }
          },
          ...(referenceImage ? [{
            type: "image_url",
            image_url: {
              url: referenceImage,
              detail: "high"
            }
          }] : [])
        ]
      }
    ];

    console.log('Enviando requisição para OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 2000,
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro OpenAI:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Resposta OpenAI recebida');

    const analysisContent = data.choices[0].message.content;
    
    // Tentar fazer parse do JSON
    let analysisResult;
    try {
      analysisResult = JSON.parse(analysisContent);
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      // Fallback: extrair JSON do texto se houver texto adicional
      const jsonMatch = analysisContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Resposta da IA não está em formato JSON válido');
      }
    }

    const result = {
      success: true,
      analysis: analysisResult,
      timestamp: new Date().toISOString()
    };

    console.log('Análise concluída com sucesso');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro na análise capilar:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Erro na análise capilar', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});