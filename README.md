# Saraha App

## Run
    npm install
    cp .env.example .env   # عدّل القيم
    npm start

## Endpoints
| Method | Route | Auth |
|---|---|---|
| POST | /users/signup | - |
| POST | /users/login | - |
| GET | /users/refresh-token | refresh token |
| GET | /users/profile | Bearer |
| GET | /users/share/:id | - |
| PATCH | /users/update-password | Bearer |
| PATCH | /users/update | Bearer |
| DELETE | /users | Bearer |
| POST | /messages/send | - (anonymous) |
| GET | /messages | Bearer |
| GET | /messages/:id | Bearer |
| DELETE | /messages/:id | Bearer |

Header: `Authorization: Bearer <accessToken>`
