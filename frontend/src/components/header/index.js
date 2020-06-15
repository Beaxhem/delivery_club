import React from "react";
import PC from "./responsiveness/pc";
import Mobile from "./responsiveness/mobile";
import EmptyHeader from "./empty_header";

const Header = () => {
  return <EmptyHeader pc_buttons={<PC />} mobile_buttons={<Mobile />} />;
};

export default Header;
