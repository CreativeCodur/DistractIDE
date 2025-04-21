// This script provides fallback functionality for components that might be causing errors

// Wait for the page to load
window.addEventListener('DOMContentLoaded', function() {
  console.log('Fallback script loaded');
  
  // Check if the page is blank (only has the root div with no content)
  setTimeout(function() {
    const rootElement = document.getElementById('root');
    
    if (rootElement && (!rootElement.children || rootElement.children.length === 0)) {
      console.log('Detected blank page, applying fallbacks...');
      
      // Create a simple fallback UI
      const fallbackUI = document.createElement('div');
      fallbackUI.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      fallbackUI.style.maxWidth = '800px';
      fallbackUI.style.margin = '0 auto';
      fallbackUI.style.padding = '20px';
      
      fallbackUI.innerHTML = `
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #0ea5e9;">DistractIDE</h1>
          <p>We detected an issue with loading the application. Here are some options to fix it:</p>
          
          <h2>Troubleshooting Options</h2>
          <ul>
            <li><a href="/fix-icons.html" style="color: #0ea5e9;">Fix Icons Issue</a> - Fixes the most common problem</li>
            <li><a href="/debug.html" style="color: #0ea5e9;">Debug Page</a> - For advanced troubleshooting</li>
            <li><a href="#" id="clear-storage-btn" style="color: #0ea5e9;">Clear Browser Storage</a> - Reset all application data</li>
            <li><a href="/" style="color: #0ea5e9;">Reload Application</a> - Try loading the app again</li>
          </ul>
          
          <div id="error-details" style="margin-top: 20px; display: none;">
            <h3>Error Details</h3>
            <pre id="error-message" style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto;"></pre>
          </div>
        </div>
      `;
      
      // Replace the root content with our fallback UI
      rootElement.innerHTML = '';
      rootElement.appendChild(fallbackUI);
      
      // Add event listener for the clear storage button
      document.getElementById('clear-storage-btn').addEventListener('click', function(e) {
        e.preventDefault();
        try {
          localStorage.clear();
          sessionStorage.clear();
          alert('Browser storage cleared successfully. The page will now reload.');
          window.location.reload();
        } catch (error) {
          alert('Error clearing storage: ' + error.message);
        }
      });
      
      // Check for errors in the console and display them
      if (window.console && console.error) {
        const originalConsoleError = console.error;
        console.error = function() {
          // Call the original console.error
          originalConsoleError.apply(console, arguments);
          
          // Display the error in our UI
          const errorDetails = document.getElementById('error-details');
          const errorMessage = document.getElementById('error-message');
          
          if (errorDetails && errorMessage) {
            errorDetails.style.display = 'block';
            
            // Convert arguments to string
            let errorText = Array.from(arguments).map(arg => {
              if (typeof arg === 'object') {
                try {
                  return JSON.stringify(arg, null, 2);
                } catch (e) {
                  return String(arg);
                }
              }
              return String(arg);
            }).join(' ');
            
            errorMessage.textContent += errorText + '\n';
          }
        };
      }
    }
  }, 2000); // Wait 2 seconds to check if the page is blank
});
