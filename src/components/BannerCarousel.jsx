import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BANNERS = [
  {
    id: 1,
    title: "Turn Your Ideas into Reality",
    description: "The ultimate platform for creators to organize, track, and build their next big project.",
    image: "https://picsum.photos/seed/innovation/1920/1080",
    cta: "Get Started",
    link: "/register",
    color: "from-indigo-600/90 to-purple-600/90"
  },
  {
    id: 2,
    title: "Collaborate with Visionaries",
    description: "Connect with other brilliant minds and find the perfect partners for your ventures.",
    image: "https://picsum.photos/seed/collaboration/1920/1080",
    cta: "Explore Ideas",
    link: "/ideas",
    color: "from-blue-600/90 to-indigo-600/90"
  },
  {
    id: 3,
    title: "Track Your Progress",
    description: "From initial spark to final launch, keep every milestone organized in one place.",
    image: "https://picsum.photos/seed/growth/1920/1080",
    cta: "View Projects",
    link: "/projects",
    color: "from-emerald-600/90 to-teal-600/90"
  }
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + BANNERS.length) % BANNERS.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl bg-gray-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BANNERS[currentIndex].image})` }}>
            <div className={`absolute inset-0 bg-gradient-to-r ${BANNERS[currentIndex].color} mix-blend-multiply`} />
          </div>
          
          <div className="relative h-full flex flex-col justify-center px-8 md:px-16 space-y-6 text-white max-w-3xl">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
            >
              {BANNERS[currentIndex].title}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed"
            >
              {BANNERS[currentIndex].description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                to={BANNERS[currentIndex].link}
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg"
              >
                {BANNERS[currentIndex].cta} <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
