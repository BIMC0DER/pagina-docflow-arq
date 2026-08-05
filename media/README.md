# Mídia da página

Enquanto um arquivo não existe, o card mostra um espaço reservado com o nome
do comando. Basta soltar o arquivo aqui com o nome certo que ele aparece
sozinho, sem mexer no código.

Aceita **imagem** (`.png`, `.jpg`, `.webp`, `.gif`) ou **vídeo** (`.mp4`,
`.webm`). Se existir imagem e vídeo com o mesmo nome, o vídeo ganha e toca em
loop, mudo.

Formato ideal: **4:3 na horizontal**, 1200×900 px, mostrando o antes/depois do
comando numa planta real.

| arquivo             | comando                          |
|---------------------|----------------------------------|
| `paredes-externas`  | Cotas de Paredes · Externas      |
| `paredes-selecao`   | Cotas de Paredes · Por Seleção   |
| `paredes-lote`      | Cotas de Paredes · Em Lote       |
| `familias-regiao`   | Cotas de Famílias · Por Região   |
| `familias-ambiente` | Cotas de Famílias · Por Ambiente |
| `ambientes`         | Ambientes e Contornos · Ambientes|
| `pisos`             | Ambientes e Contornos · Pisos    |
| `forros`            | Ambientes e Contornos · Forros   |
| `vistas`            | Documentação · Criar Vistas      |
| `pranchas`          | Documentação · Criar Pranchas    |
| `tags`              | Documentação · Inserir Tags      |
| `configuracoes`     | Configuração · Padrões           |

Exemplo: `media/paredes-externas.png` ou `media/paredes-externas.mp4`.

O último card da vitrine ("E muito mais!") é desenhado só com CSS e não usa
arquivo nenhum.

## Para incluir ou tirar comandos da vitrine

A lista fica em [`../comandos.js`](../comandos.js). Cada comando é um objeto com
`nome`, `media` e `descricao`, agrupado pelo painel da ribbon. O contador e a
barra de progresso se ajustam sozinhos.
