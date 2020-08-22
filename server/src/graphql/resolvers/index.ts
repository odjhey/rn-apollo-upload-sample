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
}

export default resolvers
