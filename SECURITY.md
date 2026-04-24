# Security Policy

## Reporting Security Vulnerabilities

**Do not open a public GitHub issue for security vulnerabilities.** 

Instead, please email security concerns to: **security@yourdomain.com**

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

We will respond within 48 hours and work with you to resolve the issue before public disclosure.

---

## Security Standards

This project follows OWASP and security best practices for web applications.

### Authentication & Authorization
- ✅ JWT-based stateless authentication
- ✅ Secure password hashing with bcryptjs
- ✅ HTTP-only cookies for token storage
- ✅ Protected routes via middleware
- ✅ Role-based access control ready
- ✅ Session management with expiration

### Data Protection
- ✅ Environment variables for secrets
- ✅ Prisma ORM for SQL injection prevention
- ✅ Input validation on all endpoints
- ✅ CORS configuration
- ✅ Rate limiting support

### API Security
- ✅ HTTPS enforced in production
- ✅ API route protection
- ✅ Request validation
- ✅ Error handling without info leakage
- ✅ API versioning ready

### Dependencies
- ✅ Regular dependency updates
- ✅ Security audit via `npm audit`
- ✅ Minimal production dependencies
- ✅ No unsafe dependencies

---

## Security Best Practices for Users

### Setup & Configuration

1. **Secure Environment Variables**
   ```bash
   # Generate strong JWT secret
   openssl rand -base64 32
   
   # Add to .env.local (never commit)
   NEXTAUTH_SECRET=your_generated_secret
   ```

2. **MongoDB Security**
   - Use strong, unique passwords
   - Restrict IP whitelist
   - Enable authentication
   - Use encrypted connections

3. **Cloudinary Security**
   - Keep API secret confidential
   - Use restricted API keys
   - Implement signed uploads
   - Regular key rotation

### Deployment Security

```bash
# Development
NODE_ENV=development
DEBUG=false

# Production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Security headers
# Configure in next.config.js or via Vercel
Cache-Control: no-store, must-revalidate
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Code Security

**Do's:**
- ✅ Use parameterized queries (Prisma handles this)
- ✅ Validate and sanitize all inputs
- ✅ Use HTTPS only
- ✅ Implement rate limiting
- ✅ Log security events
- ✅ Keep dependencies updated
- ✅ Use security headers
- ✅ Implement CORS properly

**Don'ts:**
- ❌ Don't store secrets in code
- ❌ Don't log sensitive data
- ❌ Don't disable CSRF protection
- ❌ Don't trust client-side validation
- ❌ Don't use outdated dependencies
- ❌ Don't expose error details to users
- ❌ Don't commit .env files
- ❌ Don't allow unvalidated redirects

---

## Dependency Security

### Check for Vulnerabilities
```bash
# Audit dependencies
npm audit

# Fix automatically
npm audit fix

# Check specific package
npm audit --omit=dev
```

### Keep Dependencies Updated
```bash
# Check outdated packages
npm outdated

# Update all packages (carefully)
npm update

# Update specific package
npm install package@latest
```

### Recommended Security Packages

For enhanced security, consider adding:
```json
{
  "helmet": "Rate limiting and security headers",
  "express-validator": "Input validation",
  "cors": "Cross-origin requests",
  "dotenv": "Environment variables (already included)"
}
```

---

## Common Vulnerabilities to Avoid

### 1. SQL Injection
✅ **Protected by Prisma** - Uses parameterized queries
```javascript
// Safe - Prisma handles parameterization
const user = await prisma.user.findUnique({
  where: { email: userInput }
});

// Unsafe - Don't construct queries with strings
// const query = `SELECT * FROM users WHERE email = '${email}'`
```

### 2. Cross-Site Scripting (XSS)
✅ **Protected by React** - Auto-escapes content
```jsx
// Safe - React escapes by default
<div>{userContent}</div>

// Unsafe - dangerouslySetInnerHTML
// <div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### 3. Cross-Site Request Forgery (CSRF)
✅ **Protected by Next.js** - Built-in CSRF protection
- Implement token validation for state-changing operations
- Use SameSite cookie attribute

### 4. Authentication Bypass
✅ **Protected by middleware** - All protected routes checked
```javascript
// Routes checked in middleware
const PROTECTED_ROUTES = ["/home", "/myblog"];
if (!authToken) {
  return NextResponse.redirect(new URL("/signup", request.url));
}
```

### 5. Exposed Secrets
✅ **Use environment variables** - Never in code
```bash
# .env.local (never commit)
NEXTAUTH_SECRET=secret_here
CLOUDINARY_API_SECRET=secret_here

# Code
const secret = process.env.NEXTAUTH_SECRET;
```

---

## Monitoring & Logging

### Security Events to Log
```javascript
// Unauthorized access attempts
console.warn(`[${timestamp}] Unauthorized access to ${route}`);

// Failed login attempts
console.warn(`[${timestamp}] Failed login: ${email}`);

// API errors
console.error(`[${timestamp}] API error: ${error.message}`);

// Sensitive operations
console.info(`[${timestamp}] User ${userId} deleted blog ${blogId}`);
```

### Log Best Practices
- ✅ Log security events
- ✅ Don't log sensitive data (passwords, tokens)
- ✅ Use structured logging
- ✅ Monitor logs for patterns
- ❌ Don't expose logs to users

---

## Infrastructure Security

### Vercel Deployment
- Automatic HTTPS
- DDoS protection
- Serverless isolation
- Automatic security updates

### Database Security
```javascript
// Prisma connection
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true

// MongoDB Atlas setup
1. Enable authentication
2. Restrict IP whitelist
3. Use encrypted connections
4. Enable audit logging
```

---

## Regular Security Checklist

- [ ] Run `npm audit` weekly
- [ ] Update dependencies monthly
- [ ] Review security logs
- [ ] Check environment variable configuration
- [ ] Verify API authentication
- [ ] Test middleware protection
- [ ] Review Cloudinary permissions
- [ ] Check MongoDB backups
- [ ] Audit user permissions
- [ ] Test error handling (no info leakage)

---

## Security Headers Configuration

Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains'
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline'"
        }
      ]
    }
  ]
}
```

---

## Response to Security Incidents

1. **Verification** - Confirm vulnerability exists
2. **Assessment** - Evaluate impact and severity
3. **Patching** - Develop and test fix
4. **Notification** - Inform affected users
5. **Release** - Deploy security update
6. **Disclosure** - Publish security advisory

---

## Version Policy

| Version | Security Updates |
|---------|-----------------|
| Latest | Full support |
| Previous | 6 months |
| Older | No support |

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Next.js Security](https://nextjs.org/docs/guides/security)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [Cloudinary Security](https://cloudinary.com/documentation/security)

---

## Contact

For security questions or concerns:
- 📧 Email: security@yourdomain.com
- 🔒 Private discussion: GitHub Security Advisory

---

**Last Updated:** 2024
**Version:** 1.0.0
