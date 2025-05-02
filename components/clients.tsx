const Clients = ({
  ownerName,
  partnerName,
}: {
  ownerName: string;
  partnerName: string;
}) => {
  return (
    <div>
      <p>Owner: {ownerName}</p>
      <p>Punished: {partnerName}</p>
    </div>
  );
};
export default Clients;
