/* =============================================================
   Comandos do DocFlow ARQ que aparecem na vitrine
   Recorte de apresentação: nem todo comando da ribbon entra aqui.
   `media` é o nome do arquivo em /media, SEM extensão: a página
   procura vídeo primeiro, depois imagem, e cai no espaço
   reservado enquanto nenhum dos dois existir.
   ============================================================= */

const PAINEIS = [
  {
    nome: 'Cotas de Paredes',
    comandos: [
      {
        nome: 'Externas',
        media: 'media/paredes-externas',
        descricao: 'Detecta o perímetro e cota as fachadas pelo lado externo.'
      },
      {
        nome: 'Por Seleção',
        media: 'media/paredes-selecao',
        descricao: 'Cota paredes clique a clique. Clique de novo para alternar o lado.'
      },
      {
        nome: 'Em Lote',
        media: 'media/paredes-lote',
        descricao: 'Cota várias paredes de uma vez e ainda deixa revisar o lado de cada cota.'
      }
    ]
  },
  {
    nome: 'Cotas de Famílias',
    comandos: [
      {
        nome: 'Por Região',
        media: 'media/familias-regiao',
        descricao: 'Seleciona uma região, agrupa as famílias e cria as cotas nos eixos, separando o que está espalhado.'
      },
      {
        nome: 'Por Ambiente',
        media: 'media/familias-ambiente',
        descricao: 'Seleciona os ambientes e cota as famílias contidas em cada um.'
      }
    ]
  },
  {
    nome: 'Ambientes e Contornos',
    comandos: [
      {
        nome: 'Cota Ambientes',
        media: 'media/ambientes',
        descricao: 'Gera as cotas horizontais e verticais de cada ambiente, separadas ambiente por ambiente.'
      },
      {
        nome: 'Cota Pisos',
        media: 'media/pisos',
        descricao: 'Cota o contorno dos pisos selecionados, unindo lados retos e ignorando degraus de ruído.'
      },
      {
        nome: 'Cota Forros',
        media: 'media/forros',
        descricao: 'O mesmo contorno automático, aplicado aos forros da planta.'
      }
    ]
  },
  {
    nome: 'Documentação',
    comandos: [
      {
        nome: 'Criar Vistas',
        media: 'media/vistas',
        descricao: 'Vistas por pavimento, por ambiente, por região, além de cortes e elevações, criadas no padrão do seu escritório.'
      },
      {
        nome: 'Criar Pranchas',
        media: 'media/pranchas',
        descricao: 'Criação e organização das pranchas, com as vistas já posicionadas.'
      },
      {
        nome: 'Inserir Tags',
        media: 'media/tags',
        descricao: 'Tags de ambientes, esquadrias e demais elementos arquitetônicos.'
      }
    ]
  },
  {
    nome: 'Configuração',
    comandos: [
      {
        nome: 'Padrões do escritório',
        media: 'media/configuracoes',
        descricao: 'Tipo de cota, afastamentos, folgas de texto e filtros ficam salvos. Configura uma vez, vale para todos os comandos e todos os projetos.'
      }
    ]
  }
];

/* Fecha a vitrine sem prometer nada específico. Não tem mídia: o card
   é desenhado inteiro pelo CSS. */
const TEASER = {
  painel: 'Em breve',
  nome: 'E muito mais!',
  descricao: 'Revelaremos novas ferramentas em breve.',
  teaser: true
};

/* Lista plana, com o painel embutido — é o que a vitrine consome. */
const COMANDOS = [
  ...PAINEIS.flatMap((painel) =>
    painel.comandos.map((comando) => ({ ...comando, painel: painel.nome }))),
  TEASER
];
