import { FaBolt } from "react-icons/fa";

interface CardProps {
  color: string;
  img: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ color, img, text }) => {
  return (
    <div
      className={`min-w-52 flex-1 flex flex-col items-start ${color} relative p-6 rounded-lg overflow-hidden`}
    >
      <img
        src={img}
        alt="Card background"
        className="w-full h-full absolute top-0 left-0 object-cover"
      />
      <div className={`absolute inset-0 ${color} opacity-70`} />
      <div className="relative flex items-center p-1 bg-black/20 gap-2 justify-start rounded-lg uppercase text-xs">
        <div className="bg-black/50 p-1 text-xs rounded-lg">
          <FaBolt />
        </div>
        <span className="pr-px">Receive</span>
      </div>
      <div className="relative w-3/4 font-bold text-xl">{text}</div>
    </div>
  );
};

export default Card;
