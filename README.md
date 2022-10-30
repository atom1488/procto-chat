# ProctoChat

## Procto-Chat is a chat app that uses React, Express, MongoDB and socket.io

This app has a Login page, a Register page, it has also an avatar system (bad one). You can chat with multiple people!

## How to install the App

1. Clone this project
2. Install [nodejs](https://nodejs.org/)
3. In the ./public directory, do `yarn install`
4. Do `yarn install` also in the ./server directory
5. Create a `.env` file and put inside `MONGO_URL = ` and put your own Mongo URI.
6. Then run the app using `yarn start` in the server directory and public directory.

## API Reference

#### Register account

```http
  POST /api/auth/register
```
 username, email, password 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Username of the account |
| `email` | `string` | **Required**. E-Mail of the account |
| `password` | `string` | **Required**. Password of the account |

#### Login to an account

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of the account |
| `password`      | `string` | **Required**. Password of the account |

#### Set an avatar image

```http
  POST /api/auth/setAvatar/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `string` | **Required**. Id of the user         |
| `image`      | `string` | **Required**. Base64 encoding of the image |

#### Get all users

```http
  GET /api/auth/allUsers/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of a user        |


#### Send message

```http
  POST /api/messages/addmsg
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `from`      | `string` | **Required**. Id of the user sending the message |
| `to`      | `string` | **Required**. Id of the user that is recieving the message |
| `message`      | `string` | **Required**. Message to send |

#### Send message

```http
  POST /api/messages/getmsg
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `from`      | `string` | **Required**. Id of the user sending messages |
| `to`      | `string` | **Required**. Id of the user that is recieving messages |


