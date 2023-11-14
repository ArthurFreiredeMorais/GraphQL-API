const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Sample data (You can replace this with a database)
let users = [
  { id: '1', username: 'user1', email: 'user1@example.com' },
  { id: '2', username: 'user2', email: 'user2@example.com' }
];

let posts = [
  { id: '1', title: 'Post 1', content: 'Content for post 1', userId: '1' },
  { id: '2', title: 'Post 2', content: 'Content for post 2', userId: '2' }
];

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
    author: User!
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

const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts
  },
  Mutation: {
    createUser: (_, { username, email }) => {
      const newUser = { id: String(users.length + 1), username, email };
      users.push(newUser);
      return newUser;
    },
    createPost: (_, { title, content, userId }) => {
      const newPost = { id: String(posts.length + 1), title, content, userId };
      posts.push(newPost);
      return newPost;
    }
  },
  Post: {
    author: (parent) => {
      return users.find(user => user.id === parent.userId);
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
