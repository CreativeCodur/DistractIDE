// This file provides shims for the missing icons in react-icons/fi
console.log('Icon shim loaded');

// Create a self-executing function to avoid polluting the global namespace
(function() {
  // Create a simple SVG element creator
  function createSVG(paths, props = {}) {
    // Create the SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    
    // Set default attributes
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    // Apply custom props
    for (const [key, value] of Object.entries(props)) {
      svg.setAttribute(key, value);
    }
    
    // Add paths
    paths.forEach(pathData => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      svg.appendChild(path);
    });
    
    return svg;
  }
  
  // Define our shim icons
  const icons = {
    // Brain icon
    FiBrain: function(props = {}) {
      return createSVG([
        'M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 0 19.5v-15A2.5 2.5 0 0 1 2.5 2h7z',
        'M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h7a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 21.5 2h-7z'
      ], props);
    },
    
    // Gamepad icon
    FiGamepad: function(props = {}) {
      return createSVG([
        'M6 12h4M8 10v4',
        'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z'
      ], props);
    },
    
    // Pen tool icon
    FiPenTool: function(props = {}) {
      return createSVG([
        'M12 19l7-7 3 3-7 7-3-3z',
        'M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z'
      ], props);
    }
  };
  
  // Add our icons to the window object
  for (const [name, icon] of Object.entries(icons)) {
    window[name] = icon;
  }
  
  // Create a special module that can be used to patch the react-icons/fi module
  window.__iconShims = icons;
  
  console.log('Icon shims created');
})();
