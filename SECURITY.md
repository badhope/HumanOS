# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | ✅ Currently Active |
| 1.x.x   | ⚠️ Security fixes only |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email us at: `security@humandos.io` (or use GitHub Security Advisories)
3. Include the following information:
   - Type of issue (e.g., XSS, CSRF, data leakage)
   - Full paths of source file(s) related to the vulnerability
   - Location of the affected source code (tag/branch/commit)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact assessment of the vulnerability

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Resolution Timeline**: Depending on severity
  - Critical: 7 days
  - High: 14 days
  - Medium: 30 days
  - Low: Next release

## Security Best Practices (For Users)

### Data Storage

- All assessment data is stored locally in your browser's LocalStorage
- No personal data is transmitted to external servers
- Clear browser data to reset all stored information

### Browser Extensions

- Some browser extensions may interfere with functionality
- Disable extensions if you experience unexpected behavior

### Public Computers

- Avoid using HumanOS on public or shared computers
- Clear browser data after use on public devices

## Security Features

### Implemented Protections

- ✅ Input sanitization for all user inputs
- ✅ Content Security Policy headers
- ✅ XSS prevention through React's built-in protections
- ✅ CSRF tokens for state-changing operations
- ✅ Secure random ID generation (crypto.randomUUID)
- ✅ HTTPS enforcement in production

### Known Limitations

- ⚠️ LocalStorage data is accessible to browser extensions
- ⚠️ Data persists until explicitly cleared
- ⚠️ No encryption of stored data (by design for transparency)

## Updates

Security updates will be released as patch versions. Major security changes will be documented in CHANGELOG.md.

---

Thank you for helping keep HumanOS and its users safe!
