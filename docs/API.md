<a name="top"></a>
# taskmaster v0.1.0

API docs for the taskmaster server.

# Table of contents

- [Auth](#Auth)
  - [Delete user](#Delete-user)
  - [User login](#User-login)
  - [User logout](#User-logout)
  - [User signup](#User-signup)
- [Bug](#Bug)
  - [Assign a bug to a member](#Assign-a-bug-to-a-member)
  - [Create a bug](#Create-a-bug)
  - [Delete a bug](#Delete-a-bug)
  - [Get all bugs of a team](#Get-all-bugs-of-a-team)
  - [Get bug with id](#Get-bug-with-id)
  - [Update bug priority](#Update-bug-priority)
  - [Update bug status](#Update-bug-status)
- [Org](#Org)
  - [Add a member to an org](#Add-a-member-to-an-org)
  - [Create an org](#Create-an-org)
  - [Delete an org](#Delete-an-org)
  - [Get all members of an org](#Get-all-members-of-an-org)
  - [Get all orgs](#Get-all-orgs)
- [Team](#Team)
  - [Create a team](#Create-a-team)
  - [Delete a team](#Delete-a-team)
  - [Get all members of a team](#Get-all-members-of-a-team)
  - [Get all teams of the user](#Get-all-teams-of-the-user)
  - [Get team with id](#Get-team-with-id)

___


# <a name='Auth'></a> Auth

## <a name='Delete-user'></a> Delete user
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
DELETE /api/v1/auth/
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| userId | `string` |  |

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

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
     "userId": "someId",
     "jwt": "someToken",
     "firstName": "firstName",
     "lastName": "lastName",
     "email": "email"
 }
```

### Error response

#### Error response - `ClientError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `json` |  |

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
HTTP/1.1 201
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
HTTP/1.1 201
 {
     "message": "Created!"
 }
```

### Error response

#### Error response - `ClientError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `json` |  |

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

# <a name='Bug'></a> Bug

## <a name='Assign-a-bug-to-a-member'></a> Assign a bug to a member
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
PUT /api/v1/bug/assign
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| bugId | `string` |  |
| teamMemberId | `string` |  |

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Create-a-bug'></a> Create a bug
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
POST /api/v1/bug/
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Delete-a-bug'></a> Delete a bug
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
DELETE /api/v1/bug/
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| bugId | `string` |  |

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Get-all-bugs-of-a-team'></a> Get all bugs of a team
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
GET /api/v1/bug/all/:teamId
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Get-bug-with-id'></a> Get bug with id
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
GET /api/v1/bug/one/:id
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Update-bug-priority'></a> Update bug priority
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
PUT /api/v1/bug/priority
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| bugId | `string` |  |
| priorityNumber | `number` |  |

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Update-bug-status'></a> Update bug status
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
PUT /api/v1/bug/assign
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| bugId | `string` |  |
| status | `number` |  |

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

# <a name='Org'></a> Org

## <a name='Add-a-member-to-an-org'></a> Add a member to an org
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
POST /api/v1/org/addMember
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| orgId | `string` |  |
| userId | `string` |  |
| role | `string` |  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201
  { 
     message: "Added!"
   }
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Create-an-org'></a> Create an org
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
POST /api/v1/org/create
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| userId | `string` |  |
| orgName | `string` |  |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201
     { 
         "message": "Created!"
     }
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Delete-an-org'></a> Delete an org
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
DELETE /api/v1/org/
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| orgId | `string` |  |

## <a name='Get-all-members-of-an-org'></a> Get all members of an org
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
GET /api/v1/org/members/:orgId
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200
 [
     { 
       "firstName": "abc",
       "lastName": "name",
       "role": "dev"  
     }
 ]
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Get-all-orgs'></a> Get all orgs
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
GET /api/v1/org/all/:userId
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200
 [
     { 
       "orgId": "abc",
       "orgName": "name"
     }
 ]
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

# <a name='Team'></a> Team

## <a name='Create-a-team'></a> Create a team
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
POST /api/v1/team/
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| orgId | `string` |  |
| orgName | `string` |  |
| teamName | `string` |  |

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Delete-a-team'></a> Delete a team
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
DELETE /api/v1/team
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| orgId | `string` |  |

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Get-all-members-of-a-team'></a> Get all members of a team
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
GET /api/v1/team/members/:teamId
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200
 [
     { 
       "firstName": "abc",
       "lastName": "name",
       "role": "dev"  
     }
 ]
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Get-all-teams-of-the-user'></a> Get all teams of the user
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
GET /api/v1/team/all/:userId
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

## <a name='Get-team-with-id'></a> Get team with id
[Back to top](#top)

<p>Http-Only cookie is used over here to verify and decode JWT.</p>

```
GET /api/v1/team/one/:teamId
```

### Error response

#### Error response - `ServerError`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 500 | `json` |  |

