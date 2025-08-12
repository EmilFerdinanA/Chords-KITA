import { ArrowDown, ArrowUp, Music2 } from "lucide-react";

interface IProps {
  setSemitone: React.Dispatch<React.SetStateAction<number>>;
}

const TransposeButton: React.FC<IProps> = ({ setSemitone }) => {
  const handleDecrease = () => {
    setSemitone((prev) => (((prev - 1) % 12) + 12) % 12);
  };

  const handleIncrease = () => {
    setSemitone((prev) => (((prev + 1) % 12) + 12) % 12);
  };

  return (
    <div className="flex gap-2 my-4">
      <button
        className="bg-yellow-500 text-xl text-white rounded-xl h-10 w-20 flex items-center justify-center"
        onClick={handleDecrease}
      >
        <Music2 />
        <ArrowDown size={35} strokeWidth={1} />
      </button>
      <button
        className="bg-yellow-500 text-xl text-white rounded-xl h-10 w-20 flex items-center justify-center"
        onClick={handleIncrease}
      >
        <Music2 />
        <ArrowUp size={35} strokeWidth={1} />
      </button>
    </div>
  );
};

export default TransposeButton;
