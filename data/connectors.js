import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import fetch from 'node-fetch';
import Mongoose from 'mongoose';
#Hello World test mtfk
Mongoose.Promise = global.Promise;
// Our focus is on mongodb so here it is
const mongo = Mongoose.connect('mongodb://localhost/views', {
    useMongoClient: true
});

const ViewSchema = Mongoose.Schema({
    postId: Number,
    views: Number
});

const View = Mongoose.model('views', ViewSchema);

//SQL database
const db = new Sequelize('blog', null, null, {
    dialect: 'sqlite',
    storage: './blog.sqlite'
});

const AuthorModel = db.define('author', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING }
});

const PostModel = db.define('post', {
    title: { type: Sequelize.STRING },
    text: { type: Sequelize.STRING }
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// modify the mock data creation to also create some views:
casual.seed(123);
db.sync({ force: true }).then(() => {
    _.times(10, () => {
        return AuthorModel.create({
            firstName: casual.first_name,
            lastName: casual.last_name
        }).then(author => {
            return author
                .createPost({
                    title: `A post by ${author.firstName}`,
                    text: casual.sentences(3)
                })
                .then(post => {
                    // <- the new part starts here
                    // create some View mocks
                    return View.update(
                        { postId: post.id },
                        { views: casual.integer(0, 100) },
                        { upsert: true }
                    );
                });
        });
    });
});
//Third party API.
const FortuneCookie = {
    getOne() {
        return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
            .then(res => res.json())
            .then(res => {
                return res[0].fortune.message;
            });
    }
};

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post, View, FortuneCookie };
