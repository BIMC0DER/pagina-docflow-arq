# Mídia da página

Enquanto um arquivo não existe, o card mostra um espaço reservado com o nome
do comando. Basta soltar o arquivo aqui com o nome certo que ele aparece
sozinho, sem mexer no código.

Aceita **imagem** (`.png`, `.jpg`, `.webp`, `.gif`) ou **vídeo** (`.mp4`,
`.webm`). Se existir imagem e vídeo com o mesmo nome, o vídeo ganha e toca em
loop, mudo. Só o vídeo do card da frente toca.

Formato: **vertical 9:16**, como os Reels. Os arquivos aqui estão em 540×960.

| arquivo             | comando                          | situação            |
|---------------------|----------------------------------|---------------------|
| `paredes-externas`  | Cotas de Paredes · Externas      | ✅ vídeo            |
| `paredes-selecao`   | Cotas de Paredes · Por Seleção   | ✅ vídeo            |
| `paredes-lote`      | Cotas de Paredes · Em Lote       | ✅ vídeo            |
| `familias-regiao`   | Cotas de Famílias · Por Região   | ✅ vídeo            |
| `familias-ambiente` | Cotas de Famílias · Por Ambiente | ✅ vídeo            |
| `ambientes`         | Ambientes e Contornos · Ambientes| ✅ vídeo            |
| `pisos`             | Ambientes e Contornos · Pisos    | ✅ vídeo            |
| `forros`            | Ambientes e Contornos · Forros   | ✅ vídeo            |
| `vistas`            | Documentação · Criar Vistas      | ✅ vídeo            |
| `pranchas`          | Documentação · Criar Pranchas    | ✅ vídeo            |
| `tags`              | Documentação · Inserir Tags      | ⬜ **falta gravar** |
| `configuracoes`     | Configuração · Padrões           | ✅ vídeo            |

## Como os vídeos chegaram aqui

Os originais ficam em
`G:\Meu Drive\00. BIM Coder\06. DocFlow\01. DocFlow ARQ\Videos demonstrativos`,
em 1080×1920 e somando 96 MB. Foram recomprimidos para 540×960 sem áudio,
o que derruba o conjunto para cerca de 1,4 MB sem perda visível no card.

Para adicionar um vídeo novo:

```bash
ffmpeg -i "ORIGINAL.mp4" -vf "scale=540:960" -an \
  -c:v libx264 -preset slow -crf 30 -profile:v main \
  -pix_fmt yuv420p -movflags +faststart media/NOME.mp4
```

O último card da vitrine ("E muito mais!") é desenhado só com CSS e não usa
arquivo nenhum.

## Para incluir ou tirar comandos da vitrine

A lista fica em [`../comandos.js`](../comandos.js). Cada comando é um objeto com
`nome`, `media` e `descricao`, agrupado pelo painel da ribbon. O contador e a
barra de progresso se ajustam sozinhos.
