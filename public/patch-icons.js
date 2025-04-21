// This script patches the missing icons in react-icons/fi
console.log('Icon patch script loaded');

// Create a function to patch the module system
(function patchModuleSystem() {
  // Store the original import function
  const originalImport = window.import;
  
  // Create mock components for the missing icons
  const mockIcons = {
    // Mock FiBrain component
    FiBrain: function FiBrain(props) {
      return {
        $$typeof: Symbol.for('react.element'),
        type: 'svg',
        key: null,
        ref: null,
        props: {
          ...props,
          xmlns: "http://www.w3.org/2000/svg",
          width: props.size || 24,
          height: props.size || 24,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            {
              $$typeof: Symbol.for('react.element'),
              type: 'circle',
              props: { cx: 12, cy: 8, r: 5 }
            },
            {
              $$typeof: Symbol.for('react.element'),
              type: 'path',
              props: { d: "M12 13v8" }
            },
            {
              $$typeof: Symbol.for('react.element'),
              type: 'path',
              props: { d: "M9 18h6" }
            }
          ]
        }
      };
    },
    
    // Mock FiGamepad component
    FiGamepad: function FiGamepad(props) {
      return {
        $$typeof: Symbol.for('react.element'),
        type: 'svg',
        key: null,
        ref: null,
        props: {
          ...props,
          xmlns: "http://www.w3.org/2000/svg",
          width: props.size || 24,
          height: props.size || 24,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            {
              $$typeof: Symbol.for('react.element'),
              type: 'rect',
              props: { x: 2, y: 6, width: 20, height: 12, rx: 2 }
            },
            {
              $$typeof: Symbol.for('react.element'),
              type: 'line',
              props: { x1: 6, y1: 12, x2: 10, y2: 12 }
            },
            {
              $$typeof: Symbol.for('react.element'),
              type: 'line',
              props: { x1: 8, y1: 10, x2: 8, y2: 14 }
            },
            {
              $$typeof: Symbol.for('react.element'),
              type: 'circle',
              props: { cx: 16, cy: 12, r: 1 }
            }
          ]
        }
      };
    },
    
    // Mock FiPenTool component
    FiPenTool: function FiPenTool(props) {
      return {
        $$typeof: Symbol.for('react.element'),
        type: 'svg',
        key: null,
        ref: null,
        props: {
          ...props,
          xmlns: "http://www.w3.org/2000/svg",
          width: props.size || 24,
          height: props.size || 24,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            {
              $$typeof: Symbol.for('react.element'),
              type: 'path',
              props: { d: "M12 19l7-7 3 3-7 7-3-3z" }
            },
            {
              $$typeof: Symbol.for('react.element'),
              type: 'path',
              props: { d: "M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" }
            }
          ]
        }
      };
    }
  };
  
  // Create a proxy for the import function
  window.import = function(specifier) {
    return originalImport(specifier).then(module => {
      // Check if this is the react-icons/fi module
      if (specifier.includes('react-icons/fi')) {
        console.log('Patching react-icons/fi module');
        
        // Add our mock icons to the module
        Object.keys(mockIcons).forEach(iconName => {
          if (!module[iconName]) {
            console.log(`Adding missing icon: ${iconName}`);
            module[iconName] = mockIcons[iconName];
          }
        });
      }
      return module;
    });
  };
  
  console.log('Module system patched');
})();

// Alternative approach: patch the error handling
window.addEventListener('error', function(event) {
  // Check if the error is related to missing icons
  if (event.message && event.message.includes('does not provide an export named')) {
    console.log('Caught module error:', event.message);
    
    // Prevent the default error handling
    event.preventDefault();
    
    // Reload the page with a special parameter to trigger our workaround
    if (!window.location.search.includes('useIconFallback')) {
      window.location.href = window.location.pathname + '?useIconFallback=true';
    }
  }
}, true);

// Check if we're using the icon fallback
if (window.location.search.includes('useIconFallback')) {
  console.log('Using icon fallbacks');
  
  // Create a global object to hold our fallback icons
  window.FallbackIcons = {
    FiBrain: function() { return document.createTextNode('🧠'); },
    FiGamepad: function() { return document.createTextNode('🎮'); },
    FiPenTool: function() { return document.createTextNode('🖌️'); }
  };
  
  // Inject a script to replace the missing icons
  const script = document.createElement('script');
  script.textContent = `
    // Wait for React to be available
    (function checkReact() {
      if (window.React) {
        console.log('React found, creating fallback components');
        
        // Create fallback components
        window.FiBrain = function() { return React.createElement('span', null, '🧠'); };
        window.FiGamepad = function() { return React.createElement('span', null, '🎮'); };
        window.FiPenTool = function() { return React.createElement('span', null, '🖌️'); };
        
        // Expose them globally
        window.FiBrain.displayName = 'FiBrain';
        window.FiGamepad.displayName = 'FiGamepad';
        window.FiPenTool.displayName = 'FiPenTool';
      } else {
        setTimeout(checkReact, 100);
      }
    })();
  `;
  document.head.appendChild(script);
}
