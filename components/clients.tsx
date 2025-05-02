const Clients = ({
  ownerName,
  partnerName,
}: {
  ownerName: string;
  partnerName: string;
}) => {
  return (
    <div>
      <p>{ownerName}</p>
      <p>{partnerName}</p>
    </div>
  );
};
export default Clients;
