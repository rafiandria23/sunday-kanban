# Sunday Kanban API Documentation

#### by Adam Rafiandri, forked from [Majestic Fox 2019](https://github.com/majestic-fox-2019/kanban "Majestic Fox 2019")

This is my second project on Phase 2.
This simple kanban board can really make your development process more efficient.

**LET'S JUMP INTO IT!!**

---

These are the routes/endpoints this API has:

| HTTP Method | Route                  | Overview                                                    |
| ----------- | ---------------------- | ----------------------------------------------------------- |
| **POST**    | /register              | Posts data to register.                                     |
| **POST**    | /login                 | Posts data to log in via email and password.                |
| **POST**    | /login/google          | Posts data to log in via Google account.                    |
| **GET**     | /categories            | Displays all available categories which are curently fixed. |
| **GET**     | /tasks                 | Shows all tasks relative to the currently logged in user.   |
| **POST**    | /tasks/:category_id    | Posts data to be created as a task.                         |
| **PUT**     | /:category_id/:task_id | Updates specified task.                                     |
| **DELETE**  | /:category_id/:task_id | Deletes specified task.                                     |

---

## **POST** _/login_

This generates a token to later be used for authentication.

### Properties Breakdown

- Email (String)
- Password (String)

#### Request Header

```javascript
{
  "Content-Type": "application/json"
}
```

#### Request Body

```javascript
{
  "user_email": "your email",
  "user_password": "your password"
}
```

#### Response

- Status Code: 200

```javascript
{
  "token": "generated token"
}
```

- Status Code: 400

  ```javascript
  {
      "message": [
          "ValidationError: Wrong email or password!"
      ]
  }
  ```

- Status Code: 404

  ```javascript
  {
      "message": [
          "User not found! Please register otherwise."
      ]
  }
  ```

<br>

## **POST** _/register_

This results in a text message to login after registration.

### Properties Breakdown

- Name (String)
- Email (String)
- Password (String)

#### Request Header

```javascript
{
  "Content-Type": "application/json"
}
```

#### Request Body

```javascript
{
  "user_name": "your name",
  "user_email": "your email",
  "user_password": "your password"
}
```

#### Response

- Status Code: 201

```javascript
{
  "message": "Please login to continue!"
}
```

- Status Code: 400

  ```javascript
  {
      "message": [
          "ValidationError: Please provide proper email address!",
          "ValidationError: Email is already taken!",
          "ValidationError: Please provide password!"
      ]
  }
  ```

<br>

## **POST** _/login/google_

This also generates a token to later be used for authentication but uses Google OAuth 2.0 and automatically registers in local database.

### Properties Breakdown

- Google Token (String)

#### Request Header

```javascript
{
  "Content-Type": "application/json"
}
```

#### Request Body

```javascript
{
  "id_token": "your google token"
}
```

#### Response

- Status Code: 200

```javascript
{
  "token": "generated token"
}
```

There is no validation in this way of logging in, except Google's validations.

<br>

## **GET** _/categories_

### Properties Breakdown

- Name (String)

#### Request Header

```javascript
{
  "Content-Type": "application/json",
  "token": "your generated token"    
}
```

#### Response

- Status Code: 200

```javascript
[
  {
    "id": 1,
    "name": "Open",
    "createdAt": "2020-02-03T12:40:15.030Z",
    "updatedAt": "2020-02-03T12:40:15.030Z"
  },
  {
    "id": 2,
    "name": "In Progress",
    "createdAt": "2020-02-03T12:42:30.860Z",
    "updatedAt": "2020-02-03T12:42:30.860Z"
  },
  {
    "id": 3,
    "name": "Resolved",
    "createdAt": "2020-02-03T12:42:30.860Z",
    "updatedAt": "2020-02-03T12:42:30.860Z"
  },
  {
    "id": 4,
    "name": "Closed",
    "createdAt": "2020-02-03T12:42:30.860Z",
    "updatedAt": "2020-02-03T12:42:30.860Z"
  }
]
```

Currently, we only have 4 fixed categories as written above, while we're still working on making it dynamic and updatable / editable.

- Status Code: 404

  ```javascript
  {
      "message": "No categories found!"
  }
  ```

<br>

## **GET** _/tasks_

### Properties Breakdown

- Name (String)
- Descripton (String / Text)
- CategoryId (Number)
- UserId (Number)

> Created At and Update At properties are automatically updated upon PUT and POST methods.

#### Request Header

```javascript
{
  "Content-Type": "application/json",
  "token": "your generated token"
}
```

#### Response

- Status Code: 200

```javascript
{
    "tasks": [
        {
            "id": 1,
    		"name": "Create Task model",
    		"description": "Using ORM",
            "CategoryId": 1,
            "UserId": 1,
            "updatedAt": "2020-02-03T12:42:30.860Z",
            "createdAt": "2020-02-03T12:42:30.860Z"
        },
        {
            "id": 2,
    		"name": "Create controller Task model",
    		"description": "Using a web framework",
            "CategoryId": 2,
            "UserId": 1,
            "updatedAt": "2020-02-03T12:42:30.860Z",
            "createdAt": "2020-02-03T12:42:30.860Z"
        }
        ...
    ]
}
```

ID is automatically incremented and generated.

- Status Code: 404

  ```javascript
  {
    "message": "No tasks found!"
  }
  ```

<br>

## **POST** _/tasks/:category_id_

### Properties Breakdown

- Name (String)
- Descripton (String / Text)

#### Request Header

```javascript
{
  "Content-Type": "application/json",
  "token": "your generated token"
}
```

#### Request Body

```javascript
{
  "task_name": "Deploy to a web hosting",
  "task_description": "Deploy with configuration"
}
```

#### Response

- Status Code: 201

```javascript
{
    "tasks": {
        "id": 8,
    	"name": "Deploy to a web hosting",
    	"description": "Deploy with configuration"
    	"createdAt": "2020-02-03T12:42:30.860Z",
    	"updatedAt": "2020-02-03T12:42:30.860Z"
    },
    "message": "Successfully created task!"
}
```

- Status Code: 400

  ```javascript
  {
    "message": [
      "Please provide task name!"
    ]
  }
  ```

<br>

## **PUT** _/tasks/:category_id/:task_id_

### Properties Breakdown

- Name (String)
- Descripton (String / Text)

#### Request Header

```javascript
{
  "Content-Type": "application/json",
  "token": "your generated token"
}
```

#### Request Body

```javascript
{
    "task_name": "Build using a bundler",
    "task_description": "You can try Webpack!"
}
```

#### Response

- Status Code: 200

```javascript
{
    "id": 10,
    "task_name": "Build using a bundler",
    "task_description": "You can try Webpack!",
    "createdAt": "2020-02-03T12:42:30.860Z",
    "updatedAt": "2020-02-03T13:07:12.849Z"
}
```

- Status Code: 400

  ```javascript
  {
    message: [
      "Please provide task name!"
    ]
  }
  ```

  

<br>

## **DELETE** _/:category_id/:task_id_

#### Request Header

```javascript
{
  "Content-Type": "application/json",
  "token": "your generated token"
}
```

#### Response

- Status Code: 200

```javascript
{
    "id": "Successfully "
}
```

> This will output the specified task in object and delete it right away.