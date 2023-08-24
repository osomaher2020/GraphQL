import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { typeDefs } from "./schema.js"

import db from "./_db.js"


// 5- resolver functions
const resolvers = {
    Query: {
        games: () => db.games,
        authors: () => db.authors,
        reviews: () => db.reviews,
        // GET One:  (parent, args)
        game: (_, args) => db.games.find(game => game.id === args.id),
        author: (_, args) => db.authors.find(author => author.id === args.id),
        review: (_, args) => db.reviews.find(review => review.id === args.id)
    },
    // 8- Classes for Quering (Related Data)
    Game: {
        // a "Game" has [Multiple] "Reviews"
        reviews(parent) { // parent === parent Class === Game
            return db.reviews.filter(rev => rev.game_id === parent.id) // Game may has multiple reviews --> so we return all associated reviews with that game_id
        }
    },
    Author: {
        // an "Author" has [Multiple] "Reviews"
        reviews(parent) {
            return db.reviews.filter(rev => rev.author_id === parent.id)
        }
    },
    Review: {
        // one "Review" is for --Single-- "Game"
        game(parent) {
            return db.games.find(g => g.id === parent.game_id) // find One according to what we described at schema.js
        },
        // one "Review" is for --Single-- "Author"
        author(parent) {
            return db.authors.find(a => a.id === parent.author_id) // find One according to what we described at schema.js
        }
    },
    // 9- Mutations <<<<<<<<<<<<<<<<<<<<<<<<
}


// 1- server setup
const server = new ApolloServer({
    // typeDefs = schema
    typeDefs,
    // resolvers functions --> handles Requests on our schema's endPoints --> each endPoint will has a resolver function
    resolvers
})

// 2- create file schema.js --> to define your dataTypes inside
// 3- import typeDefs from your schema

// 4- create _db.js   which will hold DB dataObjects   --- then, import it

// 5- write your resolvers functions

// 6- run your Query on https://studio.apollographql.com/sandbox/explorer

// 7- define Relationsships between typeDefs @ "schema.js"

// 8- add a Class inside resolvers describing the Related Data

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`server is ready on ${url}`)