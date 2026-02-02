// components/DashboardPreview.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  MessageCircle, 
  Download,
  Globe,
  Settings,
  Bell,
  Search,
  Filter,
  ArrowUpRight,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  Clock,
  Mail,
  Phone,
  Star,
  Crown,
  Eye,
  MousePointerClick
} from 'lucide-react';

export default function DashboardPreview() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [leadsCount, setLeadsCount] = useState(0);
  const [conversionsCount, setConversionsCount] = useState(0);
  const [revenueCount, setRevenueCount] = useState(0);
  const [pipelineProgress, setPipelineProgress] = useState(0);

  const graphRef = useRef(null);

  // Enhanced count-up animations with staggered timing
  useEffect(() => {
    if (isPlaying) {
      const leadsTimer = setInterval(() => {
        setLeadsCount(prev => prev < 1245 ? prev + 7 : 1245);
      }, 20);

      const conversionsTimer = setInterval(() => {
        setConversionsCount(prev => prev < 312 ? prev + 2 : 312);
      }, 30);

      const revenueTimer = setInterval(() => {
        setRevenueCount(prev => prev < 42800 ? prev + 200 : 42800);
      }, 10);

      // Pipeline progress animation
      const pipelineTimer = setInterval(() => {
        setPipelineProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 50);

      return () => {
        clearInterval(leadsTimer);
        clearInterval(conversionsTimer);
        clearInterval(revenueTimer);
        clearInterval(pipelineTimer);
      };
    }
  }, [isPlaying]);

  const kpiCards = [
    {
      id: 1,
      title: "Leads Found",
      value: leadsCount,
      formatted: leadsCount.toLocaleString(),
      change: "+1245",
      changeType: "increase",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      description: "Qualified leads discovered"
    },
    {
      id: 2,
      title: "Conversions",
      value: conversionsCount,
      formatted: conversionsCount.toLocaleString(),
      change: "+312",
      changeType: "increase",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      description: "Successful conversions"
    },
    {
      id: 3,
      title: "Business Earned",
      value: revenueCount,
      formatted: `₹${revenueCount.toLocaleString()}`,
      change: "+52,000%",
      changeType: "explosive",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      description: "Revenue generated"
    },
    {
      id: 4,
      title: "Outreach Success Rate",
      value: 42,
      formatted: "42%",
      change: "+18%",
      changeType: "increase",
      icon: MessageCircle,
      color: "from-orange-500 to-red-500",
      description: "Positive response rate"
    },
    {
      id: 5,
      title: "Automation Time Saved",
      value: 156,
      formatted: "156h",
      change: "Weekly",
      changeType: "neutral",
      icon: Clock,
      color: "from-indigo-500 to-purple-500",
      description: "Hours automated"
    },
    {
      id: 6,
      title: "Campaign Health",
      value: 94,
      formatted: "94%",
      change: "Optimal",
      changeType: "positive",
      icon: Activity,
      color: "from-teal-500 to-green-500",
      description: "System performance"
    }
  ];

  const pipelineStages = [
    { 
      id: 1, 
      name: "Crawling", 
      count: 245, 
      status: "active", 
      icon: Search,
      progress: Math.min(100, pipelineProgress * 1.2)
    },
    { 
      id: 2, 
      name: "Verified", 
      count: 189, 
      status: "active", 
      icon: Shield,
      progress: Math.min(100, pipelineProgress * 1.1)
    },
    { 
      id: 3, 
      name: "Contacted", 
      count: 156, 
      status: "active", 
      icon: Mail,
      progress: Math.min(100, pipelineProgress * 0.9)
    },
    { 
      id: 4, 
      name: "In Discussion", 
      count: 89, 
      status: "active", 
      icon: MessageCircle,
      progress: Math.min(100, pipelineProgress * 0.7)
    },
    { 
      id: 5, 
      name: "Converted", 
      count: 42, 
      status: "completed", 
      icon: CheckCircle,
      progress: 100
    }
  ];

  const quickActions = [
    { id: 1, name: "Add Business", icon: Globe, color: "from-blue-500 to-cyan-500" },
    { id: 2, name: "Improve SEO", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { id: 3, name: "WhatsApp Outreach", icon: MessageCircle, color: "from-purple-500 to-pink-500" },
    { id: 4, name: "Download Leads", icon: Download, color: "from-orange-500 to-red-500" },
    { id: 5, name: "AI Messages", icon: Sparkles, color: "from-indigo-500 to-purple-500" }
  ];

  // Enhanced particle background system
  const ParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 150, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
      />
      
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );

  return (
    <section className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-sm text-blue-300 font-medium">Live Dashboard Preview</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-sora bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Watch Your Business Grow Automatically
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto font-inter leading-relaxed"
          >
            Vaiket is automatically generating & converting leads for your business 24/7.
          </motion.p>
        </motion.div>

        {/* Enhanced Dashboard Container with Glow */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50"></div>
          
          {/* Main Dashboard */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl relative z-10">
            {/* Dashboard Header */}
            <div className="border-b border-gray-800 bg-gray-900/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
                  >
                    <Crown className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-sora font-bold text-xl">Vaiket Dashboard</h3>
                    <p className="text-gray-400 text-sm font-inter">Automated Growth Platform</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-colors border border-gray-700"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'} Live Demo
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all border border-blue-500/30"
                  >
                    <Sparkles className="w-5 h-5" />
                    Get Your Dashboard
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Business Snapshot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900/50 to-purple-900/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <h4 className="text-white font-sora font-semibold text-lg">StyleCart Fashion</h4>
                    <p className="text-gray-400 font-inter">stylecartfashion.com</p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-sm font-medium">Campaign Running</span>
                  </motion.div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Last Updated</p>
                  <p className="text-white font-medium">Just now</p>
                </div>
              </div>
            </motion.div>

            {/* Main Dashboard Content */}
            <div className="p-6">
              {/* Enhanced KPI Cards Grid with 3D Tilt */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {kpiCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      rotateX: 2,
                      rotateY: 2,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Animated Background Pulse */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}
                        >
                          <card.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className={`px-2 py-1 rounded-lg text-xs font-medium border ${
                            card.changeType === 'explosive' 
                              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30'
                              : card.changeType === 'increase'
                              ? 'bg-green-500/20 text-green-300 border-green-500/30'
                              : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                          }`}
                        >
                          {card.change}
                        </motion.div>
                      </div>
                      
                      <motion.h3 
                        className="text-2xl font-bold text-white font-sora mb-1"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {card.formatted}
                      </motion.h3>
                      <p className="text-gray-400 font-inter mb-2">{card.title}</p>
                      <p className="text-gray-500 text-sm">{card.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Charts and Pipeline Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Enhanced Growth Chart */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-white font-sora font-semibold text-lg">Growth Analytics</h4>
                    <motion.div 
                      className="flex items-center gap-2 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-green-400 text-sm font-medium">+52,000% Growth</span>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <MousePointerClick className="w-3 h-3 text-gray-400" />
                    </motion.div>
                  </div>

                  {/* Interactive Chart */}
                  <div className="relative h-48 bg-gradient-to-b from-gray-900/50 to-transparent rounded-xl p-4 cursor-grab active:cursor-grabbing">
                    <motion.svg 
                      viewBox="0 0 400 160" 
                      className="w-full h-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Grid Lines */}
                      <line x1="0" y1="40" x2="400" y2="40" stroke="#374151" strokeWidth="1" />
                      <line x1="0" y1="80" x2="400" y2="80" stroke="#374151" strokeWidth="1" />
                      <line x1="0" y1="120" x2="400" y2="120" stroke="#374151" strokeWidth="1" />
                      
                      {/* Animated Growth Line */}
                      <motion.path
                        d="M0,120 Q100,40 200,80 T400,40"
                        stroke="url(#growthGradient)"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      
                    {/* Animated Data Points */}
<motion.circle
  cx="400"
  cy="40"
  r="4"
  fill="url(#growthGradient)"
  initial={{
    scale: 0,
    opacity: 0,
  }}
  whileInView={{
    scale: 1,
    opacity: 1,
  }}
  animate={{
    r: [4, 6, 4],
    opacity: [1, 0.8, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    repeatType: "loop",
  }}
/>

<defs>
  <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stopColor="#3B82F6" />
    <stop offset="50%" stopColor="#8B5CF6" />
    <stop offset="100%" stopColor="#EC4899" />
  </linearGradient>
</defs>
</motion.svg>


                    {/* Interactive Tooltip Area */}
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="absolute top-4 left-4 text-gray-400 text-xs">Jan</div>
                      <div className="absolute bottom-4 right-4 text-gray-400 text-xs">Now</div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Live Pipeline */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-white font-sora font-semibold text-lg">Live Lead Pipeline</h4>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-4 h-4 text-blue-400" />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4">
                    {pipelineStages.map((stage, index) => (
                      <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="relative p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-gray-500 transition-all group"
                      >
                        {/* Progress Bar */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl"
                          initial={{ width: 0 }}
                          animate={{ width: `${stage.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              stage.status === 'completed' 
                                ? 'bg-green-500/20 border border-green-500/30' 
                                : 'bg-blue-500/20 border border-blue-500/30'
                            }`}>
                              <stage.icon className={`w-5 h-5 ${
                                stage.status === 'completed' ? 'text-green-400' : 'text-blue-400'
                              }`} />
                            </div>
                            <div>
                              <h5 className="text-white font-medium">{stage.name}</h5>
                              <p className="text-gray-400 text-sm">{stage.count} leads</p>
                            </div>
                          </div>
                          
                          {stage.status === 'active' && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="w-3 h-3 bg-blue-400 rounded-full"
                            />
                          )}
                          {stage.status === 'completed' && (
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            >
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Quick Actions and Live Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Enhanced Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2"
                >
                  <h4 className="text-white font-sora font-semibold text-lg mb-6">Quick Actions</h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={action.id}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -2,
                          rotateY: 5,
                          transition: { type: "spring", stiffness: 300 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl bg-gradient-to-br ${action.color} border border-gray-600/30 hover:border-white/20 transition-all duration-300 group relative overflow-hidden`}
                      >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                        
                        <div className="text-center relative z-10">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors"
                          >
                            <action.icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <span className="text-white font-medium text-sm">{action.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Live Website Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-sora font-semibold text-lg">Live Preview</h4>
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Eye className="w-5 h-5 text-blue-400" />
                    </motion.div>
                  </div>
                  
                  <div className="bg-black rounded-xl border border-gray-700 overflow-hidden">
                    {/* Website Preview Header */}
                    <div className="bg-gray-900 p-3 border-b border-gray-700 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <span className="text-gray-300 text-sm">stylecartfashion.com</span>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div className="p-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 mb-3 border border-purple-500/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-3 h-3 bg-green-400 rounded-full"
                          />
                          <span className="text-green-400 text-sm font-medium">Online & Active</span>
                        </div>
                        <p className="text-white text-sm">Website is actively being monitored 24/7</p>
                      </motion.div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-2 px-3 bg-gray-700 rounded-lg text-white text-sm font-medium hover:bg-gray-600 transition-colors border border-gray-600"
                        >
                          View Site
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-2 px-3 bg-blue-500 rounded-lg text-white text-sm font-medium hover:bg-blue-600 transition-colors border border-blue-500/30 flex items-center gap-1 justify-center"
                        >
                          <Settings className="w-4 h-4" />
                          Edit
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Enhanced Dashboard Footer */}
            <div className="border-t border-gray-800 bg-gray-900/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-gray-400 cursor-pointer"
                  >
                    <Activity className="w-4 h-4" />
                    <span className="text-sm">System Status: Optimal</span>
                  </motion.div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-gray-400 cursor-pointer"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">DPDP Compliant</span>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold transition-all border border-blue-500/30"
                >
                  <Sparkles className="w-5 h-5" />
                  Get Your Dashboard
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900/80 to-purple-900/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-800 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-xl opacity-50"></div>
            
            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white font-sora mb-6"
              >
                Ready to See Your Business Grow Automatically?
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Join thousands of businesses already using Vaiket to automate their growth
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold transition-all font-sora flex items-center gap-3 border border-blue-500/30"
                >
                  <Zap className="w-6 h-6" />
                  Start Free Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 border border-gray-700 transition-all font-inter flex items-center gap-3"
                >
                  <TrendingUp className="w-5 h-5" />
                  View Pricing
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}