# GraphQL-API
 
Tests on the Apollo Server

Get Users

```
query {
  users {
    id
    username
    email
  }
}

```

Get Posts

```
query {
  posts {
    id
    title
    content
    author {
      id
      username
      email
    }
  }
}

```

# Mutations:

Creating user

```
mutation {
  createUser(username: "newUser", email: "newuser@example.com") {
    id
    username
    email
  }
}


```

Creating Post

```
mutation {
  createPost(title: "New Post", content: "Content for the new post", userId: "1") {
    id
    title
    content
    author {
      id
      username
      email
    }
  }
}

```