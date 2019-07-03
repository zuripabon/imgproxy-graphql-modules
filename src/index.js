import { GraphQLModule } from '@spotahome/soyuz-graphql-modules';

import typeDefs from './module/schema.graphql';
import resolvers from './module/resolvers';
import model from './module/model';
import configSchema from './module/configSchema';

const ImgProxyModule = new GraphQLModule({
  name: 'ImgProxy',
  typeDefs,
  resolvers,
  model,
  configSchema
});

export default ImgProxyModule;
