// dataType = typeDefs = schema

// possible types --> Int, Float, String, Boolean, ID
//   !  == must have == required

// Query --> contains the EndPoints

export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String]!
        # 7- Relationship
        reviews: [Review!] # a game may not has any reviews, but if it has any --> it is Required to be of type Review
    },
    type Review {
        id: ID!
        rating: Int!
        content: String!
        # 7- Relationships
        game: Game!
        author: Author
    },
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        # 7- Relationship
        reviews: [Review!] # an author may not has any reviews, but if it has any --> it is Required to be of type Review
    },
    type Query {
        reviews: [Review]
        review(id: ID): Review
        games: [Game]
        game(id: ID): Game
        authors: [Author]
        author(id: ID): Author
    }
`