import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
// import mocks from './mocks';
import resolvers from './resolvers';

/*
testString , author(...etc) , allAuthors , everything before :  are query made against database
Everything after : are schema
Please go to resolvers to see how it fetch data from all kind of sources
I don't know why we need type schema {...etc } like type Author{...} but If we don't have it
then compiler will give errors
Exception for getFortuneCookie query, it is an object from Third party API.
*/
const typeDefs = `

type Query {
  testString: [Author]
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  getFortuneCookie: String @cacheControl(maxAge: 5000)
}
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}
type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}

`;
//Typedefs stores every schema in the database
//Can split into many file for scalability and reusability
const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;