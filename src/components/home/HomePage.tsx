import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassPanel from '../ui/GlassPanel';
import GlassButton from '../ui/GlassButton';
import { FiCpu, FiCode, FiLayers, FiInfo, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import EnhancedNetworkVisual from './EnhancedNetworkVisual';
import TrainingProcessVisual from './TrainingProcessVisual';
import RealWorldApplications from './RealWorldApplications';
import ScrollWhoosh from '../ui/ScrollWhoosh';
import WordByWordTextEnhanced from '../ui/WordByWordTextEnhanced';
import WindWhoosh from '../ui/WindWhoosh';
import ParallaxImage from '../ui/ParallaxImage';
import FloatingNodesAnimation from '../ui/FloatingNodesAnimation';
import TrainingAnimation from '../ui/TrainingAnimation';
import NeuralLayersAnimation from '../ui/NeuralLayersAnimation';
import ModernNeuralAnimation from '../ui/ModernNeuralAnimation';
// DefinitionTermFixed is imported by WordByWordTextFixed
// DefinitionTermFixed is now used automatically by WordByWordTextFixed

// Import logo images
// For dark mode
import logoTextDark from '../../assets/images/logo-text-dark.png';
// For light mode (using the specified images)
import logoTextLight from '../../assets/images/logo-text-light.png'; // Switched to match Header

const HomePage: React.FC = () => {
  const { theme } = useTheme();

  // Select the appropriate logo based on the theme
  // In dark mode, use the dark logo (which shows the full "Distract" text)
  // In light mode, use the light logo
  const logoText = theme === 'dark' ? logoTextLight : logoTextDark;

  return (
    <div className="space-y-24 md:space-y-36 lg:space-y-48 relative">
      {/* Global wind whooshing effect */}
      <WindWhoosh side="both" intensity="medium" />
      <section className="text-center mx-auto relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center w-full px-2 sm:px-4 overflow-hidden">
        {/* Neural network background animation - full screen */}
        <div className="absolute inset-0 -z-10 w-full h-full">
          <div className="w-full h-full">
            <ModernNeuralAnimation
              className="w-full h-full"
              speed="slow"
              density="medium"
              opacity={0.5}
              showLabels={false}
              blurAmount={5}
            />
          </div>
        </div>
        <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
          {/* Removed animated shapes for welcome section */}
          <motion.h1
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 flex flex-wrap items-center justify-center gap-1 sm:gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to
          <div className="flex flex-wrap items-center justify-center mt-1">
            <img src={logoText} alt="DistractIDE" className="h-5 sm:h-6 md:h-8 mr-1" />
            <div className="tooltip-container">
              <span className="inline-flex items-center px-1 sm:px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium bg-theme-light text-theme animate-pulse cursor-help">
                BETA
              </span>
              <div className="tooltip tooltip-bottom">
                <FiInfo className="inline-block mr-1" /> DistractIDE is currently in beta. Features may change and some functionality might be limited.
              </div>
            </div>
          </div>
        </motion.h1>
          <motion.div
          className="h-5 sm:h-6 md:h-8 mb-2 sm:mb-3 md:mb-4 lg:mb-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xs sm:text-sm md:text-base lg:text-lg typewriter-effect inline-block tracking-wide">
            All AI, no distractions.
          </p>
        </motion.div>

          <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 relative w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Removed animated shapes for buttons section */}
          <Link to="/no-distraction" className="w-full sm:flex-1 max-w-full sm:max-w-[300px] md:max-w-[350px] mb-2 sm:mb-0">
            <GlassButton className="h-full flex flex-col items-start p-2 sm:p-3 md:p-4 lg:p-5 w-full accent-bg accent-text text-left">
              <div className="flex flex-wrap items-center mb-1">
                <FiCpu className="mr-1 text-sm sm:text-base" />
                <span className="font-medium text-xs sm:text-sm md:text-base">No-Distraction Mode</span>
                <div className="tooltip-container ml-1 sm:ml-2">
                  <span className="inline-flex items-center px-1 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium bg-theme-light text-theme animate-pulse cursor-help">BETA</span>
                  <div className="tooltip">
                    <FiInfo className="inline-block mr-1" /> This feature is in beta and may not be fully functional or accurate. Use at your own risk.
                  </div>
                </div>
              </div>
              <p className="text-[8px] sm:text-[10px] md:text-xs opacity-90 line-clamp-2 sm:line-clamp-3">
                Build neural networks using a simple button-based interface. Perfect for beginners who want to understand the basic concepts without writing code.
              </p>
            </GlassButton>
          </Link>

          <Link to="/low-distraction" className="w-full sm:flex-1 max-w-full sm:max-w-[300px] md:max-w-[350px]">
            <GlassButton className="h-full flex flex-col items-start p-2 sm:p-3 md:p-4 lg:p-5 w-full accent-bg accent-text text-left">
              <div className="flex flex-wrap items-center mb-1">
                <FiCode className="mr-1 text-sm sm:text-base" />
                <span className="font-medium text-xs sm:text-sm md:text-base">Low-Distraction Mode</span>
                <div className="tooltip-container ml-1 sm:ml-2">
                  <span className="inline-flex items-center px-1 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium bg-theme-light text-theme animate-pulse cursor-help">BETA</span>
                  <div className="tooltip">
                    <FiInfo className="inline-block mr-1" /> D-Script is experimental and may have limitations. Syntax errors might not be properly detected.
                  </div>
                </div>
              </div>
              <p className="text-[8px] sm:text-[10px] md:text-xs opacity-90 line-clamp-2 sm:line-clamp-3">
                Use D-Script, a simple domain-specific language, to build neural networks. Great for those who want to learn the basics of coding neural networks.
              </p>
            </GlassButton>
          </Link>
        </motion.div>

        {/* Smooth scroll chevron */}
        <motion.div
          className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-0 right-0 flex justify-center cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <div className="p-1.5 sm:p-2 rounded-full bg-theme-light/30 backdrop-blur-sm">
            <FiArrowRight className="transform rotate-90 text-sm sm:text-lg md:text-xl text-theme" />
          </div>
        </motion.div>
        </div>
      </section>

      {/* Understanding Neural Networks Section */}
      <section className="relative max-w-5xl mx-auto mb-24 md:mb-36 lg:mb-48 pt-12 md:pt-24 px-4">
        {/* Scroll animation effect */}
        <div className="absolute inset-0 pointer-events-none">
          <ScrollWhoosh direction="right" intensity="light" />
        </div>

        {/* Removed animated shapes */}

        <GlassPanel className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-12 flex items-center font-mono">
              <FiLayers className="mr-3 text-theme" />
              Understanding Neural Networks
            </h2>
          </motion.div>

          {/* Enhanced neural network animation */}
          <div className="relative h-96 mb-16">
            <FloatingNodesAnimation className="absolute inset-0" nodeCount={30} connectionCount={40} speed="slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-theme-light/10 backdrop-blur-sm p-8 rounded-xl max-w-lg text-center"
              >
                <h3 className="text-2xl font-mono mb-4">Neural Networks Visualized</h3>
                <p className="text-lg">
                  Interconnected <span className="text-theme underline cursor-pointer">neurons</span> that process information layer by layer, learning <span className="text-theme underline cursor-pointer">patterns</span> from data.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <WordByWordTextEnhanced
                text="Neural networks are computer systems inspired by the human brain that learn from examples. They use connected neurons with activation functions to recognize patterns in data and make predictions."
                className="text-lg sm:text-xl md:text-2xl leading-relaxed"
                delay={0.2}
                tag="p"
              />
            </motion.div>

            {/* Neural Layers Animation */}
            <div className="my-8 md:my-16">
              <NeuralLayersAnimation className="w-full" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <WordByWordTextEnhanced
                text="Deep learning networks have multiple neural_network_layers that transform data step by step. The input_layer receives raw data, hidden_layers extract features through convolutional neural network or recurrent neural network, and the output_layer makes predictions."
                className="text-base sm:text-lg md:text-xl leading-relaxed"
                delay={0.3}
                tag="p"
              />
            </motion.div>
          </div>
        </GlassPanel>
      </section>

      {/* How Neural Networks Work Section */}
      <section className="relative max-w-5xl mx-auto mb-24 md:mb-36 lg:mb-48 pt-12 md:pt-24 px-4">
        {/* Scroll animation effect */}
        <div className="absolute inset-0 pointer-events-none">
          <ScrollWhoosh direction="left" intensity="light" />
        </div>

        {/* Removed animated shapes */}

        {/* Section-specific wind effect */}
        <WindWhoosh side="left" intensity="strong" />

        {/* Neural network background animation */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <ModernNeuralAnimation
            className="w-full h-full"
            speed="slow"
            density="low"
            opacity={0.6}
            showLabels={false}
            blurAmount={3}
          />
        </div>

        <GlassPanel className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-12 flex items-center font-mono">
              <FiCpu className="mr-3 text-theme" />
              How Neural Networks Work
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <WordByWordTextEnhanced
              text="AI systems like neural networks excel at tasks that are intuitive for humans but hard to program with explicit rules. Machine learning allows computers to learn from examples using loss functions and optimizers rather than following fixed instructions."
              className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 md:mb-12"
              delay={0.2}
              tag="p"
            />
          </motion.div>

          {/* Enhanced network visual with detailed explanations */}
          <EnhancedNetworkVisual />

          {/* Additional training animation */}
          <div className="my-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-8"
            >
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-6 text-theme font-mono">Watch Training in Action</h3>
              <p className="text-base sm:text-lg md:text-xl">
                See how a neural network uses <span className="text-theme underline cursor-pointer">backpropagation</span> and <span className="text-theme underline cursor-pointer">gradient descent</span> to learn from mistakes
              </p>
            </motion.div>

            <TrainingAnimation className="w-full h-96 mb-16" />
          </div>

          {/* Training process visualization */}
          <TrainingProcessVisual />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 md:mt-24 p-6 md:p-12 bg-theme-light/20 rounded-xl"
          >
            <h3 className="text-xl md:text-2xl font-medium mb-4 md:mb-8 text-theme font-mono">Why Neural Networks Are So Powerful</h3>

            <div className="space-y-12">
              <WordByWordTextEnhanced
                text="Neural networks can detect patterns that humans might miss. They excel at image recognition, language processing, and finding correlations in complex data."
                className="text-base sm:text-lg md:text-xl leading-relaxed mb-4"
                delay={0.2}
                tag="p"
              />

              <WordByWordTextEnhanced
                text="During training, networks learn by adjusting weights between neurons over multiple epochs. They use backpropagation and gradient descent with regularization techniques like dropout to minimize errors over time."
                className="text-base sm:text-lg md:text-xl leading-relaxed mb-4"
                delay={0.3}
                tag="p"
              />

              <WordByWordTextEnhanced
                text="Networks must balance between overfitting (memorizing training data) and underfitting (being too simple). Techniques like batch normalization and hyperparameter tuning help models generalize well to new, unseen examples."
                className="text-base sm:text-lg md:text-xl leading-relaxed"
                delay={0.4}
                tag="p"
              />
            </div>
          </motion.div>
        </GlassPanel>
      </section>

      {/* Real-world applications section */}
      <section className="relative max-w-5xl mx-auto mb-24 md:mb-36 lg:mb-48 pt-12 md:pt-24 px-4">
        {/* Scroll animation effect */}
        <div className="absolute inset-0 pointer-events-none">
          <ScrollWhoosh direction="right" intensity="medium" />
        </div>

        {/* Removed animated shapes */}

        {/* Section-specific wind effect */}
        <WindWhoosh side="right" intensity="strong" />

        {/* Add parallax image background */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
            alt="Abstract neural network"
            direction="up"
            speed={0.1}
            blur={5}
          />
        </div>

        <GlassPanel className="relative z-10">
          <RealWorldApplications />
        </GlassPanel>
      </section>
    </div>
  );
};

export default HomePage;
