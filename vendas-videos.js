// Demonstrações exibidas na ribbon simulada do Revit.
// Cada item liga um comando de execução ao vídeo horizontal otimizado para web.
window.DOCFLOW_DEMOS = [
  {
    id: "cotas",
    label: "Cotas",
    title: "Cotas com poucos cliques",
    description: "Gere cotas de paredes, ambientes e famílias sem repetir tarefas.",
    videos: [
      { id: "cotas-externas", title: "Cotas externas", shortTitle: "Cotas externas", icon: "media/tool-icons/icon-ParedesExternas.dark.png", src: "media/horizontal/cotas-externas.mp4?v=20260907", description: "Detecte o perímetro e crie as cadeias pelo lado externo." },
      { id: "cotas-internas", title: "Cotas internas", shortTitle: "Cotas internas", icon: "media/tool-icons/icon-ParedesInternas.dark.png", src: "media/horizontal/cotas-internas.mp4?v=20260907", description: "Crie cadeias de cotas no interior do projeto." },
      { id: "cotas-ambientes", title: "Cotas de ambientes", shortTitle: "Por ambiente", icon: "media/tool-icons/icon-CotaAmbientes.dark.png", src: "media/horizontal/cotas-ambientes.mp4?v=20260907", description: "Gere cadeias horizontais e verticais por ambiente." },
      { id: "cotas-familias", title: "Cotas de famílias", shortTitle: "Cotar famílias", icon: "media/tool-icons/icon-FamiliasAmbiente.dark.png", src: "media/horizontal/cotas-familias.mp4?v=20260907", description: "Cote automaticamente as famílias contidas no projeto." }
    ]
  },
  {
    id: "vistas",
    label: "Vistas",
    title: "Vistas em segundos",
    description: "Crie as vistas necessárias para desenvolver a documentação.",
    videos: [
      { id: "vistas-ambiente", title: "Vistas por ambiente", shortTitle: "Por ambiente", icon: "media/tool-icons/icon-CriarVistas.dark.png", src: "media/horizontal/vistas-ambiente.mp4?v=20260907", description: "Prepare as vistas dos ambientes do seu projeto." },
      { id: "vistas-familias-lote", title: "Vistas de famílias em lote", shortTitle: "Famílias em lote", icon: "media/tool-icons/icon-FamiliasRegiao.dark.png", src: "media/horizontal/vistas-familias-lote.mp4?v=20260907", description: "Gere várias vistas de famílias em uma única execução." }
    ]
  },
  {
    id: "tags",
    label: "Tags",
    title: "Tags em segundos",
    description: "Identifique elementos do projeto com mais agilidade.",
    videos: [
      { id: "tags-auto", title: "Tags automáticas", shortTitle: "Inserir tags", icon: "media/tool-icons/icon-TagAmbientes.dark.png", src: "media/horizontal/tags.mp4?v=20260907", description: "Execute o comando e confira as tags prontas no modelo." }
    ]
  },
  {
    id: "pranchas",
    label: "Pranchas",
    title: "Organização para sua entrega",
    description: "Monte pranchas a partir dos modelos definidos para o escritório.",
    videos: [
      { id: "pranchas", title: "Criação de pranchas", shortTitle: "Gerar pranchas", icon: "media/tool-icons/icon-CriarPranchas.dark.png", src: "media/horizontal/pranchas.mp4?v=20260907", description: "Crie e organize as pranchas do projeto em poucos cliques." }
    ]
  }
];
