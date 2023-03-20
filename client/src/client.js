import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client'

/**
 * Create a new apollo client and export as default
 */
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
  cache: new InMemoryCache()
})

export default client
