# Item Locator API

A simple API to keep track of your stuff. It's built with TypeScript, Express, and Prisma.

## Setup Project

Clone the repo

```
git clone https://github.com/salassep/item-locator-api.git
```

Create .env file

```env
DATABASE_URL="mysql://root:@localhost:3306/item_locator"
```

Install dependencies

```
npm install
```

Migrate database schema

```
npx prisma migration dev
npx prisma generate
```

Build project

```
npm run build
```

Run application

```
npm start
```

## API Spec

- [User API Spec](docs/user.md)
- [Item API Spec](docs/item.md)
- [Location API Spec](docs/location.md)
