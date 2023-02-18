import { createYoga } from 'graphql-yoga'
import { createServer } from 'https'
import { schema } from './schema'
import { bot } from "./bot/bot"
import { addCommands } from './bot/addCommands'
import { readFileSync } from 'fs'

addCommands(bot)
bot.start({onStart: () => console.log('bot is started')});

const yoga = createYoga({
  graphqlEndpoint: '/',
  schema,
  context: (req) => {
    return {
      req,
    }
  },
})

// Certificate
const key = readFileSync(process.env?.CERTIFICATE_KEY_PATH || '', 'utf8');
const cert = readFileSync(process.env?.CERTIFICATE_CERT_PATH || '', 'utf8');
const ca = readFileSync(process.env?.CERTIFICATE_CHAIN_PATH || '', 'utf8');

const server = createServer({key, cert, ca}, yoga)
const serverPort = process.env?.SERVER_PORT || 4000

server.listen(serverPort, () => {
  console.log(`\
🚀 Server ready at: http://127.0.0.1:${serverPort}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `)
})
