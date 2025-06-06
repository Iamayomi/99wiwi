import React, { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";

// Define the type for a match result
interface MatchResult {
  id: string;
  game: string;
  player: string;
  bet: number;
  result: string;
  timestamp?: Date;
}

const generateMatchResult = (): MatchResult => {
  const players = [
    "Jack Hunter",
    "Alex Smith",
    "Mike Johnson",
    "Sarah Davis",
    "Tom Wilson",
  ];
  const bets = [200, 300, 400, 500, 600, 700, 800, 900, 1000];

  return {
    id: Math.random().toString(36).substr(2, 9),
    game: "Roulette",
    player: players[Math.floor(Math.random() * players.length)],
    bet: bets[Math.floor(Math.random() * bets.length)],
    result: "WIN",
    timestamp: new Date(),
  };
};

const Leaderboard: React.FC = () => {
  const [matches, setMatches] = useState<MatchResult[]>([]);

  // Load initial leaderboard data by default
  useEffect(() => {
    const initialMatches: MatchResult[] = [
      {
        id: "1",
        game: "Roulette",
        player: "Jack Hunter",
        bet: 200,
        result: "WIN",
      },
      {
        id: "2",
        game: "Roulette",
        player: "Alex Smith",
        bet: 300,
        result: "WIN",
      },
      {
        id: "3",
        game: "Roulette",
        player: "Mike Johnson",
        bet: 500,
        result: "WIN",
      },
      {
        id: "4",
        game: "Roulette",
        player: "Sarah Davis",
        bet: 400,
        result: "WIN",
      },
      {
        id: "5",
        game: "Roulette",
        player: "Tom Wilson",
        bet: 600,
        result: "WIN",
      },
    ];
    setMatches(initialMatches);
  }, []);

  // Update leaderboard periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newMatch = generateMatchResult();
      setMatches((prev) => [newMatch, ...prev.slice(0, 4)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-tr from-black/20 via-red-900/95 to-red-800/95 backdrop-blur-sm rounded-lg shadow-2xl border border-red-500/30">
      <div className="flex items-center gap-2 p-3 pb-2.5">
        <BarChart3 className="w-4 h-4 text-white" />
        <h3 className="text-white font-medium text-sm">Leaderboard</h3>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs">LIVE</span>
        </div>
      </div>
      <div className="px-3 pb-3 space-y-1.5">
        {matches.map((match, index) => (
          <div
            key={match.id}
            className={`bg-black/60 rounded px-3 py-2.5 border border-red-400/20 transition-all duration-500 ${
              index === 0
                ? "animate-pulse bg-green-900/20 border-green-400/30"
                : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-xs font-medium">
                {match.game}
              </span>
              <div className="w-0.5 h-3 bg-gray-500"></div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-blue-400/50">
                  <img
                    src={`https://i.pravatar.cc/40?u=${match.player}`}
                    alt={match.player}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-xs">{match.player}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center text-[8px]">
                  💰
                </div>
                <span className="text-white text-xs">Bet: ${match.bet}</span>
              </div>
              <div className="bg-green-600 px-1.5 py-0.5 rounded text-white text-xs font-medium">
                {match.result}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
