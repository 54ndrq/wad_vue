# wad_vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Backend Setup

Install dependencies:
```
cd backend
npm install
```

(Based on Week 13 practical session)

Create a PostgreSQL database using pgAdmin:

Open pgAdmin → Servers → PostgreSQL → Databases → Right-click → Create

Database name: wad_hw4

(no manual tables)

Create a .env file in backend/ :
```
DB_USER=postgres
DB_NAME=wad_hw4
DB_PASSWORD=your_local_password
```

Run the backend:
```
node server.js
```


