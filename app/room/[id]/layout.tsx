import { Viewport } from "next";

export const viewport: Viewport = {
  interactiveWidget: "resizes-content",

};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default Layout;
