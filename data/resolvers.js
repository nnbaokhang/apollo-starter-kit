import { Author, View, FortuneCookie } from './connectors';
/*
As far as I understand Graph QL
When a request query send, schema will trigger resolvers -> trigger connectors -> connectors fetch data
from many sources such as local database, remote database or Third party API(Cant not change data in here though)
-> send data to resolvers -> send data to schema and all the data will be here
const schema = makeExecutableSchema({ typeDefs, resolvers });
 */
const mocks = {
    String: () => 'It works!'
};
const resolvers = {
    Query: {
        testString(){
            return Author.findAll();
        },
        author(_, args) {
            return Author.find({ where: args });
        },
        allAuthors() {
            return Author.findAll();
        },
        getFortuneCookie() {
            return FortuneCookie.getOne();
        }
    },
    Author: {
        posts(author) {
            return author.getPosts();
        }
    },
    Post: {
        author(post) {
            return post.getAuthor();
        },
        views(post) {
            return View.findOne({ postId: post.id }).then(view => view.views);
        }
    },

};

export default resolvers;