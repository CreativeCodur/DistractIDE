import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ParallaxScroll from '../ui/ParallaxScroll';
import AnimatedShapes from '../ui/AnimatedShapes';
import ShadcnIcon from '../ui/ShadcnIcon';
import WordByWordTextEnhanced from '../ui/WordByWordTextEnhanced';

interface ApplicationCardProps {
  title: string;
  description: string;
  iconType: string;
  examples: string[];
  delay?: number;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  title,
  description,
  iconType,
  examples,
  delay = 0
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay
      }
    }
  };

  return (
    <motion.div
      className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-8 h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-theme-light mr-3">
          <ShadcnIcon type={iconType} size="large" />
        </div>
        <h3 className="text-xl font-medium font-mono">{title}</h3>
      </div>

      <WordByWordTextEnhanced
        text={description}
        className="mb-6"
        delay={0.2}
        staggerDelay={0.02}
        tag="p"
      />

      <h4 className="font-medium text-theme mb-4 font-mono">Real Examples:</h4>
      <ul className="space-y-3">
        {examples.map((example, i) => (
          <li key={i} className="flex items-start">
            <div className="inline-flex w-5 h-5 rounded-full bg-theme-light items-center justify-center mr-2 mt-0.5">
              <ShadcnIcon type={`number${i+1}` as any} size="small" />
            </div>
            <span>{example}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const RealWorldApplications: React.FC = () => {
  // Using theme context for consistent styling
  const { } = useTheme();

  const applications = [
    {
      title: "Computer Vision",
      description: "Neural networks that can see and understand images and videos using computer vision techniques with convolutional neural networks and feature extraction.",
      iconType: "eye",
      examples: [
        "Face recognition to unlock your smartphone",
        "Self-driving cars detecting pedestrians and traffic signs",
        "Medical imaging to detect diseases in X-rays and MRIs",
        "Augmented reality filters on social media apps"
      ]
    },
    {
      title: "Natural Language",
      description: "Networks that understand, generate, and translate human language using natural language processing models with transformers and attention mechanisms.",
      iconType: "message",
      examples: [
        "Voice assistants like Siri, Alexa, and Google Assistant",
        "Chatbots that answer customer service questions",
        "Real-time translation of text and speech",
        "Autocomplete and grammar checking in text editors"
      ]
    },
    {
      title: "Recommendation",
      description: "Systems that use collaborative filtering and embedding techniques to learn preferences and suggest personalized content.",
      iconType: "thumbsUp",
      examples: [
        "Netflix suggesting movies based on your viewing history",
        "Spotify creating personalized playlists",
        "Amazon recommending products you might want to buy",
        "Social media feeds showing content relevant to your interests"
      ]
    },
    {
      title: "Game Playing",
      description: "Neural networks that use reinforcement learning with deep neural networks to master complex games by learning optimal strategies through many epochs of training.",
      iconType: "game",
      examples: [
        "AlphaGo defeating world champions at the ancient game of Go",
        "AI opponents in video games that adapt to your play style",
        "Poker-playing AI that can bluff and read opponents",
        "Chess engines that play at superhuman levels"
      ]
    },
    {
      title: "Creative AI",
      description: "Generative models like transformers that create art, music, and other creative content by learning patterns from existing works through fine-tuning and transfer learning.",
      iconType: "art",
      examples: [
        "DALL-E and Midjourney generating images from text descriptions",
        "AI composing music in different styles",
        "Text-to-speech systems creating natural-sounding voices",
        "Style transfer turning photos into artwork in the style of famous painters"
      ]
    },
    {
      title: "Scientific Research",
      description: "Neural networks using deep learning with specialized loss functions to accelerate scientific discovery by finding patterns in complex data through feature extraction.",
      iconType: "science",
      examples: [
        "AlphaFold predicting protein structures with unprecedented accuracy",
        "Drug discovery by simulating molecular interactions",
        "Climate modeling to predict weather patterns",
        "Analyzing astronomical data to discover new celestial objects"
      ]
    }
  ];

  return (
    <div className="my-36 relative">
      {/* Additional animated shapes */}
      <AnimatedShapes type="wave" position="top-left" size="medium" opacity={0.2} />
      <AnimatedShapes type="grid" position="bottom-right" size="medium" opacity={0.15} delay={0.5} />
      <AnimatedShapes type="hexagon" position="center" size="large" opacity={0.1} delay={0.8} />
      <ParallaxScroll direction="up" speed={0.1}>
        <motion.h2
          className="text-2xl font-semibold mb-10 text-center font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Neural Networks in the Real World
        </motion.h2>
      </ParallaxScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {applications.map((app, index) => (
          <ApplicationCard
            key={app.title}
            title={app.title}
            description={app.description}
            iconType={app.iconType}
            examples={app.examples}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default RealWorldApplications;
