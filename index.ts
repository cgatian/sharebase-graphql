const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver, GraphQLString } = require("graphql");

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  directive @intl on FIELD_DEFINITION

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    greeting: String @intl
  }
`;

class IntlDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        const context = args[2];
        const defaultText = await resolve.apply(this, args);
        // In this example, path would be ["Query", "greeting"]:
        const path = [details.objectType.name, field.name];
        return translate(defaultText, path, context.locale);
      };
    }
  }

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
      books: () => books,
      greeting: () => 'FRANK'
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        intl: IntlDirective
    }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

function translate(text: string, path: string[], context: string) {
    
    return 'WENIS';
}

