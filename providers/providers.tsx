import RoomProvider from "./room-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <RoomProvider>{children}</RoomProvider>;
};
export default Providers;
