import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import DefinitionTerm from '../ui/DefinitionTerm';
import AnimatedShapes from '../ui/AnimatedShapes';
import ShadcnIcon from '../ui/ShadcnIcon';
import WordByWordTextFixed from '../ui/WordByWordTextFixed';
import TrainingAnimation from '../ui/TrainingAnimation';

const TrainingProcessVisual: React.FC = () => {
  const { themeColor } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Training steps with detailed explanations - simplified for animation focus
  const trainingSteps = [
    {
      title: "Forward Pass",
      description: "Data flows through the network",
      iconType: "arrowRight"
    },
    {
      title: "Backward Pass",
      description: "Error is calculated and propagated back",
      iconType: "arrowLeft"
    },
    {
      title: "Update Weights",
      description: "Network adjusts to improve next time",
      iconType: "refresh"
    }
  ];

  return (
    <motion.div
      className="my-36 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Additional animated shapes */}
      <AnimatedShapes type="circle" position="top-right" size="small" opacity={0.15} />
      <AnimatedShapes type="hexagon" position="bottom-left" size="small" opacity={0.2} delay={0.3} />
      <h3 className="text-2xl font-medium mb-10 text-center font-mono">
        <DefinitionTerm term="training">
          The Training Process: How Networks Learn
        </DefinitionTerm>
      </h3>

      <div className="relative">
        {/* Main animation */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <WordByWordTextFixed
              text="Training is an iterative process where the network learns from examples and gradually improves."
              className="text-xl leading-relaxed"
              delay={0.2}
              tag="p"
            />
          </motion.div>

          <TrainingAnimation className="w-full h-80 mb-12" />
        </div>

        {/* Simplified steps with larger cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {trainingSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-10 shadow-lg flex flex-col items-center text-center h-full"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-theme-light mb-4">
                  <ShadcnIcon type={step.iconType} size="large" />
                </div>
                <h4 className="font-medium font-mono text-xl mb-4">
                  {index === 1 ? (
                    <DefinitionTerm term="backpropagation">
                      {step.title}
                    </DefinitionTerm>
                  ) : index === 2 ? (
                    <DefinitionTerm term="weights">
                      {step.title}
                    </DefinitionTerm>
                  ) : (
                    step.title
                  )}
                </h4>
              </div>

              <WordByWordTextFixed
                text={step.description}
                className="text-lg text-light-600 dark:text-dark-300"
                delay={0.2}
                staggerDelay={0.02}
                tag="p"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrainingProcessVisual;
