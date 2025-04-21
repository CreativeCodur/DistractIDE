import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import GlassPanel from './GlassPanel';
import { useTheme } from '../../context/ThemeContext';
import { createPortal } from 'react-dom';

// Portal component to render content at the root level of the DOM
const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const portalRoot = typeof document !== 'undefined' ? document.body : null;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !portalRoot) return null;
  return createPortal(children, portalRoot);
};

// Dictionary of technical terms and their definitions
export const termDefinitions = {
  'artificial intelligence': {
    definition: 'The simulation of human intelligence in machines that are programmed to think and learn like humans.',
    context: 'Neural networks are a subset of artificial intelligence that focus on learning patterns from data.',
    examples: [
      'Virtual assistants like Siri and Alexa',
      'Recommendation systems on streaming platforms',
      'Self-driving cars'
    ]
  },
  'machine learning': {
    definition: 'A branch of artificial intelligence that enables computers to learn from data without being explicitly programmed.',
    context: 'Neural networks are a powerful type of machine learning model.',
    examples: [
      'Email spam filters that improve over time',
      'Fraud detection systems in banking',
      'Image recognition software'
    ]
  },
  'deep learning': {
    definition: 'A subset of machine learning that uses neural networks with many layers (deep neural networks) to analyze various factors of data.',
    context: 'Deep learning has revolutionized AI by enabling breakthrough performance in tasks like image and speech recognition.',
    examples: [
      'Face recognition systems',
      'Language translation services',
      'AlphaGo beating world champions at Go'
    ]
  },
  'backpropagation': {
    definition: 'The primary algorithm for training neural networks, which calculates gradients backward through the network to update weights.',
    context: 'During training, backpropagation efficiently determines how each weight contributes to the overall error.',
    examples: [
      'Calculating how much each neuron contributed to a mistake',
      'Efficiently computing gradients for all weights in the network',
      'Enabling neural networks to learn complex patterns'
    ]
  },
  'gradient descent': {
    definition: 'An optimization algorithm that iteratively adjusts weights to minimize error by moving in the direction of steepest descent.',
    context: 'Think of it like walking downhill in a foggy landscape, taking small steps in the direction that seems steepest.',
    examples: [
      'Slowly adjusting weights to reduce prediction errors',
      'Finding the minimum of a loss function',
      'Optimizing neural network performance'
    ]
  },
  'overfitting': {
    definition: 'When a model learns the training data too well, including its noise and outliers, performing poorly on new data.',
    context: 'It\'s like memorizing exam answers without understanding the underlying concepts.',
    examples: [
      'A model that achieves 100% accuracy on training data but fails on new examples',
      'Capturing random fluctuations in the training data as if they were important patterns',
      'Learning noise instead of signal'
    ]
  },
  'underfitting': {
    definition: 'When a model is too simple to capture the underlying pattern in the data, performing poorly even on training data.',
    context: 'It\'s like using a straight line to fit a curved relationship.',
    examples: [
      'Using linear regression for complex non-linear relationships',
      'A model that misses important patterns in the data',
      'Having high bias and low variance'
    ]
  },
  'neural_network_layers': {
    definition: 'Groups of neurons in a neural network that process specific features of the input data.',
    context: 'Each layer transforms its input data and passes the result to the next layer.',
    examples: [
      'Input layer receiving raw data',
      'Hidden layers extracting features',
      'Output layer producing predictions'
    ]
  },
  'input layer': {
    definition: 'The first layer in a neural network that receives the raw input data.',
    context: 'It passes the input values to the first hidden layer without performing any transformations.',
    examples: [
      'Receiving pixel values from an image',
      'Taking in numerical features from a dataset',
      'Accepting text input for processing'
    ]
  },
  'input_layer': {
    definition: 'The first layer in a neural network that receives the raw input data.',
    context: 'It passes the input values to the first hidden layer without performing any transformations.',
    examples: [
      'Receiving pixel values from an image',
      'Taking in numerical features from a dataset',
      'Accepting text input for processing'
    ]
  },
  'hidden layers': {
    definition: 'The layers between the input and output layers that perform computations and feature extraction.',
    context: 'These layers learn increasingly complex representations of the data as it moves through the network.',
    examples: [
      'Early layers detecting edges in images',
      'Middle layers identifying shapes',
      'Deeper layers recognizing complex objects'
    ]
  },
  'hidden_layers': {
    definition: 'The layers between the input and output layers that perform computations and feature extraction.',
    context: 'These layers learn increasingly complex representations of the data as it moves through the network.',
    examples: [
      'Early layers detecting edges in images',
      'Middle layers identifying shapes',
      'Deeper layers recognizing complex objects'
    ]
  },
  'output layer': {
    definition: 'The final layer in a neural network that produces the prediction or classification result.',
    context: 'Its structure depends on the task: single neurons for regression, multiple neurons for classification.',
    examples: [
      'Predicting a continuous value like price',
      'Classifying an image into categories',
      'Generating probability scores for each possible class'
    ]
  },
  'output_layer': {
    definition: 'The final layer in a neural network that produces the prediction or classification result.',
    context: 'Its structure depends on the task: single neurons for regression, multiple neurons for classification.',
    examples: [
      'Predicting a continuous value like price',
      'Classifying an image into categories',
      'Generating probability scores for each possible class'
    ]
  },
  'data_patterns': {
    definition: 'Regularities or recurring structures in data that neural networks learn to recognize.',
    context: 'Pattern recognition is fundamental to how neural networks make predictions.',
    examples: [
      'Visual patterns in images like edges, textures, and shapes',
      'Sequential patterns in time series data',
      'Linguistic patterns in text'
    ]
  },
  'activation function': {
    definition: 'A mathematical function that determines the output of a neuron based on its inputs.',
    context: 'Activation functions introduce non-linearity into neural networks, allowing them to learn complex patterns.',
    examples: [
      'ReLU (Rectified Linear Unit) - returns x if x > 0, otherwise 0',
      'Sigmoid - squashes values between 0 and 1',
      'Tanh - squashes values between -1 and 1'
    ]
  },
  'loss function': {
    definition: 'A function that measures how far the model\'s predictions are from the actual values.',
    context: 'The goal of training is to minimize this loss function by adjusting the model\'s weights.',
    examples: [
      'Mean Squared Error for regression problems',
      'Cross-Entropy Loss for classification problems',
      'Hinge Loss for support vector machines'
    ]
  },
  'optimizer': {
    definition: 'An algorithm that adjusts the weights of a neural network to minimize the loss function.',
    context: 'Different optimizers use different strategies to update weights, affecting training speed and performance.',
    examples: [
      'Stochastic Gradient Descent (SGD)',
      'Adam (Adaptive Moment Estimation)',
      'RMSprop (Root Mean Square Propagation)'
    ]
  },
  'batch size': {
    definition: 'The number of training examples used in one iteration of model training.',
    context: 'Larger batch sizes can lead to faster training but may require more memory and might converge to less optimal solutions.',
    examples: [
      'Mini-batch (16-256 samples) - common for most applications',
      'Full batch - using all training data at once',
      'Micro-batch - very small batches used in memory-constrained environments'
    ]
  },
  'epoch': {
    definition: 'One complete pass through the entire training dataset.',
    context: 'Models typically require multiple epochs to learn effectively from the data.',
    examples: [
      'Early epochs capture basic patterns',
      'Middle epochs refine the model\'s understanding',
      'Later epochs may lead to overfitting if not carefully monitored'
    ]
  },
  'feature': {
    definition: 'An individual measurable property or characteristic of the data being observed.',
    context: 'Neural networks learn to extract and combine features to make predictions.',
    examples: [
      'Pixel values in an image',
      'Word frequencies in text',
      'Sensor readings in time series data'
    ]
  },
  'feature extraction': {
    definition: 'The process of transforming raw data into meaningful features that better represent the underlying pattern.',
    context: 'Deep learning automates feature extraction, which was traditionally done manually in machine learning.',
    examples: [
      'Convolutional layers extracting edges and textures from images',
      'Word embeddings capturing semantic meaning from text',
      'Autoencoders learning compressed representations of data'
    ]
  },
  'hyperparameter': {
    definition: 'A parameter whose value is set before the learning process begins, as opposed to weights which are learned during training.',
    context: 'Choosing optimal hyperparameters often requires experimentation and tuning.',
    examples: [
      'Learning rate - controls how quickly weights are updated',
      'Number of layers and neurons - defines network architecture',
      'Dropout rate - determines regularization strength'
    ]
  },
  'regularization': {
    definition: 'Techniques used to prevent overfitting by adding a penalty to the loss function or modifying the network structure.',
    context: 'Regularization helps the model generalize better to unseen data.',
    examples: [
      'L1/L2 regularization - adding weight penalties to the loss function',
      'Dropout - randomly deactivating neurons during training',
      'Early stopping - halting training when validation performance stops improving'
    ]
  },
  'transfer learning': {
    definition: 'A technique where a model developed for one task is reused as the starting point for a model on a second task.',
    context: 'Transfer learning allows leveraging knowledge from large datasets even when your specific task has limited data.',
    examples: [
      'Using ImageNet pre-trained models for custom image classification',
      'Fine-tuning language models like BERT for specific text tasks',
      'Adapting a game-playing AI to a new but similar game'
    ]
  },
  'convolutional neural network': {
    definition: 'A specialized neural network architecture designed primarily for processing grid-like data such as images.',
    context: 'CNNs use convolutional layers to automatically detect features like edges, textures, and patterns in images.',
    examples: [
      'Image classification models like ResNet and VGG',
      'Object detection systems like YOLO and SSD',
      'Face recognition technologies'
    ]
  },
  'recurrent neural network': {
    definition: 'A type of neural network designed to recognize patterns in sequences of data by maintaining an internal memory.',
    context: 'RNNs are particularly useful for tasks where context and order matter, like language and time series.',
    examples: [
      'Language modeling and text generation',
      'Speech recognition systems',
      'Time series prediction for stock prices or weather'
    ]
  },
  'lstm': {
    definition: 'Long Short-Term Memory networks, a type of RNN designed to remember information for long periods of time.',
    context: 'LSTMs solve the vanishing gradient problem that affects basic RNNs, allowing them to learn long-range dependencies.',
    examples: [
      'Machine translation systems',
      'Speech recognition',
      'Handwriting recognition and generation'
    ]
  },
  'transformer': {
    definition: 'A neural network architecture that relies entirely on attention mechanisms rather than recurrence or convolution.',
    context: 'Transformers have revolutionized NLP and are now being applied to vision and other domains.',
    examples: [
      'BERT and GPT language models',
      'Vision Transformers (ViT) for image processing',
      'Multimodal models like DALL-E and Stable Diffusion'
    ]
  },
  'attention mechanism': {
    definition: 'A technique that allows neural networks to focus on specific parts of the input when producing an output.',
    context: 'Attention mechanisms have been crucial for advances in machine translation and other sequence tasks.',
    examples: [
      'Self-attention in Transformers',
      'Bahdanau attention in neural machine translation',
      'Visual attention in image captioning models'
    ]
  },
  'embedding': {
    definition: 'A learned representation for text or other discrete items where similar items have similar embeddings.',
    context: 'Embeddings capture semantic relationships by mapping discrete objects to vectors in a continuous space.',
    examples: [
      'Word embeddings like Word2Vec and GloVe',
      'Document embeddings for search and retrieval',
      'Graph embeddings for network analysis'
    ]
  },
  'fine-tuning': {
    definition: 'The process of taking a pre-trained model and adapting it to a specific task by updating its weights.',
    context: 'Fine-tuning allows leveraging knowledge from large pre-trained models even with limited task-specific data.',
    examples: [
      'Adapting BERT for sentiment analysis',
      'Fine-tuning GPT for specialized text generation',
      'Customizing a pre-trained image classifier for specific categories'
    ]
  },
  'batch normalization': {
    definition: 'A technique that normalizes the inputs of each layer to reduce internal covariate shift.',
    context: 'Batch normalization helps networks train faster and more stably by controlling the distribution of layer inputs.',
    examples: [
      'Used in deep networks like ResNet',
      'Applied between convolutional layers in CNNs',
      'Helps mitigate vanishing/exploding gradient problems'
    ]
  },
  'dropout': {
    definition: 'A regularization technique where randomly selected neurons are ignored during training.',
    context: 'Dropout prevents neurons from co-adapting too much, forcing the network to learn more robust features.',
    examples: [
      'Applied to fully connected layers in classification networks',
      'Used in RNNs to prevent overfitting on sequential data',
      'Spatial dropout for convolutional layers'
    ]
  },
  'neurons': {
    definition: 'The basic computational units in a neural network that process input signals and produce output.',
    context: 'Similar to biological neurons, artificial neurons receive inputs, apply weights, and produce an output.',
    examples: [
      'Perceptrons - the simplest form of artificial neurons',
      'Hidden neurons that detect specific features',
      'Output neurons that produce final predictions'
    ]
  },
  'weights': {
    definition: 'Numerical parameters that determine the strength of connections between neurons.',
    context: 'Learning in neural networks happens by adjusting these weights to minimize prediction errors.',
    examples: [
      'Positive weights strengthen connections',
      'Negative weights create inhibitory connections',
      'Weight matrices connecting entire layers of neurons'
    ]
  },
  'training': {
    definition: 'The process of adjusting a neural network\'s weights to minimize errors on a dataset.',
    context: 'Training involves showing the network many examples and gradually improving its predictions.',
    examples: [
      'Supervised learning with labeled examples',
      'Reinforcement learning through trial and error',
      'Unsupervised learning to find patterns without labels'
    ]
  },
  'patterns': {
    definition: 'Recurring structures or relationships in data that neural networks learn to recognize.',
    context: 'The ability to detect complex patterns is what makes neural networks powerful.',
    examples: [
      'Visual patterns like edges, textures, and shapes',
      'Temporal patterns in time series data',
      'Linguistic patterns in text'
    ]
  },
  'computer vision': {
    definition: 'A field of AI that enables computers to interpret and understand visual information from the world.',
    context: 'Computer vision systems use neural networks to process and analyze images and videos.',
    examples: [
      'Object detection in self-driving cars',
      'Facial recognition systems',
      'Medical image analysis'
    ]
  },
  'natural language processing': {
    definition: 'A branch of AI focused on enabling computers to understand, interpret, and generate human language.',
    context: 'NLP combines linguistics with machine learning to process text and speech data.',
    examples: [
      'Machine translation between languages',
      'Sentiment analysis of reviews',
      'Chatbots and virtual assistants'
    ]
  },
  'collaborative filtering': {
    definition: 'A technique used by recommendation systems to predict user preferences based on similarities with other users.',
    context: 'It works on the assumption that people who agreed in the past will agree in the future.',
    examples: [
      'Netflix movie recommendations',
      'Amazon product suggestions',
      'Spotify playlist recommendations'
    ]
  },
  'reinforcement learning': {
    definition: 'A type of machine learning where agents learn to make decisions by receiving rewards or penalties.',
    context: 'The agent learns to maximize cumulative rewards through trial and error interactions with an environment.',
    examples: [
      'Game-playing AI like AlphaGo',
      'Robotics control systems',
      'Autonomous vehicles navigation'
    ]
  },
  'generative models': {
    definition: 'AI systems that can create new content similar to their training data.',
    context: 'These models learn the distribution of the training data to generate new, original examples.',
    examples: [
      'GANs creating realistic images',
      'Language models writing human-like text',
      'AI systems composing music'
    ]
  }
};

const DefinitionTermFixed = ({ term, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const termRef = useRef(null);
  const { themeColor } = useTheme();

  // Get the term info, case-insensitive
  const termInfo = termDefinitions[term.toLowerCase()];

  // Close modal when clicking outside and prevent body scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore body scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  // If term not found in dictionary, just render children
  if (!termInfo) {
    console.warn(`Definition not found for term: ${term}`);
    return <>{children}</>;
  }

  return (
    <>
      <span
        ref={termRef}
        className="cursor-pointer border-b-2 border-theme text-theme hover:opacity-80 transition-opacity"
        onClick={() => setIsModalOpen(true)}
        style={{ borderColor: themeColor }}
      >
        {children}
      </span>

      <AnimatePresence>
        {isModalOpen && (
          <Portal>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999]"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)'
              }}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal container - centered in viewport */}
            <div className="fixed inset-0 flex items-center justify-center z-[99999]">
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
                className="w-auto max-w-3xl relative pointer-events-auto"
                style={{
                  width: 'min(95vw, 800px)',
                  maxHeight: '90vh',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="glass-panel p-8 shadow-xl rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-md overflow-y-auto" style={{ maxHeight: '80vh', width: '100%', margin: '0 auto' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3
                      className="text-2xl font-semibold font-mono"
                      style={{ color: themeColor }}
                    >
                      {term}
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 rounded-full hover:bg-light-400/30 dark:hover:bg-dark-300/30 transition-colors"
                      aria-label="Close definition"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-8 font-body">
                    <div>
                      <h4 className="text-lg font-medium mb-2 font-mono">Definition</h4>
                      <p className="text-base leading-relaxed tracking-wide">
                        {termInfo.definition}
                      </p>
                    </div>

                    {termInfo.context && (
                      <div>
                        <h4 className="text-lg font-medium mb-2 font-mono">In Context</h4>
                        <p className="text-base leading-relaxed tracking-wide">
                          {termInfo.context}
                        </p>
                      </div>
                    )}

                    {termInfo.examples && termInfo.examples.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-2 font-mono">Examples</h4>
                        <ul className="list-disc pl-5 space-y-3">
                          {termInfo.examples.map((example, index) => (
                            <li key={index} className="text-base leading-relaxed tracking-wide">
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

export default DefinitionTermFixed;
