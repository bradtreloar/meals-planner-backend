# Meals Planner backend

Database API for a simple meals planner app, made with Node.js and Express.

This is a study project, and is a work-in-progress.

## Planned features

- Postgres database, using Sequelize ORM.
- OAuth 2.0 authentication using JWT access tokens.
- Password-based login and signup.
- Anonymous user signup with email verification.
- GraphQL API to query data.

## Planned data model

### User

#### Attributes

| Name            | Type     | Description                        |
| :-------------- | :------- | :--------------------------------- |
| email           | text     | The user's email address           |
| password        | text     | The user's password                |
| emailVerifiedAt | datetime | When the user's email was verified |

#### Relationships

| Name    | Type    | Description        |
| :------ | :------ | :----------------- |
| recipes | hasMany | The user's recipes |
| meals   | hasMany | The user's meals   |

### Recipe

#### Attributes

| Name | Type | Description            |
| :--- | :--- | :--------------------- |
| name | text | The name of the recipe |

#### Relationships

| Name | Type      | Description        |
| :--- | :-------- | :----------------- |
| user | belongsTo | The recipe's owner |

### Meal

#### Attributes

| Name | Type | Description          |
| :--- | :--- | :------------------- |
| date | date | The date of the meal |

#### Relationships

| Name   | Type      | Description       |
| :----- | :-------- | :---------------- |
| recipe | hasOne    | The meal's recipe |
| user   | belongsTo | The meal's owner  |
