# Reth
## Contato
> grilo.lennon@gmail.com
## Observações
Antes de qualquer coisa, este bot não foi feito para ser usado em larga escala então nem tente

Para que os comandos funcionem corretamente, vocês devem botar os emojis que estão nas pastas aqui em servidores que o bot
está. Não troquem o nome dos emojis, por mais estranhos que sejam

Boa parte dos comandos foi feito para ser identico ao do reth, embora nem todos cumpram isso
## Comandos não implementados
> r!ship

> r!shards

> r!bug

> r!traduzir

> r!registrosp
## 'Instalação'
### Packages do npm utilizadas
| Nome | Comando|
|---|---|
| discord.js | `npm i discord.js`|
| superagent | `npm i superagent`|
| weather-js | `npm i weather-js`|
| ms | `npm i ms` |
| moment | `npm i moment`|
| mongoose | `npm i mongoose`|
| bufferutil (opcional) | `npm i bufferutil`|
| erlpack (opcional) | `npm i hammerandchisel/erlpack`|
| uws (opcional) | `npm i uws`|
### config.json
```json
{
 "prefix": "prefixo do bot",
 "token": "token do bot",
 "dbURL": "URL da mongoDB"
}
```
### Database
A que eu usei para este bot foi mongoDB com mongoose para node.js, hosteada no mlab.com
## ¯\\_(ツ)_/¯
Não tem muito o que falar, pode ser que haja erros nos comandos mas acredito que boa parte funciona como esperado

E sobre o `r!contador`, para que o contador apareça você deve inserir `{contador}` no comando `r!contador texto <texto aqui>`

Exemplo: `r!contador texto Quantidade de membros: {contador}`

Façam o que quiserem aí com isso, tem várias coisas que podem ser melhoradas e to com preguiça
