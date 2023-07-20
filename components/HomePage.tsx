"use client";
import { useState } from "react";
import TypingCard from "@/components/TypingCard";
import NavHeader from "./NavHeader";

const HomePage = () => {
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const homePageCallBack = (speed: any) => {
    setCurrentSpeed(speed);
  };

  return (
    <div>
      <div>
        <NavHeader currentSpeed={currentSpeed} />
        <div>
          <TypingCard homePageCallBack={homePageCallBack} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
