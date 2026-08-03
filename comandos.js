/* =============================================================
   Comandos do DocFlow ARQ
   Fonte única da vitrine e dos três modos de visualização.
   `media` é o nome do arquivo em /media, SEM extensão: a página
   procura vídeo primeiro, depois imagem, e cai no espaço
   reservado enquanto nenhum dos dois existir.
   ============================================================= */

const PAINEIS = [
  {
    nome: 'Cotas de Paredes',
    resumo: 'O perímetro, as internas e tudo que uma linha atravessar.',
    comandos: [
      {
        nome: 'Externas',
        media: 'media/paredes-externas',
        descricao: 'Detecta o perímetro e cota as fachadas pelo lado externo.',
        exemplo: 'Uma planta inteira de fachada, num clique só.'
      },
      {
        nome: 'Internas',
        media: 'media/paredes-internas',
        descricao: 'Destaca as paredes internas e cota as paredes cruzadas pela linha indicada.',
        exemplo: 'Corredor e quartos cotados na mesma passada.'
      },
      {
        nome: 'Por Seleção',
        media: 'media/paredes-selecao',
        descricao: 'Cota paredes clique a clique. Clique de novo para alternar o lado.',
        exemplo: 'Para a parede que precisa da cota do outro lado.'
      },
      {
        nome: 'Em Lote',
        media: 'media/paredes-lote',
        descricao: 'Cota várias paredes de uma vez e ainda deixa revisar o lado de cada cota.',
        exemplo: 'Seleciona vinte paredes, revisa, confirma.'
      },
      {
        nome: 'Por Linha',
        media: 'media/paredes-linha',
        descricao: 'Cota todas as paredes atravessadas por uma linha que você desenha.',
        exemplo: 'A cadeia de cota nasce exatamente onde você traçou.'
      }
    ]
  },
  {
    nome: 'Cotas de Famílias',
    resumo: 'Portas, janelas, louças e mobiliário posicionados de verdade.',
    comandos: [
      {
        nome: 'Por Região',
        media: 'media/familias-regiao',
        descricao: 'Seleciona uma região, agrupa as famílias e cria as cotas nos eixos, separando o que está espalhado.',
        exemplo: 'Grelha de luminárias cotada nas duas direções.'
      },
      {
        nome: 'Por Ambiente',
        media: 'media/familias-ambiente',
        descricao: 'Seleciona os ambientes e cota as famílias contidas em cada um.',
        exemplo: 'Louças do banheiro, medidas a partir das paredes.'
      },
      {
        nome: 'Por Linha',
        media: 'media/familias-linha',
        descricao: 'Cota as famílias usando a direção e a posição da linha que você indicou.',
        exemplo: 'Você manda onde a cota fica. Ela fica.'
      }
    ]
  },
  {
    nome: 'Ambientes e Contornos',
    resumo: 'A medida limpa de cada ambiente, piso e forro.',
    comandos: [
      {
        nome: 'Cota Ambientes',
        media: 'media/ambientes',
        descricao: 'Gera as cotas horizontais e verticais de cada ambiente, separadas ambiente por ambiente.',
        exemplo: 'Cada cômodo com a sua medida, sem cruzar linha.'
      },
      {
        nome: 'Cota Pisos',
        media: 'media/pisos',
        descricao: 'Cota o contorno dos pisos selecionados, unindo lados retos e ignorando degraus de ruído.',
        exemplo: 'Desencontro de 1 cm entre paredes não vira cota picotada.'
      },
      {
        nome: 'Cota Forros',
        media: 'media/forros',
        descricao: 'O mesmo contorno automático, aplicado aos forros da planta.',
        exemplo: 'Planta de forro documentada junto com a de piso.'
      }
    ]
  },
  {
    nome: 'Documentação',
    resumo: 'O caminho do modelo até a prancha entregue.',
    comandos: [
      {
        nome: 'Criar Vistas',
        media: 'media/vistas',
        descricao: 'Vistas por pavimento, por ambiente, por região, além de cortes e elevações, criadas no padrão do seu escritório.',
        exemplo: 'As vistas do projeto inteiro, nomeadas do seu jeito.'
      },
      {
        nome: 'Criar Pranchas',
        media: 'media/pranchas',
        descricao: 'Criação e organização das pranchas, com as vistas já posicionadas.',
        exemplo: 'Carimbo, numeração e vistas no lugar.'
      },
      {
        nome: 'Inserir Tags',
        media: 'media/tags',
        descricao: 'Tags de ambientes, esquadrias e demais elementos arquitetônicos.',
        exemplo: 'Identificação completa sem clicar elemento por elemento.'
      }
    ]
  },
  {
    nome: 'Configuração',
    resumo: 'O padrão do escritório gravado uma vez só.',
    comandos: [
      {
        nome: 'Padrões do escritório',
        media: 'media/configuracoes',
        descricao: 'Tipo de cota, afastamentos, folgas de texto e filtros ficam salvos. Configura uma vez, vale para todos os comandos e todos os projetos.',
        exemplo: 'O próximo projeto já começa cotando certo.'
      }
    ]
  }
];

/* Lista plana, com o painel embutido — usada pela vitrine. */
const COMANDOS = PAINEIS.flatMap((painel) =>
  painel.comandos.map((comando) => ({ ...comando, painel: painel.nome }))
);
