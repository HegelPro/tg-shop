import { builder } from '../builder'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { printSchema } from 'graphql'
import './product'
import './invoice'

export const schema = builder.toSchema({})

writeFileSync(resolve(__dirname, '../../schema.graphql'), printSchema(schema))
