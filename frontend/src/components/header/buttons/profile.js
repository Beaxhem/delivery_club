import React, { useState } from "react";
import Modal from "./profile_modal";

export const ProfilePC = () => {
  const [opened, set_opened] = useState(false);

  return (
    <>
      <span
        onClick={() => set_opened(!opened)}
        style={{ borderLeft: "1px solid #e3e4e6" }}
        className="button"
      >
        <span>Profile</span>
      </span>
      <Modal opened={opened} />
    </>
  );
};
