import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import Glowcard from "../_component/glowcard";

interface GameCardProps {
  img: string;
  color?: string;
  name: string;
  desc: string;
}

const GameCard: React.FC<GameCardProps> = ({
  img,
  color = "bg-primary border-primary",
  name,
  desc,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Glowcard color={color} size="12rem" position="50% 100%">
      <div
        className="flex flex-col items-start p-4 rounded-lg relative overflow-hidden min-h-72 group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background Image */}
        <img
          src={img}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Title */}
        <div
          className={`uppercase font-medium text-xs absolute top-0 left-1/2 -translate-x-1/2 ${color} p-0.5 px-2 whitespace-nowrap`}
        >
          {name}
        </div>

        {/* Description */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          {desc}
        </div>

        {/* Overlay with Play Button */}
        <div
          className={`absolute inset-0 ${color} bg-opacity-50 flex flex-col items-center justify-between py-10 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-lg uppercase font-bold">{name}</div>

          <button
            className={`${color} flex items-center rounded-lg p-2 relative text-lg gap-2`}
          >
            Play
            <FaPlay className="text-white" />
          </button>
        </div>
      </div>
    </Glowcard>
  );
};

export default GameCard;
