/**
 * CSRF Protection Middleware
 * 
 * This middleware adds CSRF protection to the application.
 * It generates a CSRF token and validates it on form submissions.
 */

// Generate a random CSRF token
export const generateCsrfToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Store the CSRF token in localStorage
export const storeCsrfToken = (): string => {
  const token = generateCsrfToken();
  localStorage.setItem('csrf_token', token);
  return token;
};

// Get the CSRF token from localStorage
export const getCsrfToken = (): string => {
  let token = localStorage.getItem('csrf_token');
  
  // If no token exists, generate one
  if (!token) {
    token = storeCsrfToken();
  }
  
  return token;
};

// Validate a CSRF token
export const validateCsrfToken = (token: string): boolean => {
  const storedToken = localStorage.getItem('csrf_token');
  return token === storedToken;
};

// Add CSRF token to a form
export const addCsrfTokenToForm = (formData: FormData): FormData => {
  formData.append('csrf_token', getCsrfToken());
  return formData;
};

// Initialize CSRF protection
export const initCsrfProtection = (): void => {
  // Generate a token on page load
  if (!localStorage.getItem('csrf_token')) {
    storeCsrfToken();
  }
  
  // Add CSRF token to all fetch requests
  const originalFetch = window.fetch;
  window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    if (init && init.method && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(init.method.toUpperCase())) {
      // Add CSRF token to headers
      const headers = new Headers(init.headers || {});
      headers.append('X-CSRF-Token', getCsrfToken());
      
      // Update init object with new headers
      init.headers = headers;
    }
    
    return originalFetch.call(this, input, init);
  };
};
