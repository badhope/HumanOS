# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.5.x   | :white_check_mark: |
| 1.0.x   | :x:                |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of HumanOS seriously. If you have discovered a security vulnerability, we appreciate your help in disclosing it to us in a responsible manner.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **GitHub Security Advisory** (Preferred)
   - Go to the [Security Advisories](https://github.com/badhope/HumanOS/security/advisories) page
   - Click "Report a vulnerability"
   - Fill out the form with details about the vulnerability

2. **Email**
   - Send an email to: security@humanos.dev
   - Include "SECURITY" in the subject line
   - Provide a detailed description of the vulnerability

### What to Include

Please include the following information in your report:

- **Description**: A clear description of the vulnerability
- **Impact**: What kind of vulnerability is it? (e.g., XSS, CSRF, data breach)
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Proof of Concept**: If possible, provide a proof of concept
- **Suggested Fix**: If you have suggestions for fixing the issue
- **Your Contact Info**: How we can reach you for follow-up questions

### Response Timeline

We are committed to responding promptly to security reports:

| Stage | Timeline |
|-------|----------|
| Initial Response | Within 48 hours |
| Vulnerability Confirmation | Within 7 days |
| Fix Development | Depends on severity |
| Patch Release | Within 30 days (for critical issues) |

### Disclosure Policy

We follow the principle of **Coordinated Vulnerability Disclosure**:

1. We will acknowledge receipt of your report within 48 hours
2. We will confirm the vulnerability and determine its severity
3. We will develop and test a fix
4. We will release a patch and publish a security advisory
5. We will credit you in the advisory (unless you prefer to remain anonymous)

### Security Best Practices

When using HumanOS, we recommend:

- **Keep Updated**: Always use the latest version
- **Local Data**: Remember that all data is stored locally in your browser
- **Private Browsing**: Use private/incognito mode for sensitive assessments
- **Clear Data**: Clear browser data if using a shared computer
- **Report Issues**: Report any suspicious behavior immediately

### Security Features

HumanOS implements several security measures:

- **No Server Communication**: All data stays in your browser
- **No Tracking**: Zero analytics or tracking code
- **No Cookies**: We don't use cookies for tracking
- **Open Source**: Code is fully auditable
- **Content Security Policy**: Strict CSP headers (when deployed)
- **HTTPS Only**: Encrypted connections required (when deployed)

### Known Security Considerations

1. **Local Storage**: Data is stored in browser's localStorage, which is accessible to:
   - The user
   - Browser extensions
   - Anyone with physical access to the device

2. **Browser Security**: We rely on browser security features. Using an outdated browser may expose vulnerabilities.

3. **Shared Devices**: If using on a shared device, remember to clear your data after use.

## Security Updates

Security updates will be announced through:

- [GitHub Security Advisories](https://github.com/badhope/HumanOS/security/advisories)
- [GitHub Releases](https://github.com/badhope/HumanOS/releases)
- [CHANGELOG.md](./CHANGELOG.md)

## Contact

For any security-related questions or concerns:

- **Security Email**: security@humanos.dev
- **GitHub Security**: [Security Advisories](https://github.com/badhope/HumanOS/security/advisories)

---

<div align="center">

**Thank you for helping keep HumanOS secure!**

</div>
