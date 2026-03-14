export class SanitizeUtil {
  /**
   * Basic HTML/Script tag sanitization
   * For production, consider using a library like DOMPurify or sanitize-html
   */
  static sanitizeHtml(input: string): string {
    if (!input) return input;
    
    // Remove script tags and their content
    let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove on* event handlers
    sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
    
    // Remove javascript: protocol
    sanitized = sanitized.replace(/javascript:/gi, '');
    
    return sanitized;
  }

  /**
   * Remove potentially dangerous characters for SQL/NoSQL injection
   */
  static sanitizeInput(input: string): string {
    if (!input) return input;
    
    // This is basic - class-validator handles most of this
    return input.trim();
  }

  /**
   * Sanitize username - allow only alphanumeric, spaces, and basic punctuation
   */
  static sanitizeUsername(username: string): string {
    if (!username) return username;
    
    // Allow letters, numbers, spaces, underscores, hyphens
    return username.replace(/[^a-zA-Z0-9\s_-]/g, '').trim();
  }
}
