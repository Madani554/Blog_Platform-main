# Blog Platform

> A full-stack modern blogging platform for content creators to publish, manage, and share their work seamlessly.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Blog Platform is a production-ready blogging application designed for modern content creators. It provides a secure, scalable foundation with an intuitive interface for managing blog content with image uploads, user authentication, and full CRUD operations.

### Key Highlights
- ✅ Server-side authentication with JWT
- ✅ Cloudinary image optimization
- ✅ Prisma ORM for type-safe database operations
- ✅ Tailwind CSS with shadcn/ui components
- ✅ Middleware-based route protection
- ✅ RESTful API architecture

---

## Features

### 🔐 Authentication & Security
- User registration and secure login
- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Persistent session management

### 📝 Blog Management
- Create, read, update, and delete blog posts
- Rich content editor support
- Draft and published states
- Blog metadata (title, description, cover image)

### 👤 User Profile
- Profile information management
- User dashboard
- Content statistics
- Profile customization

### 🖼 Media Management
- Cloudinary integration for image hosting
- Automatic image optimization
- Cover image uploads
- CDN delivery

### ⚡ Additional Features
- Responsive design
- Dark mode support
- Search functionality
- Error handling and validation

---

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Axios** - HTTP client

### Backend
- **Next.js API Routes** - Serverless functions
- **Node.js** - Runtime environment
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing

### Database & ORM
- **MongoDB** - NoSQL database
- **Prisma** - Type-safe ORM

### Cloud Services
- **Cloudinary** - Image hosting and optimization

### Development Tools
- **TypeScript** - Type safety (config ready)
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **pnpm** - Package manager

---

## Project Structure

```
blog-platform/
├── app/
│   ├── api/                  # Next.js API routes
│   │   ├── login/
│   │   ├── signup/
│   │   ├── post/
│   │   └── search/
│   ├── (routes)/             # Page routes
│   │   ├── home/
│   │   ├── myblog/
│   │   ├── login/
│   │   └── signup/
│   ├── layout.js             # Root layout
│   └── globals.css           # Global styles
├── components/               # Reusable UI components
│   ├── BlogCard.jsx
│   ├── BlogEditor.jsx
│   └── ...
├── lib/
│   ├── utils.js              # Utility functions
│   └── auth.js               # Auth helpers
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── public/                   # Static assets
├── middleware.js             # Route protection middleware
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 or **pnpm** ≥ 8.0.0
- **MongoDB** database (local or Atlas)
- **Cloudinary** account

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/blog-platform.git
   cd blog-platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   See [Environment Configuration](#environment-configuration) section.

4. **Initialize Database**
   ```bash
   npm run db:push
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Access Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Configuration

Create a `.env.local` file in the root directory. Copy from `.env.example`:

```env
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/blog-platform

# Authentication
NEXTAUTH_SECRET=your_jwt_secret_key_here_min_32_chars

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Environment Variables Guide

| Variable | Type | Description |
|----------|------|-------------|
| `DATABASE_URL` | String | MongoDB connection string |
| `NEXTAUTH_SECRET` | String | JWT secret (min 32 characters) |
| `CLOUDINARY_CLOUD_NAME` | String | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | String | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | String | Cloudinary API secret |
| `NODE_ENV` | String | Environment (development/production) |
| `NEXT_PUBLIC_APP_URL` | String | Application base URL |

⚠️ **Never commit `.env.local` to version control**

---

## Usage

### Creating a Blog Post
1. Login to your account
2. Navigate to "Create Post"
3. Fill in title, description, and content
4. Upload cover image
5. Click "Publish"

### Editing a Post
1. Go to "My Blogs"
2. Click "Edit" on the desired post
3. Make changes
4. Save changes

### Deleting a Post
1. Go to "My Blogs"
2. Click "Delete" on the post
3. Confirm deletion

### Searching Blogs
1. Use the search bar on the home page
2. Enter keywords, title, or author name
3. Browse results

---

## API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /api/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}

Response: 201 Created
{
  "message": "User created successfully",
  "token": "jwt_token_here"
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### Blog Endpoints

#### Get All Posts
```http
GET /api/post

Response: 200 OK
{
  "posts": [...]
}
```

#### Get Single Post
```http
GET /api/post/:id

Response: 200 OK
{
  "post": {...}
}
```

#### Create Post
```http
POST /api/post
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Blog Title",
  "description": "Short description",
  "content": "Full content",
  "coverImage": "cloudinary_url"
}

Response: 201 Created
```

#### Update Post
```http
PUT /api/post/:id
Authorization: Bearer <token>
```

#### Delete Post
```http
DELETE /api/post/:id
Authorization: Bearer <token>

Response: 200 OK
```

---

## Best Practices

### Code Quality
- Run linting before committing: `npm run lint`
- Format code: `npm run format`
- Type-check code: `npm run type-check`

### Security
- Always validate user input on both frontend and backend
- Use environment variables for sensitive data
- Implement rate limiting for API routes
- Sanitize user content before storing
- Keep dependencies updated: `npm audit`

### Performance
- Use Next.js Image Optimization
- Implement caching strategies
- Optimize database queries with Prisma
- Lazy load components where appropriate

### Database
- Keep migrations tracked in version control
- Test migrations on staging before production
- Use Prisma Studio for debugging: `npx prisma studio`
- Implement proper indexing on frequently queried fields

---

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Deploy to Other Platforms
- Set `NODE_ENV=production`
- Build: `npm run build`
- Start: `npm run start`
- Ensure MongoDB and Cloudinary credentials are set

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push to branch**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

### Code Standards
- Follow existing code style
- Write meaningful commit messages
- Test changes before submitting PR
- Update documentation as needed

---

## Roadmap

- [ ] Comments system
- [ ] Likes and reactions
- [ ] Advanced search with filters
- [ ] Categories and tags
- [ ] Admin dashboard
- [ ] Dark mode toggle
- [ ] Markdown editor support
- [ ] Email notifications
- [ ] Social sharing features
- [ ] Analytics dashboard

---

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string format
- Check whitelist IP in MongoDB Atlas
- Ensure credentials are correct

### Cloudinary Upload Errors
- Verify API credentials
- Check cloud name
- Ensure upload folder exists

### Authentication Errors
- Clear browser cookies
- Check JWT secret in `.env.local`
- Verify token expiration

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support & Contact

For questions, suggestions, or bug reports:
- 📧 Email: support@yourdomain.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/blog-platform/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/blog-platform/discussions)

---

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - ORM
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Image service

---

⭐ If you find this project helpful, please consider giving it a star on GitHub!
