import { Resolvers, File } from '../typedefs/types'

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'JK Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    singleUpload: (parent, args, context, info) => {
      console.log(args.file)
      return {} as File
    },
  },
}

export default resolvers
