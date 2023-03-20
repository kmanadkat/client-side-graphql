import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat, gql } from '@apollo/client'

/**
 * Create a new apollo client and export as default
 */
const typeDefs = gql`
  extend type User {
    age: Int
  }

  extend type Pet {
    vaccinated: Boolean
  }
`

const resolvers = {
  User: {
    age() {
      return 26
    }
  },
  Pet: {
    vaccinated() {
      return true
    }
  }
}

const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });
const delayMiddleware = new ApolloLink((operation, forward) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(forward(operation))
    }, 2000)
  })
})

const client = new ApolloClient({
  link: concat(delayMiddleware, httpLink),
  cache: new InMemoryCache(),
  resolvers,
  typeDefs
})

export default client
