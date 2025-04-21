// This is a custom build script for Vercel deployment
// It will run the build command with the --skipTypeCheck flag

const { execSync } = require('child_process');

try {
  // Run the build command with the --skipTypeCheck flag
  console.log('Running build with --skipTypeCheck flag...');
  execSync('vite build --skipTypeCheck', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
