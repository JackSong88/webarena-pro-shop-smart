## OneStopShop Setup Guide

### 1) Clone the repo
```
git clone https://github.com/JackSong88/webarena-jbb-magento.git
cd webarena-jbb-magento
``` 

### 2) Create .env file
- Create a [Clerk](https://clerk.com) application for authentication and copy keys into `.env`
```
DATABASE_URL="mysql://app:app@db:3306/onestopshop"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

NEXT_PUBLIC_APP_URL=http://localhost:3000/

UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
```

### 3) Run the environment
- Start the environment through docker:
```
docker compose up
```
- It will automatically seed the database with stores and products and when ready, can be accessed through `http://localhost:3000/` or the user specific `NEXT_PUBLIC_APP_URL`.