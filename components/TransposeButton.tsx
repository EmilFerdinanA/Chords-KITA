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
    <>
      <button onClick={handleDecrease}>Turun (-)</button>
      <button onClick={handleIncrease}>Naik (+)</button>
    </>
  );
};

export default TransposeButton;
