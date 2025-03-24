# Jogo da Velha

Este é um jogo da velha simples criado com HTML, CSS e JavaScript, empacotado em um executável `.exe` usando Electron.

## Funcionalidades

* Jogo para dois jogadores.
* Opção de jogar contra a IA.
* Estatísticas do jogo (vitórias e empates).
* Interface gráfica simples e intuitiva.

## Como jogar

1. Baixe o arquivo `dist.zip` do release mais recente.
2. Extraia o arquivo `dist.zip` para uma pasta.
3. Execute o arquivo `jogo-da-velha.exe`.
4. Clique nas células do tabuleiro para marcar suas jogadas.
5. O jogador que conseguir três marcas em linha (horizontal, vertical ou diagonal) vence.
6. Se todas as células forem preenchidas e não houver vencedor, o jogo termina em empate.

## Como jogar contra a IA

1. Clique no botão "Jogador vs IA".
2. Faça sua jogada clicando em uma célula vazia.
3. A IA fará sua jogada automaticamente.

## Como ver as estatísticas

1. Clique no botão "Estatísticas".
2. As estatísticas do jogo serão exibidas na parte inferior da tela.

## Tecnologias utilizadas

* HTML
* CSS
* JavaScript
* Electron

## Como executar o código-fonte

1. Clone este repositório.
2. Navegue até o diretório do projeto.
3. Execute `npm install` para instalar as dependências.
4. Execute `npm start` para iniciar o aplicativo Electron.

## Como criar o executável

1. Execute `npm install electron-packager -g` para instalar o Electron Packager.
2. Execute `electron-packager . jogo-da-velha --platform=win32 --arch=x64 --out=dist` para criar o executável.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.