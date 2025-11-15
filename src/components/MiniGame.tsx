import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { RotateCcw, Trophy, Clock, Hash } from "lucide-react";

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
  color: string;
}

const CARD_SYMBOLS = ["◆", "●", "■", "▲", "★", "◉", "⬟", "◈"];
const CARD_COLORS = [
  "var(--neon-cyan)",
  "var(--neon-purple)",
  "var(--glitch-pink)",
  "var(--glitch-green)",
  "#ff6b35",
  "#4ecdc4",
  "#ffd700",
  "#ff1493",
];

function createDeck(): Card[] {
  const pairs = CARD_SYMBOLS.map((symbol, index) => ({
    symbol,
    color: CARD_COLORS[index],
  }));

  const deck: Card[] = [];
  pairs.forEach((pair, index) => {
    deck.push({
      id: index * 2,
      symbol: pair.symbol,
      color: pair.color,
      isFlipped: false,
      isMatched: false,
    });
    deck.push({
      id: index * 2 + 1,
      symbol: pair.symbol,
      color: pair.color,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Shuffle the deck
  return deck.sort(() => Math.random() - 0.5);
}

export function MiniGame() {
  const [cards, setCards] = useState<Card[]>(createDeck());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Timer effect
  useEffect(() => {
    if (startTime && !isWon) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, isWon]);

  // Check for match when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatches((m) => m + 1);
          setFlippedCards([]);
        }, 600);
      } else {
        // No match, flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // Check for win condition
  useEffect(() => {
    if (matches === 8 && !isWon) {
      setIsWon(true);
    }
  }, [matches, isWon]);

  const handleCardClick = (cardId: number) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const card = cards.find((c) => c.id === cardId);
    if (
      !card ||
      card.isFlipped ||
      card.isMatched ||
      flippedCards.length === 2
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );
    setFlippedCards((prev) => [...prev, cardId]);
    setMoves((m) => m + 1);
  };

  const resetGame = () => {
    setCards(createDeck());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setStartTime(null);
    setElapsedTime(0);
    setIsWon(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-24 px-6 min-h-screen pt-[120px]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12">
            <h2
              className="font-mono tracking-wider mb-4"
              style={{ color: "var(--neon-cyan)" }}
            >
              // NEON MEMORY MATCH
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 relative"
              style={{ backgroundColor: "var(--neon-purple)" }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: "var(--glitch-pink)" }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scaleX: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </motion.div>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5" style={{ color: "var(--neon-cyan)" }} />
                <span className="font-mono text-sm">Moves: {moves}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" style={{ color: "var(--neon-purple)" }} />
                <span className="font-mono text-sm">{formatTime(elapsedTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" style={{ color: "var(--glitch-pink)" }} />
                <span className="font-mono text-sm">Matches: {matches}/8</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 rounded border-2 font-mono text-sm transition-colors"
              style={{ borderColor: "var(--neon-cyan)" }}
            >
              <RotateCcw className="w-4 h-4" />
              New Game
            </motion.button>
          </div>

          {/* Game Grid */}
          <div
            className="mb-8 mx-auto"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              maxWidth: "600px",
              aspectRatio: "1 / 1",
            }}
          >
            {cards.map((card, index) => (
              <MemoryCard
                key={card.id}
                card={card}
                index={index}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>

          {/* Win Modal */}
          <AnimatePresence>
            {isWon && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
                onClick={resetGame}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="bg-card p-8 rounded-lg border-2 text-center"
                  style={{
                    borderColor: "var(--neon-cyan)",
                    boxShadow: "0 0 40px var(--neon-cyan)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <Trophy
                      className="w-16 h-16 mx-auto mb-4"
                      style={{ color: "var(--glitch-pink)" }}
                    />
                  </motion.div>
                  <h3
                    className="font-mono text-2xl mb-4"
                    style={{ color: "var(--neon-cyan)" }}
                  >
                    YOU WON!
                  </h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-muted-foreground">
                      Time: <span className="font-mono">{formatTime(elapsedTime)}</span>
                    </p>
                    <p className="text-muted-foreground">
                      Moves: <span className="font-mono">{moves}</span>
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="px-6 py-3 rounded border-2 font-mono transition-colors"
                    style={{
                      borderColor: "var(--neon-purple)",
                      backgroundColor: "var(--neon-purple)",
                      color: "var(--background)",
                    }}
                  >
                    Play Again
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-card rounded-lg border border-border">
            <h3 className="font-mono mb-3" style={{ color: "var(--neon-purple)" }}>
              How to Play
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Click cards to flip them over</li>
              <li>• Find matching pairs of symbols</li>
              <li>• Match all 8 pairs to win</li>
              <li>• Try to complete the game in the fewest moves!</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface MemoryCardProps {
  card: Card;
  index: number;
  onClick: () => void;
}

function MemoryCard({ card, index, onClick }: MemoryCardProps) {
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="aspect-square cursor-pointer"
      onClick={onClick}
      whileHover={!isRevealed ? { scale: 1.05 } : {}}
      whileTap={!isRevealed ? { scale: 0.95 } : {}}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 rounded-lg border-2 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            borderColor: "var(--border)",
            backgroundColor: "var(--card)",
          }}
        >
          <motion.div
            className="w-full h-full rounded-lg"
            style={{
              background: `linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))`,
              opacity: 0.1,
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center font-mono text-4xl"
            style={{ color: "var(--muted-foreground)", opacity: 0.3 }}
          >
            ?
          </div>
        </div>

        {/* Card Front */}
        <div
          className="absolute inset-0 rounded-lg border-2 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: card.isMatched ? card.color : "var(--border)",
            backgroundColor: "var(--card)",
            boxShadow: card.isMatched ? `0 0 20px ${card.color}` : "none",
          }}
        >
          <motion.div
            className="text-6xl"
            style={{ color: card.color }}
            animate={
              card.isMatched
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }
                : {}
            }
            transition={
              card.isMatched
                ? {
                    duration: 0.6,
                  }
                : {}
            }
          >
            {card.symbol}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
