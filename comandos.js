/* =============================================================
   Comandos disponíveis no DocFlow ARQ que aparecem na vitrine.
   O campo media aponta para o nome-base em /media. Quando o vídeo
   ainda não existe, a vitrine usa o ícone oficial e informa que a
   demonstração será adicionada depois.
   ============================================================= */

const PAINEIS = [
  {
    nome: 'Cotas de Paredes',
    comandos: [
      { nome: 'Externas', media: 'media/paredes-externas', icon: 'media/tool-icons/icon-ParedesExternas.dark.png', descricao: 'Detecta o perímetro e cota as fachadas pelo lado externo.' },
      { nome: 'Internas', media: 'media/paredes-internas', icon: 'media/tool-icons/icon-ParedesInternas.dark.png', descricao: 'Destaca as paredes internas e cota as paredes cruzadas pela linha indicada.' },
      { nome: 'Por Seleção', media: 'media/paredes-selecao', icon: 'media/tool-icons/icon-ParedesSelecao.dark.png', descricao: 'Cota paredes clique a clique e permite alternar o lado.' },
      { nome: 'Em Lote', media: 'media/paredes-lote', icon: 'media/tool-icons/icon-ParedesLote.dark.png', descricao: 'Cota várias paredes de uma vez e permite revisar o lado das cotas.' }
    ]
  },
  {
    nome: 'Cotas de Famílias',
    comandos: [
      { nome: 'Por Região', media: 'media/familias-regiao', icon: 'media/tool-icons/icon-FamiliasRegiao.dark.png', descricao: 'Seleciona uma região, agrupa as famílias e cria cotas nos eixos com espalhamento.' },
      { nome: 'Por Ambiente', media: 'media/familias-ambiente', icon: 'media/tool-icons/icon-FamiliasAmbiente.dark.png', descricao: 'Seleciona ambientes e cota as famílias contidas neles.' }
    ]
  },
  {
    nome: 'Cotas de Ambientes',
    comandos: [
      { nome: 'Por Ambiente', media: 'media/ambientes', icon: 'media/tool-icons/icon-CotaAmbientes.dark.png', descricao: 'Gera cotas horizontais e verticais separadas para cada ambiente.' }
    ]
  },
  {
    nome: 'Cotas de Contorno',
    comandos: [
      { nome: 'Pisos', media: 'media/pisos', icon: 'media/tool-icons/icon-CotaPisos.dark.png', descricao: 'Cota os segmentos retos do contorno dos pisos selecionados.' },
      { nome: 'Forros', media: 'media/forros', icon: 'media/tool-icons/icon-CotaForros.dark.png', descricao: 'Cota os segmentos retos do contorno dos forros selecionados.' }
    ]
  },
  {
    nome: 'Cotas de Cortes',
    comandos: [
      { nome: 'Por Linha', media: 'media/cortes-por-linha', icon: 'media/tool-icons/icon-Cortes.dark.png', descricao: 'Em corte ou elevação, desenhe uma linha e cote o que ela atravessa.' }
    ]
  },
  {
    nome: 'Tags',
    comandos: [
      { nome: 'Portas', media: 'media/tags-portas', icon: 'media/tool-icons/icon-TagPortas.dark.png', descricao: 'Insere a tag de todas as portas da vista ou somente das selecionadas.' },
      { nome: 'Janelas', media: 'media/tags-janelas', icon: 'media/tool-icons/icon-TagJanelas.dark.png', descricao: 'Insere a tag de todas as janelas da vista ou somente das selecionadas.' },
      { nome: 'Paredes', media: 'media/tags-paredes', icon: 'media/tool-icons/icon-TagParedes.dark.png', descricao: 'Insere a tag de todas as paredes da vista ou somente das selecionadas.' },
      { nome: 'Ambientes', media: 'media/tags-ambientes', icon: 'media/tool-icons/icon-TagAmbientes.dark.png', descricao: 'Insere a tag de todos os ambientes da planta ou somente dos selecionados.' },
      { nome: 'Forros', media: 'media/tags-forros', icon: 'media/tool-icons/icon-TagForros.dark.png', descricao: 'Insere a tag de todos os forros da vista ou somente dos selecionados.' },
      { nome: 'Nível dos Ambientes', media: 'media/nivel-ambientes', icon: 'media/tool-icons/icon-NivelAmbientes.dark.png', descricao: 'Insere a cota de elevação no piso de cada ambiente da planta.' }
    ]
  },
  {
    nome: 'Pranchas',
    comandos: [
      { nome: 'Gerador de Pranchas', media: 'media/pranchas', icon: 'media/tool-icons/icon-CriarPranchas.dark.png', descricao: 'Transforma os cartões organizados com vistas em novas pranchas.' },
      { nome: 'Exportar Pranchas', media: 'media/exportar-pranchas', icon: 'media/tool-icons/icon-ExportarPranchas.dark.png', descricao: 'Exporta pranchas para PDF e DWG com presets, ordenação e nomenclatura personalizada.' }
    ]
  },
  {
    nome: 'Documentação',
    comandos: [
      { nome: 'Vistas por Ambiente', media: 'media/vistas', icon: 'media/tool-icons/icon-CriarVistas.dark.png', descricao: 'Cria planta 2D, vista 3D e cortes longitudinal e transversal para os ambientes selecionados.' }
    ]
  },
  {
    nome: 'Configurações',
    comandos: [
      { nome: 'Cotas', media: 'media/configuracoes', icon: 'media/tool-icons/icon-ConfigCotas.dark.png', descricao: 'Centraliza tipos de cota, afastamentos, textos e padrões usados pelos comandos.' },
      { nome: 'Tags', media: 'media/config-tags', icon: 'media/tool-icons/icon-ConfigTags.dark.png', descricao: 'Define tipo de tag, orientação e deslocamento para cada categoria.' }
    ]
  }
];

const TEASER = {
  painel: 'Em breve',
  nome: 'E muito mais!',
  descricao: 'Novas ferramentas continuarão chegando ao DocFlow.',
  teaser: true
};

const COMANDOS = [
  ...PAINEIS.flatMap((painel) =>
    painel.comandos.map((comando) => ({ ...comando, painel: painel.nome }))),
  TEASER
];
