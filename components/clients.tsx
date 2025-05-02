import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Clients = ({
  ownerName,
  partnerName,
}: {
  ownerName: string;
  partnerName: string;
}) => {
  return (
    <Card>
      <CardHeader className="py-2">
        <CardTitle className="text-base">Room Participants</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-muted-foreground text-xs font-medium">Owner</p>
            <p className="text-sm font-medium">{ownerName}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-medium">
              Punished
            </p>
            <p className="text-sm font-medium">{partnerName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Clients;
