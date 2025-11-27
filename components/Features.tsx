// components/Features.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  MessageCircle, 
  BarChart3, 
  Globe, 
  TrendingUp,
  ArrowRight,
  Zap,
  CheckCircle,
  Sparkles,
  Star
} from 'lucide-react';

const features = [
  {
    id: 1,
    title: "AI Lead Discovery",
    description: "Vaiket scans the internet to automatically find potential customers near your business.",
    icon: Brain,
    badge: "+1,245 Leads Found",
    color: "from-purple-500 to-pink-500",
    delay: 0.1
  },
  {
    id: 2,
    title: "Verification AI",
    description: "Fake and duplicate contacts are filtered instantly. Only real, verified leads reach you.",
    icon: Shield,
    badge: "98.5% Accuracy",
    color: "from-green-500 to-emerald-500",
    delay: 0.2
  },
  {
    id: 3,
    title: "Automated Outreach",
    description: "Smart messaging follows up with interested customers, even while you sleep.",
    icon: MessageCircle,
    badge: "312 Conversions",
    color: "from-blue-500 to-cyan-500",
    delay: 0.3
  },
  {
    id: 4,
    title: "Lead Pipeline CRM",
    description: "Track every lead journey from contact to conversion — fully visual.",
    icon: BarChart3,
    badge: "42% Response Rate",
    color: "from-orange-500 to-red-500",
    delay: 0.4
  },
  {
    id: 5,
    title: "Website + SEO Boost",
    description: "Instantly launch a stunning business website and bring customers straight to you.",
    icon: Globe,
    badge: "156h Time Saved",
    color: "from-indigo-500 to-purple-500",
    delay: 0.5
  },
  {
    id: 6,
    title: "Live Growth Analytics",
    description: "Real-time insights to see revenue, growth, and conversion improvements immediately.",
    icon: TrendingUp,
    badge: "+52.00% Growth",
    color: "from-teal-500 to-green-500",
    delay: 0.6
  }
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
        
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }

        .galaxy-background {
          position: relative;
          background: #000;
          overflow: hidden;
        }

        #stars-features, #stars2-features, #stars3-features {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        #stars-features {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 984px 345px #FFF, 458px 409px #FFF, 634px 754px #FFF, 127px 633px #FFF, 259px 894px #FFF, 712px 100px #FFF, 899px 789px #FFF, 345px 234px #FFF, 567px 456px #FFF, 123px 678px #FFF;
          animation: animStar 50s linear infinite;
        }

        #stars-features:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 984px 345px #FFF, 458px 409px #FFF, 634px 754px #FFF, 127px 633px #FFF, 259px 894px #FFF, 712px 100px #FFF, 899px 789px #FFF, 345px 234px #FFF, 567px 456px #FFF, 123px 678px #FFF;
        }

        #stars2-features {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 234px 567px #FFF, 789px 123px #FFF, 456px 890px #FFF, 678px 345px #FFF, 901px 678px #FFF, 123px 456px #FFF, 890px 234px #FFF, 567px 901px #FFF, 345px 789px #FFF, 678px 123px #FFF;
          animation: animStar 100s linear infinite;
        }

        #stars2-features:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 234px 567px #FFF, 789px 123px #FFF, 456px 890px #FFF, 678px 345px #FFF, 901px 678px #FFF, 123px 456px #FFF, 890px 234px #FFF, 567px 901px #FFF, 345px 789px #FFF, 678px 123px #FFF;
        }

        #stars3-features {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 567px 234px #FFF, 123px 789px #FFF, 890px 456px #FFF, 345px 678px #FFF, 678px 901px #FFF, 456px 123px #FFF, 234px 890px #FFF, 901px 567px #FFF, 789px 345px #FFF, 123px 678px #FFF;
          animation: animStar 150s linear infinite;
        }

        #stars3-features:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 567px 234px #FFF, 123px 789px #FFF, 890px 456px #FFF, 345px 678px #FFF, 678px 901px #FFF, 456px 123px #FFF, 234px 890px #FFF, 901px 567px #FFF, 789px 345px #FFF, 123px 678px #FFF;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .feature-card {
            min-height: 280px !important;
          }
          
          .feature-title {
            font-size: 1.5rem !important;
            line-height: 2rem !important;
          }
          
          .feature-description {
            font-size: 1rem !important;
            line-height: 1.5rem !important;
          }
        }

        @media (max-width: 640px) {
          .section-padding {
            padding-top: 70px !important;
            padding-bottom: 70px !important;
          }
          
          .feature-grid {
            gap: 1.5rem !important;
          }
        }
      `}</style>

      <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden galaxy-background section-padding" id="features">
        {/* Galaxy Star Background */}
        <div id="stars-features"></div>
        <div id="stars2-features"></div>
        <div id="stars3-features"></div>
        
        {/* Nebula Effects */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 150, 0],
              y: [0, 100, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 lg:mb-8 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-4 h-4 text-blue-400" />
              </motion.div>
              <span className="text-sm text-blue-300 font-medium">AI-Powered Features</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 font-sora bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent px-4"
            >
              Powerful Automation Engine
              <br className="hidden sm:block" />
              for Business Growth
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed px-4 sm:px-6"
            >
              Vaiket discovers potential customers, contacts them, and tracks conversions — fully automated for your business.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20 feature-grid px-4 sm:px-0"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="group relative feature-card"
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl lg:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Main Card */}
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl lg:rounded-3xl p-6 lg:p-8 h-full group-hover:border-gray-700/70 transition-all duration-500 overflow-hidden min-h-[280px] lg:min-h-[320px]">
                  {/* Animated Background Pulse */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5 }
                      }}
                      className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 lg:mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25 transition-all duration-300`}
                    >
                      <feature.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-white font-sora mb-3 lg:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 feature-title">
                        {feature.title}
                      </h3>

                      <p className="text-gray-300 font-inter leading-relaxed mb-4 lg:mb-6 text-sm lg:text-base feature-description">
                        {feature.description}
                      </p>
                    </div>

                    {/* Badge */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-700/50 group-hover:border-gray-600 transition-all duration-300 w-fit"
                    >
                      <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
                      <span className="text-white text-xs lg:text-sm font-medium font-inter">
                        {feature.badge}
                      </span>
                    </motion.div>
                  </div>

                  {/* Hover Effect Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center px-4 sm:px-0"
          >
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-8 lg:p-12 border border-gray-800/50 max-w-4xl mx-auto relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-xl opacity-30" />
              
              <div className="relative z-10">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-2xl lg:text-3xl font-bold text-white font-sora mb-4 lg:mb-6"
                >
                  Ready to Automate Your Growth?
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8 max-w-2xl mx-auto"
                >
                  Join thousands of businesses growing automatically with Vaiket
                </motion.p>

                <div className="flex flex-col items-center gap-4">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 40px rgba(139, 92, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold text-base lg:text-lg transition-all duration-300 overflow-hidden font-sora w-full sm:w-auto"
                  >
                    {/* Button Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <span className="relative z-10 flex items-center gap-2 lg:gap-3 justify-center">
                      Get Your Dashboard
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                      </motion.span>
                    </span>
                  </motion.button>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 text-sm font-inter flex items-center gap-2 flex-wrap justify-center"
                  >
                    <Sparkles className="w-4 h-4 text-green-400" />
                    No credit card required • 60-second setup
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}