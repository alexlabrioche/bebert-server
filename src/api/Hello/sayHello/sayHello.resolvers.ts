import { Greeting } from 'src/types/graph';

const resolvers = {
  Query: {
    hello: (): Greeting => ({ error: false, text: 'hello dumbdumb' }),
  },
};
export default resolvers;
