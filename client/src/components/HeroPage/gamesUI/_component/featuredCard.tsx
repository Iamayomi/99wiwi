import { FaArrowRight } from "react-icons/fa";
// import { useNavigate } from "react-router";
import Glowcard from "../_component/glowcard";

interface FeaturedCardProps {
  img: string;
  color?: string;
  name: string;
  path: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  img,
  color = "bg-primary border-primary",
  name,
  path,
}) => {
  // const navigate = useNavigate();

  return (
    <Glowcard color={color} size="8rem" position="100%">
      <div className="flex flex-col items-start p-4  rounded-lg relative overflow-hidden">
        <img src={img} alt={name} className="absolute -right-10 -bottom-5" />
        <div className="uppercase font-medium mb-6 relative bg-black/30 rounded-lg px-1">
          {name}
        </div>
        {/* <button
          onClick={() => navigate(path)}
          className={`${color} rounded-lg p-2 relative cursor-pointer`}
        > */}
        <FaArrowRight />
        {/* </button> */}
      </div>
    </Glowcard>
  );
};

export default FeaturedCard;
