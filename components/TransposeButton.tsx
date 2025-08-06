import { ArrowDown, ArrowUp } from "lucide-react";

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
    <div className="flex gap-2">
      <button
        className="bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center"
        onClick={handleDecrease}
      >
        <ArrowDown size={20} />
      </button>

      <button
        className="bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center"
        onClick={handleIncrease}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default TransposeButton;
