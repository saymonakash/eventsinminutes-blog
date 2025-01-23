# EventsInMinutes Blog

## Introduction

This is the repository for the EventsInMinutes Blog project. Follow the instructions below to set up and run the project locally.

## Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or yarn (version 1.x or higher)
- Git

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/saymonakash/eventsinminutes-blog.git
   cd eventsinminutes-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## Running the Project Locally

1. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the application running. The application redirects to `/post` because there is no content on the home/index page for now.

## Building for Production

1. Build the project:

   ```bash
   npm run build
   ```

   or

   ```bash
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## File Directory

```
eventsinminutes-blog/
├── .nuxt/                # Nuxt.js build directory
├── assets/               # Asset files
├── components/           # Vue.js
│   ├── PostDetails/      # Components for post details
│   │   └── CommentsSection.vue  # Comments section component
│   ├── PostPage/         # Components for post page
│   │   ├── FeaturedCard.vue      # Featured post card component
│   │   ├── PostsHeader.vue       # Header for posts page
│   │   └── SectionArticles.vue   # Section for articles
│   └── Logo.vue          # Logo component
├── middleware/           # Middleware for routes
│   └── auth.js           # Authentication middleware
├── pages/                # Page components
│   ├── index.vue         # Home page
│   └── post/             # Posts-related pages
│       ├── index.vue     # Posts listing page
│       ├── _id.vue       # Single post page
│       └── category/     # Category-related pages
│           └── [name].vue  # Posts by category page
├── nuxt.config.js        # Nuxt.js configuration file
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Login Information
- Login URL: [http://localhost:3000/login](http://localhost:3000/login)
- Email: example@gmail.com
- Password: password

## Supabase Information

To connect to Supabase, use the following environment variables:

```env
SUPABASE_URL=https://hqewnfyxrehjgkrmsbep.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZXduZnl4cmVoamdrcm1zYmVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0OTkwNTAsImV4cCI6MjA1MzA3NTA1MH0.HzMGGbabEqCFL1BGS1wQ1XKU4cjsjjVyyUWmn_Fbo5A
```



## Middleware Protection
- For the Admin page when the user is not logged in (visitors can't access the admin page without logging in).
- For the Login page when the user is logged in (users can't access the login page after successfully logging in).

## Quick URLs
- [http://localhost:3000/login](http://localhost:3000/login)
- [http://localhost:3000/admin](http://localhost:3000/admin)
- [http://localhost:3000/post](http://localhost:3000/post)
- [http://localhost:3000/post/44f7686c-3874-4984-b942-3ca8c288c3bf](http://localhost:3000/post/44f7686c-3874-4984-b942-3ca8c288c3bf)
- [http://localhost:3000/post/category/corporate-events](http://localhost:3000/post/category/corporate-events)


