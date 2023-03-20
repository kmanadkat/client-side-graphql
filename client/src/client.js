import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

/**
 * Create a new apollo client and export as default
 */
const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });
const delay = setContext(
  request => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 2000)
  })
)

const client = new ApolloClient({
  link: ApolloLink.from([delay, httpLink]),
  cache: new InMemoryCache()
})

export default client
