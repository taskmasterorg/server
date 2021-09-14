<a name="top"></a>
# taskmaster v0.1.0

API docs for the inventory microservice.

# Table of contents

- [Auth](#Auth)
  - [User login](#User-login)
  - [User logout](#User-logout)
  - [User signup](#User-signup)

___


# <a name='Auth'></a> Auth

## <a name='User-login'></a> User login
[Back to top](#top)

<p>Http-Only cookie is set.</p>

```
POST /api/v1/auth/login
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `string` |  |
| password | `string` |  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200
 {
     "message": "Okay"
 }
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='User-logout'></a> User logout
[Back to top](#top)

<p>The JWT of the user is invalidated.</p>

```
POST /api/v1/auth/logout
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200
 {
     "message": "Okay"
 }
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='User-signup'></a> User signup
[Back to top](#top)

```
POST /api/v1/auth/signup
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| firstName | `string` |  |
| lastName | `string` |  |
| email | `string` |  |
| password | `string` |  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200
 {
     "message": "Created!"
 }
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

