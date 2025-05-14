Configuração adicional para o vite rodar com deploy

no package.json adicioar as seguintes linhas
 "homepage": "https://rafaelgti79.github.io/plano-saude/", 
 "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"

no arquivo vite.config
 base: "/plano-saude",
 lembrando q a base é o mesmo nome do git hub, ou da rota principal do arquivo, caso tenha mais de uma rota