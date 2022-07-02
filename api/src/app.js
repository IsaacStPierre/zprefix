const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

const { hash, compare } = require("bcrypt");
const saltRounds = 6

// ==========================================  users path GET  ==========================================

app.get('/users', (request, response) => {
  console.log(`servicing GET for /users`);
  knex('users')
    .select('*')
    .then(data => {
      if (data.length > 0) {
        let responseData = data.map(user => ({ first_name: user.first_name, last_name: user.last_name, username: user.username }));
        response.status(200).send(responseData)
      } else {
        response.status(404).send('No users found.')
      }
    })
})

app.get('/users/:username', (request, response) => {
  console.log(`servicing GET for /users${request.params.username}`)
  knex('users')
    .select('*')
    .where('users.username', '=', request.params.username)
    .then(data => {
      if (data.length > 0) {
        response.status(200).send({ first_name: data[0].first_name, last_name: data[0].last_name, username: data[0].username })
      } else {
        response.status(404).send('No users found.')
      }
    })
})

// ==========================================  users path POST  ==========================================


app.post('/users', (request, response) => {
  console.log(`servicing POST for /users`)
  let { first_name, last_name, username, password } = request.body

  if (first_name && last_name && username && password) {
    validRequest = true;
  }

  if (validRequest) {
    console.log("Request was valid", request.body)
    hash(password, saltRounds)
      .then(hashedPassword => {
        console.log(`users real password:`, password);
        console.log(`That password is now:`, hashedPassword)
        knex('users')
          .insert({ first_name, last_name, username, password: hashedPassword })
          .then(data => {
            response.status(200).send(data)
          })
      })
  } else {
    response.status(404).send('Invalid post request.')
  }
})

app.post('/login', (request, response) => {
  console.log(`servicing POST for /login`)
  let { username, password } = request.body
  if (username && password) {
    knex('users')
      .where({ username })
      .select('password')
      .then(data => data[0].password)
      .then((hashedPassword) => {
        compare(password, hashedPassword)
          .then((isMatch) => {
            if (isMatch) { response.status(200).send('login successful') }
          })
      })
  } else {
    response.status(404).send('Invalid post request.')
  }
})

// ==========================================  posts path GET  ==========================================

app.get('/posts', (request, response) => {
  console.log(`servicing GET for /posts`);
  knex('posts')
    .join('users', 'posts.users_id', '=', 'users.users_id')
    .then(data => {
      if (data.length > 0) {
        let responseData = data.map(post => ({ title: post.title, content: post.content, user: post.username, post_id: post.posts_id }));
        response.status(200).send(responseData)
      } else {
        response.status(404).send('No posts found.')
      }
    })
})

app.get('/posts/:id', (request, response) => {
  console.log(`servicing GET for /posts/${request.params.id}`)
  knex('posts')
    .join('users', 'posts.users_id', '=', 'users.users_id')
    .where('posts.posts_id', '=', parseInt(request.params.id))
    .then(data => {
      if (data.length > 0) {
        response.status(200).send({ title: data[0].title, content: data[0].content, user: data[0].username });
      } else {
        response.status(404).send('No posts found')
      }
    })
})

// ==========================================  posts path POST  ==========================================

app.post('/posts/add', (request, response) => {
  console.log(`servicing POST for /posts`)
  let keys = ['users_id', 'title', 'content']
  let validRequest = false

  if (request.body[keys[0]] && request.body[keys[1]] && request.body[keys[2]]) {
    validRequest = true;
  }

  if (validRequest) {
    console.log("Request was valid", request.body)
    knex('posts')
      .insert(request.body)
      .then(data => {
        response.status(200).send(data)
      })
  } else {
    console.log(`Request was invalid ${request.body}`)
    response.status(404).send('Invalid post request.')
  }
})

// ==========================================  posts path PATCH  ==========================================

app.patch('/posts/:id', (request, response) => {
  console.log(`servicing PATCH for /posts/${request.params.id}`)
  let keys = ['title', 'content']
  let validRequest = false;

  if (request.body[keys[0]] || request.body[keys[1]]) {
    validRequest = true;
  }

  if (validRequest) {
  knex('posts')
  .where('posts.posts_id', '=', parseInt(request.params.id))
  .update({title: request.body.title, content: request.body.content})
  .then(data => {
    response.send(200).send(data)
  })
  } else {
    console.log(`Request was invalid ${request.body}`)
    response.status(404).send('Invalid patch request.')
  }

})

// ==========================================  posts path DELETE  ==========================================

app.delete('/posts/:id', (request, response) => {
  console.log(`servicing DELETE for /posts/${request.params.id}`)
  knex('posts')
    .where('posts.post_id', '=', parseInt(req.params.id))
    .del()
    .then(data => {
      res.status(200).send(`Number of records deleted: ${data}`);
    })
})


module.exports = app;