# Kicker Master

## Requirements

* MySQL
* Node.js
* Sequelize CLI

## Run server

```
# Install yarn package manager
npm install --global yarn

# Install Sequelize CLI globally
npm install --global sequelize-cli

# Install dependencies
yarn install

# Apply database migrations
sequelize db:migrate

# Populate database with default data
sequelize db:seed:all

# Run server
yarn start

# Check http://localhost:8080/api/users
```

## Run web app

```
# Go to frontend folder
cd ./frontend

# Install dependencies
yarn install

# Run app
yarn start

# Check http://localhost:3000
```
