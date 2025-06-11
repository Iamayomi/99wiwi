import { useEffect, useState } from "react";
import { useLocation } from "wouter"; // assuming you use wouter for routing
import Card from "./_component/card";
import FeaturedCard from "./_component/featuredCard";
import GameCard from "./_component/gameCard";
import LiveCard from "./_component/liveGameCard";
import Glowcard from "./_component/glowcard";
import IMAGES from "../../../images";
import axios from "axios";

const featuredGames = [
  {
    name: "Rock, Paper",
    img: "https://script.viserlab.com/xaxino/demo/assets/templates/basic//images/play/rock.png",
    color: "bg-yellow-600 border-yellow-600",
    path: "/rock_game",
  },
  {
    name: "Coin Flip",
    img: "https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/head.png",
    color: "bg-primary border-primary",
    path: "/coin_flip",
  },
  {
    name: "Roll",
    img: IMAGES.roll,
    color: "bg-yellow-500 border-yellow-500",
    path: "/spin_game",
  },
  {
    name: "Dice Duel",
    img: IMAGES.dice,
    color: "bg-primary border-primary",
    path: "/dice_game",
  },
  {
    name: "Guess The Number",
    img: IMAGES.bacarat,
    color: "bg-primary border-primary",
    path: "/guessing_game",
  },
];

const liveGamesFallback = [
  {
    name: "Roulett",
    img: "https://script.viserlab.com/xaxino/assets/images/games/Roulette.jpg",
    color: "bg-yellow-600 border-yellow-600",
    path: "/rock_game",
  },
  {
    name: "BlackJack",
    img: "https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/head.png",
    color: "bg-primary border-primary",
    path: "/coin_flip",
  },
  {
    name: "Baccarat",
    img: IMAGES.roll,
    color: "bg-yellow-500 border-yellow-500",
    path: "/spin_game",
  },
  {
    name: "Fighting Chicken",
    img: IMAGES.dice,
    color: "bg-primary border-primary",
    path: "/dice_game",
  },
  {
    name: "CrashGame",
    img: IMAGES.crash,
    color: "bg-primary border-primary",
    path: "/dice_game",
  },
];

const otherGames = [
  {
    name: "Blackjack",
    img: IMAGES.blackjack,
    color: "bg-black border-black",
  },
  { name: "Mines", img: IMAGES.mine, color: "bg-primary border-primary" },
  {
    name: "Case battle",
    img: IMAGES.case_battle,
    color: "bg-yellow-600 border-yellow-600",
  },
  { name: "CrashGame", img: IMAGES.crash, color: "bg-primary border-primary" },
  { name: "Roll", img: IMAGES.roll, color: "bg-yellow-500 border-yellow-500" },
  { name: "Dice Duel", img: IMAGES.dice, color: "bg-primary border-primary" },
  {
    name: "BaccaratGame",
    img: IMAGES.bacarat,
    color: "bg-primary border-primary",
  },

  {
    name: "RouletteGame",
    img: IMAGES.rocket,
    color: "bg-primary border-primary",
  },
  {
    name: "SlideGame",
    img: IMAGES.case_battle,
    color: "bg-primary border-primary",
  },
  { name: "VideoPoker", img: IMAGES.roll, color: "bg-primary border-primary" },
];

const GamingUI = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Games");
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("https://ggwiwigamesbe.onrender.com/admin/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  // Filter games by category & search text
  const filteredGames =
    games.length > 0
      ? games.filter((game) => {
          // Filter by category unless 'All Games' selected
          if (selectedCategory !== "All Games" && game.category !== selectedCategory) return false;
          // Filter by search (case insensitive)
          if (search && !(game.gameName || game.name || "").toLowerCase().includes(search.toLowerCase())) return false;
          return true;
        })
      : [];

  // Use fallback if no fetched games
  const liveGamesToShow = games.length > 0 ? filteredGames : liveGamesFallback;
  const featuredGamesToShow = games.length > 0 ? filteredGames : featuredGames;

  // Helper for building path with query string if slug present
  const buildPath = (game) => (game.slug ? `/${game.slug}?id=${game._id}` : game.path || `/${game.name?.toLowerCase().replace(/\s+/g, "_")}`);

  return (
    <div className="text-white px-4 md:px-8">
      {/* Top Banner Cards */}
      <div className="flex overflow-x-auto gap-4 mb-6">
        <Card color="bg-primary text-white" img={IMAGES.welcome2} text="Real-Time Live Games" />
        <Card color="bg-purple-500 text-white" img={IMAGES.treasure} text="Instant Payouts" />
        <Card color="bg-green-500 text-white" img={IMAGES.welcomebonus} text="Gaming Community Vibes" />
      </div>

      {/* Search + Sort */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for games"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 p-3 rounded-lg w-full text-white placeholder:text-gray-400"
        />
        <button
          className="bg-gray-700 px-4 py-2 rounded-lg"
          onClick={() => {
            // For now just reset search (you can add real sort logic here)
            setSearch("");
          }}>
          Sort
        </button>
      </div>

      {/* Live Games */}
      <div className="uppercase mb-2">Live Casino Games</div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {liveGamesToShow.map((game) => (
          <LiveCard key={game._id || game.name} path={buildPath(game)} name={game.gameName || game.name} img={game.image || game.img} color={game.color} onClick={() => setLocation(buildPath(game))} />
        ))}
      </div>

      {/* Featured or Fetched Games */}
      <div className="uppercase mb-2">{selectedCategory}</div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {featuredGamesToShow.map((game) => (
          <FeaturedCard
            key={game._id || game.name}
            path={buildPath(game)}
            name={game.gameName || game.name}
            img={game.image || game.img}
            color={game.color}
            onClick={() => setLocation(buildPath(game))}
          />
        ))}
      </div>

      {/* Other Games */}
      <div className="uppercase mb-2">Other Games</div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {otherGames.map((game) => (
          <a key={game.name} href={`/${game.name.toLowerCase().replace(/\s+/g, "_")}`}>
            <GameCard {...game} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default GamingUI;
