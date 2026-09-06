# Vídeos da página de vendas

Edite somente `vendas-videos.js` para trocar ou acrescentar demonstrações.

- Os grupos são `cotas`, `vistas` e `pranchas`; recebem o mesmo espaço na galeria.
- O primeiro item de cada lista `videos` também aparece na aba correspondente da primeira dobra.
- Para trocar uma gravação, coloque o novo arquivo em `media/` e altere `src`.
- Para adicionar uma demonstração, copie um item da lista e informe `id` único, `title`, `src` e `description`. Quando um grupo tem mais de um vídeo, o seletor aparece automaticamente.
- Títulos e descrições são textos simples. O vídeo é exibido inteiro, sem cortar a gravação. Arquivos horizontais e verticais são aceitos.
- Os vídeos atuais foram preservados. Novas gravações ainda serão fornecidas por Fellipe.
- Inclua apenas ferramentas disponíveis. Cortes e elevações em desenvolvimento não devem ser anunciados como prontos.
- Após editar, atualize a versão de `vendas-videos.js?v=...` em `vendas.html` para evitar cache antigo.

A vitrine usa `comandos.js`; mantenha nele somente comandos já disponíveis no plugin.

## Comparativo de cotas

A seção “A mesma planta. Dois processos.” usa estes arquivos:

- media/comparison/cotas-manual-comparativo.mp4
- media/comparison/cotas-manual-comparativo.jpg
- media/comparison/cotas-automatico-comparativo.mp4
- media/comparison/cotas-automatico-comparativo.jpg

Para trocar os vídeos sem editar HTML, preserve esses nomes. Os dois arquivos devem mostrar a mesma planta e podem ter durações diferentes. Atualize também os tempos escritos em vendas.html caso o cronômetro mude.

## Vídeo de configurações

A seção “Seu padrão de projeto” usa o arquivo media/configuracoes.mp4. O vídeo atual é vertical 9:16. A próxima gravação pode ser horizontal 16:9: preserve o nome do arquivo e a página detectará a nova proporção para reorganizar automaticamente a seção em um layout largo.

## Novos comandos cadastrados na vitrine

A vitrine em perspectiva é alimentada por `comandos.js`. Comandos sem vídeo usam o ícone oficial e exibem “Demonstração em breve”.

Para substituir o estado provisório por vídeo, salve o arquivo em `media/` com um destes nomes:

- `paredes-internas.mp4`
- `cortes-por-linha.mp4`
- `tags-portas.mp4`
- `tags-janelas.mp4`
- `tags-paredes.mp4`
- `tags-ambientes.mp4`
- `tags-forros.mp4`
- `nivel-ambientes.mp4`
- `exportar-pranchas.mp4`
- `config-tags.mp4`

Para que um vídeo também apareça nos cards horizontais e no seletor, cadastre o item correspondente em `vendas-videos.js`.

