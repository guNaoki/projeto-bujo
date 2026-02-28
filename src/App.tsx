import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake, Gift, Heart, Star, Sparkles, Camera, Quote, Zap } from 'lucide-react';

const FloatingIcon = React.memo(({ x, y, size, delay, icon: Icon }: { x: string, y: number, size: number, delay: number, icon: any }) => (
  <motion.div
    className="absolute pointer-events-none opacity-[0.1] text-brand-blue"
    style={{ left: x, top: y }}
    initial={{ opacity: 0 }}
    animate={{ 
      y: -400, 
      rotate: [0, 180, 360],
      opacity: [0, 0.1, 0] 
    }}
    transition={{ 
      duration: 15 + Math.random() * 10, 
      repeat: Infinity, 
      ease: "linear",
      delay 
    }}
  >
    <Icon size={size} />
  </motion.div>
));

const App: React.FC = () => {
  const [isSurprise, setIsSurprise] = useState(false);

  const triggerConfetti = useCallback(() => {
    setIsSurprise(true);
    const end = Date.now() + (4 * 1000);
    const colors = ['#0070f3', '#60a5fa', '#ffffff', '#bfdbfe', '#4f46e5'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  const bgIcons = useMemo(() => [Heart, Star, Sparkles, Gift, Cake, Zap], []);
  const particles = useMemo(() => 
    [...Array(18)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 + "%",
      y: (window.innerHeight + 100),
      size: 15 + Math.random() * 20,
      delay: Math.random() * 15,
      icon: bgIcons[i % bgIcons.length]
    })), [bgIcons]
  );

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden font-body selection:bg-blue-100 bg-white">
      
      {/* Magic UI Background Layer */}
      <div className="absolute inset-0 magic-dots pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(0,112,243,0.1),transparent_50%)] pointer-events-none z-0" />
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <FloatingIcon key={p.id} {...p} />
        ))}
      </div>

      {/* Estrela Interativa Arrastável */}
      <motion.div
        drag
        dragElastic={0.1}
        whileHover={{ scale: 1.2, cursor: "grab" }}
        whileDrag={{ scale: 1.5, cursor: "grabbing", filter: "drop-shadow(0 0 20px rgba(0,112,243,0.8))" }}
        initial={{ x: 100, y: -200, opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed z-[100] text-brand-blue drop-shadow-lg"
        style={{ top: '25%', right: '10%' }}
      >
        <div className="relative group/star">
          <Star size={64} fill="currentColor" className="animate-pulse" />
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-brand-blue/60"
          >
            Me arraste! ✨
          </motion.div>
        </div>
      </motion.div>

      <main className="z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-12">
        
        {/* Profile Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          className="relative group cursor-pointer"
        >
          {/* Change the 'src' below to Diogo's actual image path */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-brand-blue/30 via-white to-accent/30 shadow-2xl relative overflow-hidden flex items-center justify-center bg-white"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner relative flex items-center justify-center bg-transparent">
              <img 
                src="/image.png" 
                alt="Foto do Diogo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out relative block"
                onError={(e) => {
                  console.error("Erro ao carregar imagem em /image.png");
                  // Tentar alternativa caso o path precise de ./
                  if (!(e.currentTarget.src.includes('./'))) {
                    e.currentTarget.src = './image.png';
                  }
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-500">
                <Camera className="w-12 h-12 mb-2 opacity-0 group-hover:opacity-60 text-white transition-opacity duration-500" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 border-2 border-dashed border-brand-blue/20 rounded-full pointer-events-none"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-10 border border-brand-blue/5 rounded-full pointer-events-none"
          />
        </motion.div>

        {/* Hero Section */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span 
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,112,243,0.15)" }}
              className="bg-brand-blue/10 text-brand-blue px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-6 inline-block cursor-default transition-colors"
            >
              🎂 27 de Fevereiro
            </motion.span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl md:text-8xl font-extrabold tracking-tight text-black"
          >
            <span className="relative inline-block">
              Parabéns,
              <motion.span 
                className="absolute -right-8 -top-8 text-brand-blue"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </span>
            <br/>
            <motion.span 
              whileHover={{ scale: 1.02 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-blue to-accent cursor-default inline-block py-2"
            >
              Diogo!
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
          >
            Celebrando a vida de um grande amigo. Que seu dia seja tão incrível quanto você!
          </motion.p>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="relative"
        >
          <motion.button
            onClick={triggerConfetti}
            className="btn-modern group flex items-center gap-4"
          >
            <span>Surpresa Especial</span>
            <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </motion.button>
          
          <motion.div 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-brand-blue/20"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Surprise Card */}
        <AnimatePresence>
          {isSurprise && (
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="glass p-8 md:p-12 rounded-[3rem] w-full max-w-2xl relative overflow-hidden group/card z-20 mt-12"
            >
              <Quote className="absolute top-8 left-8 w-20 h-20 text-brand-blue/5 -rotate-12 group-hover/card:rotate-0 transition-transform duration-700" />
              
              <div className="relative z-10 flex flex-col items-center space-y-6">
                <motion.div 
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  className="bg-brand-blue text-white p-5 rounded-2xl shadow-xl shadow-brand-blue/20 mb-4 cursor-pointer transition-all duration-500"
                >
                  <Sparkles className="w-10 h-10" />
                </motion.div>
                
                <h3 className="font-display text-3xl font-bold text-black group-hover/card:text-brand-blue transition-colors">Uma Mensagem para Você</h3>
                
                <p className="text-gray-600 text-lg md:text-xl italic leading-relaxed font-medium">
                  "Diogo, que este novo ciclo traga muitos projetos de sucesso. Pode contar comigo para o que for, pois se tem alguém que eu sei que tem potencial e vai longe é você. Por isso nós iremos juntos mudar nossa realidade, assim também como o mundo. Muito obrigado por fazer parte da minha vida. Tamo junto parceiro!"
                </p>
                <br />
                <p>Naoki.</p>

                <div className="flex gap-6 pt-6">
                  {[Heart, Star, Cake].map((Icon, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ 
                        scale: 1.2, 
                        backgroundColor: "rgba(0,112,243,0.1)",
                        color: "#0070f3" 
                      }}
                      className="w-14 h-14 rounded-2xl bg-brand-blue/5 flex items-center justify-center text-brand-blue/60 transition-colors cursor-pointer"
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <footer className="mt-24 pb-8 text-gray-400 font-medium text-xs tracking-[0.3em] uppercase flex items-center gap-6 z-10">
        <motion.div initial={{ width: 0 }} animate={{ width: 40 }} className="h-[1px] bg-gray-200" />
        Feito com ❤️ para o Diogo
        <motion.div initial={{ width: 0 }} animate={{ width: 40 }} className="h-[1px] bg-gray-200" />
      </footer>
    </div>
  );
};

export default App;
