
MockApi

based on
https://www.rahulpnath.com/blog/setting-up-a-fake-rest-api-using-json-server/#setting-up-json-server
https://github.com/rahulpnath/quotes


How ChatGPT would add a keycloak mock
A JSON server with a Keycloak mock can be set up using the following steps:
- Install the json-server and keycloak-mock packages using npm or yarn:
-> npm install json-server keycloak-mock

Create a server.js file with the following content:

const jsonServer = require('json-server')
const keycloakMock = require('keycloak-mock')

const app = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

app.use(middlewares)

// Set up Keycloak mock
const keycloak = new keycloakMock({
  realm: 'example-realm',
  users: [
    {
      id: '1',
      username: 'user1',
      password: 'password1',
      email: 'user1@example.com'
    },
    {
      id: '2',
      username: 'user2',
      password: 'password2',
      email: 'user2@example.com'
    }
  ]
})

app.use(keycloak.middleware())

app.use(router)
app.listen(3000, () => {
  console.log('JSON Server is running')
})
