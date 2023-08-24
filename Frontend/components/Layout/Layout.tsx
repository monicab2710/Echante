import React, { FC } from "react";
import Header from "../Header";

const Layout: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
