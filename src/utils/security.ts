/**
 * Security utility functions for DistractIDE
 * These functions help prevent common security vulnerabilities
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input The user input to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  // Replace potentially dangerous characters with HTML entities
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Validates input against a regex pattern
 * @param input The input to validate
 * @param pattern The regex pattern to validate against
 * @returns True if valid, false otherwise
 */
export const validateInput = (input: string, pattern: RegExp): boolean => {
  return pattern.test(input);
};

/**
 * Validates D-Script input to ensure it only contains allowed commands
 * @param input The D-Script input to validate
 * @returns True if valid, false otherwise
 */
export const validateDScriptInput = (input: string): boolean => {
  // Only allow alphanumeric characters, spaces, and newlines
  const allowedPattern = /^[A-Z\s\n]+$/;
  return allowedPattern.test(input);
};

/**
 * Creates a nonce for CSP
 * @returns A random nonce string
 */
export const generateNonce = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Prevents prototype pollution attacks
 * @param obj The object to freeze
 * @returns The frozen object
 */
export const preventPrototypePollution = <T extends object>(obj: T): T => {
  return Object.freeze(obj);
};

/**
 * Validates a URL to prevent open redirects
 * @param url The URL to validate
 * @returns True if the URL is safe, false otherwise
 */
export const validateUrl = (url: string): boolean => {
  // Only allow relative URLs or URLs to trusted domains
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return true;
  }
  
  try {
    const urlObj = new URL(url);
    const trustedDomains = ['distractide.com', 'localhost'];
    return trustedDomains.includes(urlObj.hostname);
  } catch (e) {
    return false;
  }
};
