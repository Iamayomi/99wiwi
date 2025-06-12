import IMAGES from "@/images";
import GameCard from "./HeroPage/gamesUI/_component/gameCard";
import Card from "./HeroPage/gamesUI/_component/card";

const games = [
  {
    name: "Blackjack Game",
    img: IMAGES.blackjack,
    color: "bg-black border-black",
  },

  {
    name: "Crash Game",
    img: IMAGES.crash,
    color: "bg-yellow-500 border-yellow-500",
  },

  { name: "Dice Game", img: IMAGES.dice, color: "bg-primary border-primary" },
  {
    name: "Slots Game",
    img: IMAGES.bacarat,
    color: "bg-yellow-500 border-yellow-500",
  },

  {
    name: "Roulette Game",
    img: IMAGES.rocket,
    color: "bg-primary border-primary",
  },
];

const GamesCard = () => {
  return (
    <>
      {/* Top Banner Cards */}
      <div className="flex overflow-x-auto gap-4 mb-6">
        <Card
          color="bg-primary text-white"
          img={IMAGES.welcome2}
          text="Real-Time Live Games"
        />
        <Card
          color="bg-purple-500 text-white"
          img={IMAGES.treasure}
          text="Instant Payouts"
        />
        <Card
          color="bg-green-500 text-white"
          img={IMAGES.welcomebonus}
          text="Gaming Community Vibes"
        />
      </div>
      {/* Other Games */}
      {/* <div className="uppercase mb-2"> Games</div> */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {games.map((game) => (
          <a
            key={game.name}
            href={`/${game.name.toLowerCase().replace(/game/gi, "").trim()}`}
          >
            <GameCard {...game} />
          </a>
        ))}
      </div>
    </>
  );
};

export default GamesCard;
