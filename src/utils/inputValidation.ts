export interface ValidationResult {
  isValid: boolean
  sanitizedValue: string
  errors: string[]
}

export class InputValidator {
  private static readonly MAX_LENGTH = 1000
  private static readonly MIN_LENGTH = 1
  private static readonly DANGEROUS_PATTERNS = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:/gi,
    /vbscript:/gi,
  ]

  static validateText(input: string, options: {
    maxLength?: number
    minLength?: number
    allowHtml?: boolean
    required?: boolean
  } = {}): ValidationResult {
    const errors: string[] = []
    const maxLength = options.maxLength || this.MAX_LENGTH
    const minLength = options.minLength || this.MIN_LENGTH
    const allowHtml = options.allowHtml || false
    const required = options.required !== false

    if (required && (!input || input.trim().length === 0)) {
      return {
        isValid: false,
        sanitizedValue: '',
        errors: ['此字段为必填项']
      }
    }

    if (!input) {
      return {
        isValid: true,
        sanitizedValue: '',
        errors: []
      }
    }

    if (input.length < minLength) {
      errors.push(`输入长度不能少于${minLength}个字符`)
    }

    if (input.length > maxLength) {
      errors.push(`输入长度不能超过${maxLength}个字符`)
    }

    if (!allowHtml) {
      this.DANGEROUS_PATTERNS.forEach(pattern => {
        if (pattern.test(input)) {
          errors.push('输入包含不允许的内容')
        }
      })
    }

    const sanitizedValue = this.sanitize(input, allowHtml)

    return {
      isValid: errors.length === 0,
      sanitizedValue,
      errors
    }
  }

  static validateEmail(email: string): ValidationResult {
    const errors: string[] = []
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || email.trim().length === 0) {
      return {
        isValid: false,
        sanitizedValue: '',
        errors: ['邮箱地址为必填项']
      }
    }

    if (!emailPattern.test(email)) {
      errors.push('请输入有效的邮箱地址')
    }

    if (email.length > 254) {
      errors.push('邮箱地址过长')
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue: email.toLowerCase().trim(),
      errors
    }
  }

  static validatePhone(phone: string): ValidationResult {
    const errors: string[] = []
    const phonePattern = /^1[3-9]\d{9}$/

    if (!phone || phone.trim().length === 0) {
      return {
        isValid: true,
        sanitizedValue: '',
        errors: []
      }
    }

    const cleaned = phone.replace(/\D/g, '')

    if (!phonePattern.test(cleaned)) {
      errors.push('请输入有效的手机号码')
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue: cleaned,
      errors
    }
  }

  static validateNumber(input: string, options: {
    min?: number
    max?: number
    integer?: boolean
  } = {}): ValidationResult {
    const errors: string[] = []
    const { min, max, integer = false } = options

    if (!input || input.trim().length === 0) {
      return {
        isValid: false,
        sanitizedValue: '',
        errors: ['请输入数字']
      }
    }

    const number = parseFloat(input)

    if (isNaN(number)) {
      errors.push('请输入有效的数字')
    }

    if (integer && !Number.isInteger(number)) {
      errors.push('请输入整数')
    }

    if (min !== undefined && number < min) {
      errors.push(`数字不能小于${min}`)
    }

    if (max !== undefined && number > max) {
      errors.push(`数字不能大于${max}`)
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue: number.toString(),
      errors
    }
  }

  static validateSelect(value: string, allowedValues: string[]): ValidationResult {
    const errors: string[] = []

    if (!value || value.trim().length === 0) {
      return {
        isValid: false,
        sanitizedValue: '',
        errors: ['请选择一个选项']
      }
    }

    if (!allowedValues.includes(value)) {
      errors.push('选择的值无效')
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue: value,
      errors
    }
  }

  private static sanitize(input: string, allowHtml: boolean): string {
    let sanitized = input.trim()

    if (!allowHtml) {
      sanitized = sanitized
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
    }

    return sanitized
  }

  static sanitizeHtml(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
  }

  static escapeHtml(input: string): string {
    const htmlEntities: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return input.replace(/[&<>"']/g, char => htmlEntities[char])
  }

  static validatePassword(password: string): ValidationResult {
    const errors: string[] = []

    if (!password || password.length === 0) {
      return {
        isValid: false,
        sanitizedValue: '',
        errors: ['密码为必填项']
      }
    }

    if (password.length < 8) {
      errors.push('密码长度至少为8个字符')
    }

    if (password.length > 128) {
      errors.push('密码长度不能超过128个字符')
    }

    if (!/[a-z]/.test(password)) {
      errors.push('密码必须包含至少一个小写字母')
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('密码必须包含至少一个大写字母')
    }

    if (!/\d/.test(password)) {
      errors.push('密码必须包含至少一个数字')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('密码必须包含至少一个特殊字符')
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue: password,
      errors
    }
  }

  static validateUrl(url: string): ValidationResult {
    const errors: string[] = []

    if (!url || url.trim().length === 0) {
      return {
        isValid: true,
        sanitizedValue: '',
        errors: []
      }
    }

    try {
      const parsedUrl = new URL(url)
      
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        errors.push('只允许HTTP或HTTPS协议')
      }

      if (url.length > 2048) {
        errors.push('URL长度过长')
      }
    } catch {
      errors.push('请输入有效的URL')
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue: url.trim(),
      errors
    }
  }

  static validateDate(dateString: string): ValidationResult {
    const errors: string[] = []

    if (!dateString || dateString.trim().length === 0) {
      return {
        isValid: false,
        sanitizedValue: '',
        errors: ['日期为必填项']
      }
    }

    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      errors.push('请输入有效的日期')
    }

    const now = new Date()
    const minDate = new Date('1900-01-01')
    const maxDate = new Date(now.getFullYear() + 100, 11, 31)

    if (date < minDate || date > maxDate) {
      errors.push('日期超出有效范围')
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue: dateString,
      errors
    }
  }
}

export function useInputValidation() {
  const validateAndSanitize = (value: string, type: 'text' | 'email' | 'phone' | 'number' | 'url' | 'password' = 'text', options?: any) => {
    switch (type) {
      case 'email':
        return InputValidator.validateEmail(value)
      case 'phone':
        return InputValidator.validatePhone(value)
      case 'number':
        return InputValidator.validateNumber(value, options)
      case 'url':
        return InputValidator.validateUrl(value)
      case 'password':
        return InputValidator.validatePassword(value)
      default:
        return InputValidator.validateText(value, options)
    }
  }

  return { validateAndSanitize, InputValidator }
}
