import { motion, AnimatePresence } from 'motion/react';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface TransitionContextType {
  startTransition: (to: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within TileTransitionProvider');
  }
  return context;
}

const GRID_COLS = 5;
const GRID_ROWS = 5;
const TILE_DURATION = 0.4;
const TILE_DELAY = 0.03;

interface TileTransitionProviderProps {
  children: ReactNode;
}

export function TileTransitionProvider({ children }: TileTransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'covering' | 'revealing'>('idle');
  const navigate = useNavigate();

  const startTransition = useCallback((to: string) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setPhase('covering');

    // After tiles cover the screen, navigate and reveal
    const coverDuration = (GRID_COLS * GRID_ROWS * TILE_DELAY + TILE_DURATION) * 1000;

    setTimeout(() => {
      navigate(to);
      setPhase('revealing');

      // After reveal animation, reset
      setTimeout(() => {
        setIsTransitioning(false);
        setPhase('idle');
      }, coverDuration);
    }, coverDuration);
  }, [isTransitioning, navigate]);

  // Generate tiles
  const tiles = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const index = row * GRID_COLS + col;
      // Diagonal delay pattern for more interesting effect
      const delay = (row + col) * TILE_DELAY;

      tiles.push({
        key: `${row}-${col}`,
        index,
        delay,
        style: {
          left: `${(col / GRID_COLS) * 100}%`,
          top: `${(row / GRID_ROWS) * 100}%`,
          width: `${100 / GRID_COLS}%`,
          height: `${100 / GRID_ROWS}%`,
        },
      });
    }
  }

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}

      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {tiles.map((tile) => (
              <motion.div
                key={tile.key}
                className="absolute bg-charcoal"
                style={tile.style}
                initial={{
                  scaleY: phase === 'covering' ? 0 : 1,
                  originY: phase === 'covering' ? 1 : 0,
                }}
                animate={{
                  scaleY: phase === 'covering' ? 1 : 0,
                  originY: phase === 'covering' ? 1 : 0,
                }}
                transition={{
                  duration: TILE_DURATION,
                  delay: phase === 'revealing'
                    ? ((GRID_COLS - 1 - (tile.index % GRID_COLS)) + (GRID_ROWS - 1 - Math.floor(tile.index / GRID_COLS))) * TILE_DELAY
                    : tile.delay,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
