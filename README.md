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

obs: replace the <userId> with the actual valid userId to create a post succesfully
```
mutation {
  createPost(title: "New Post", content: "Content for the new post", userId: "<userId>") {
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
