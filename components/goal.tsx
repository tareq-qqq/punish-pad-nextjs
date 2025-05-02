const Goal = ({
  phrase,
  repetitions,
}: {
  phrase: string;
  repetitions: number;
}) => {
  return (
    <div>
      <p>You have to type: {phrase}</p>
      <p>You have to repeat it: {repetitions} times</p>
    </div>
  );
};
export default Goal;
