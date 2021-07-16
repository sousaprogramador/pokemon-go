import { ApolloClient } from '@apollo/client';
import { cache } from '../graphql/cache';

const client = new ApolloClient({
  cache: cache,
  uri: 'http://localhost:5000/graphql',
  connectToDevTools: true,
});

export default client;
