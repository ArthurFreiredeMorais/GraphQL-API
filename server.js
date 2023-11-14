const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 function from uuid package

// Sample data (You can replace this with a database)
let users = [
  { id: uuidv4(), username: 'user1', email: 'user1@example.com' },
  { id: uuidv4(), username: 'user2', email: 'user2@example.com' }
];

let posts = [
  { id: uuidv4(), title: 'Post 1', content: 'Content for post 1', userId: users[0].id },
  { id: uuidv4(), title: 'Post 2', content: 'Content for post 2', userId: users[1].id }
];

// GraphQL schema definition
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User! # Change the association here to match the 'userId' field
  }

  type Query {
    users: [User]
    posts: [Post]
  }

  type Mutation {
    createUser(username: String!, email: String!): User
    createPost(title: String!, content: String!, userId: ID!): Post
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts
  },
  Mutation: {
    createUser: (_, { username, email }) => {
      const newUser = { id: uuidv4(), username, email };
      users.push(newUser);
      return newUser;
    },
    createPost: (_, { title, content, userId }) => {
      const userExists = users.some(user => user.id === userId);

      if (!userExists) {
        throw new Error('User not found'); // Throw an error if the user is not found
      }

      const newPost = { id: uuidv4(), title, content, userId };
      posts.push(newPost);
      return newPost;
    }
  },
  Post: {
    author: (parent) => {
      const user = users.find(user => user.id === parent.userId);
      return user || null;
    }
  }
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen({ port: PORT }, () =>
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startApolloServer();
