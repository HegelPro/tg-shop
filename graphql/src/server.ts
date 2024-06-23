import { createYoga } from 'graphql-yoga'
import { schema } from './schema'
import { bot } from "./bot/bot"
import { readFileSync } from 'fs'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import path from 'path'
import fastifyStatic from '@fastify/static'

bot.start({onStart: () => console.log('bot is started')});

const yoga = createYoga<{
  req: FastifyRequest
  reply: FastifyReply
}>({
  graphqlEndpoint: process.env.GRAPHQL_ENDPOINT,
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

const app = fastify({ logger: true, https: {
  key,
  cert,
  ca
},
})

const serverPort = Number.parseInt(process.env?.SERVER_PORT || '4000')

const frontendPath = path.join(__dirname, '../../tg-web-app/dist')
app.register(fastifyStatic, {
  root: frontendPath,
})

app.route({
  url: yoga.graphqlEndpoint,
  method: ['GET', 'POST', 'OPTIONS'],
  handler: async (req, reply) => {
    const response = await yoga.handleNodeRequestAndResponse(req, reply, {
      req,
      reply
    })
    response.headers.forEach((value, key) => {
      reply.header(key, value)
    })
 
    reply.status(response.status)
 
    reply.send(response.body)
 
    return reply
  }
})
 
app.listen({
  port: serverPort,
  host: '0.0.0.0'
})