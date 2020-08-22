import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'

const typeDefs = loadFilesSync(
  path.join(__dirname, './schema.graphql'),
)

export default mergeTypeDefs(typeDefs)
