# Contributing to Blog Platform

First off, thank you for considering contributing to Blog Platform! It's people like you that make this project such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check if the bug has already been reported. When you're creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**
- **Include your environment details** (OS, Node version, MongoDB version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and the expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Follow the JavaScript/TypeScript style guide below
- Include appropriate test cases
- Update documentation as needed
- End all files with a newline
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")

---

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (local or Atlas)
- Cloudinary account

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   click "Fork" button on GitHub
   ```

2. **Clone your fork locally**
   ```bash
   git clone https://github.com/YOUR-USERNAME/blog-platform.git
   cd blog-platform
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original-owner/blog-platform.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create environment file**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your MongoDB and Cloudinary credentials
   ```

6. **Initialize database**
   ```bash
   npm run db:push
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```

---

## Commit Messages

Follow the Conventional Commits specification:

```
type(scope): subject

body

footer
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, etc.

### Examples
```
feat(blog): add markdown editor support
fix(auth): prevent concurrent login attempts
docs(readme): update installation instructions
refactor(api): simplify error handling
```

---

## Style Guide

### JavaScript/TypeScript

**Naming Conventions**
```javascript
// Variables and functions: camelCase
const blogTitle = "My Blog";
function getUserProfile() { }

// Classes and Components: PascalCase
class BlogManager { }
function BlogCard({ title }) { }

// Constants: UPPER_SNAKE_CASE
const MAX_UPLOAD_SIZE = 5242880; // 5MB
const API_TIMEOUT = 30000;
```

**Code Style**
```javascript
// Use const by default, let when needed, avoid var
const value = 100;
let counter = 0;

// Use template literals
const greeting = `Hello, ${name}!`;

// Use arrow functions
const sum = (a, b) => a + b;

// Use async/await
async function fetchPost(id) {
  try {
    const response = await fetch(`/api/post/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

// Use destructuring
const { title, author } = blog;
const [first, second] = array;

// Return early
function validateEmail(email) {
  if (!email.includes("@")) return false;
  if (email.length < 5) return false;
  return true;
}
```

**Component Pattern (React)**
```jsx
/**
 * BlogCard component
 * Displays a blog post preview
 * @param {Object} props - Component props
 * @param {string} props.title - Blog title
 * @param {string} props.excerpt - Blog excerpt
 * @returns {JSX.Element} Blog card component
 */
export function BlogCard({ title, excerpt }) {
  return (
    <div className="blog-card">
      <h3>{title}</h3>
      <p>{excerpt}</p>
    </div>
  );
}
```

---

## Testing

- Write tests for new features
- Ensure all tests pass: `npm test`
- Aim for >80% code coverage for new features
- Use descriptive test names

```javascript
describe("BlogCard", () => {
  it("should render blog title", () => {
    // test implementation
  });

  it("should handle missing cover image gracefully", () => {
    // test implementation
  });
});
```

---

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments to functions
- Document complex logic inline
- Update API documentation for new endpoints

```javascript
/**
 * Validates blog post data
 * @param {Object} post - Blog post object
 * @param {string} post.title - Post title (required)
 * @param {string} post.content - Post content (required)
 * @param {string} post.coverImage - Cover image URL (optional)
 * @returns {Object} { isValid: boolean, errors: string[] }
 * @throws {Error} If post is null or undefined
 */
function validatePost(post) {
  // implementation
}
```

---

## Pull Request Process

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

3. **Create Pull Request**
   - Clear description of changes
   - Link related issues
   - Screenshots for UI changes
   - List any breaking changes

4. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   Describe testing performed

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

5. **Address Review Comments**
   - Make requested changes
   - Push updates (no force push)
   - Mark conversations as resolved

---

## Project Structure Guidelines

When adding new features:

```
New Feature
├── Component (if UI)
├── API Route (if backend)
├── Utility functions
├── Tests
└── Documentation
```

---

## Performance Guidelines

- Avoid unnecessary re-renders
- Use lazy loading for images
- Optimize database queries
- Monitor bundle size
- Test on slow networks

```javascript
// Good: Memoize expensive operations
const memoizedValue = useMemo(() => 
  expensiveCalculation(a, b), [a, b]
);

// Good: Lazy load components
const HeavyComponent = lazy(() => 
  import('./HeavyComponent')
);

// Avoid: Unnecessary renders
// Bad
function Blog() {
  const data = fetchData(); // Called on every render
  return <div>{data}</div>;
}

// Good
function Blog() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  return <div>{data}</div>;
}
```

---

## Security Guidelines

- Never commit secrets or API keys
- Use environment variables
- Validate user input
- Sanitize output
- Use parameterized queries (Prisma does this)
- Keep dependencies updated
- Report security issues privately

---

## Need Help?

- Check existing issues and discussions
- Read the documentation
- Ask in GitHub Discussions
- Contact maintainers

---

## License

By contributing to Blog Platform, you agree that your contributions will be licensed under its MIT License.

---

Thank you for contributing to Blog Platform! 🎉
