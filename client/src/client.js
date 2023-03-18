import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

/**
 * Create a new apollo client and export as default
 */
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
})

export default client
