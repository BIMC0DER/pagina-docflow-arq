# Mídia da página

Enquanto um arquivo não existe, a página mostra um espaço reservado com o nome
do comando. Basta soltar o arquivo aqui com o nome certo que ele aparece
sozinho, sem mexer no código.

## Cards dos comandos

Um arquivo por comando. Aceita **imagem** (`.png`, `.jpg`, `.webp`, `.gif`) ou
**vídeo** (`.mp4`, `.webm`). Se existir imagem e vídeo com o mesmo nome, o vídeo
ganha e toca em loop, mudo.

Formato ideal: **4:3 na horizontal**, 1200×900 px, mostrando o antes/depois do
comando numa planta real.

| arquivo                      | comando                          |
|------------------------------|----------------------------------|
| `paredes-externas`           | Cotas de Paredes · Externas      |
| `paredes-internas`           | Cotas de Paredes · Internas      |
| `paredes-selecao`            | Cotas de Paredes · Por Seleção   |
| `paredes-lote`               | Cotas de Paredes · Em Lote       |
| `paredes-linha`              | Cotas de Paredes · Por Linha     |
| `familias-regiao`            | Cotas de Famílias · Por Região   |
| `familias-ambiente`          | Cotas de Famílias · Por Ambiente |
| `familias-linha`             | Cotas de Famílias · Por Linha    |
| `ambientes`                  | Ambientes e Contornos · Ambientes|
| `pisos`                      | Ambientes e Contornos · Pisos    |
| `forros`                     | Ambientes e Contornos · Forros   |
| `vistas`                     | Documentação · Criar Vistas      |
| `pranchas`                   | Documentação · Criar Pranchas    |
| `tags`                       | Documentação · Inserir Tags      |
| `configuracoes`              | Configuração · Padrões           |

Exemplo: `media/paredes-externas.png` ou `media/paredes-externas.mp4`.

## Vídeo de demonstração

O bloco grande no meio da página procura, nesta ordem:

1. `media/demonstracao.mp4`
2. `media/demonstracao.webm`
3. `media/demonstracao.png` (imagem estática, caso ainda não tenha vídeo)

Formato ideal: **16:9**, 1920×1080. A capa do vídeo, se existir, é
`media/demonstracao-capa.jpg`.
