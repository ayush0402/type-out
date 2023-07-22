import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  headingAnimationColor,
  headingColor,
  primaryColor,
  success,
} from "../constants/color";

const NavHeader = ({ currentSpeed }) => {
  const [highestSpeed, setHighestSpeed] = useState(0);
  const [isTrue, setIsTrue] = useState(false);

  /* Here we are setting highest speed only when highest speed is 
      less than highestSpeed
  */
  if (highestSpeed < currentSpeed) {
    setHighestSpeed(currentSpeed);
    setIsTrue(true);
  }

  if (isTrue) {
    // setting data to the local storage
    localStorage.setItem("highestSpeed", highestSpeed);
    localStorage.setItem("isTrue", isTrue);
  }

  useEffect(() => {
    // retriving data from the local storage
    const isTrue = localStorage.getItem("isTrue") === "true";
    const highestSpeed = isTrue ? localStorage.getItem("highestSpeed") : "";
    setHighestSpeed(highestSpeed);
  }, []);

  return (
    <MainDiv>
      <HighestSpeedContainer isTrue={isTrue} currentSpeed={currentSpeed}>
        <h2>
          Highest Speed:{" "}
          <span>
            {currentSpeed >= highestSpeed ? currentSpeed : highestSpeed} wpm{" "}
          </span>{" "}
        </h2>
      </HighestSpeedContainer>
    </MainDiv>
  );
};

export default NavHeader;

const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
const HighestSpeedContainer = styled.div`
  h2 {
    padding-right: 50px;
    color: ${({ isTrue, currentSpeed }) =>
      isTrue ? primaryColor : headingColor};
    font-weight: bold;

    span {
      color: ${({ isTrue, currentSpeed }) =>
        isTrue ? success : headingAnimationColor};
    }
  }
  z-index: 20;
  position: relative;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 0;

  h1 {
    margin-left: 1rem;
    color: ${headingColor};
    font-size: 1.5rem;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    line-height: 2rem;

    ::before {
      content: attr(data-text);
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      border-right: 3px solid ${headingAnimationColor};
      color: ${headingAnimationColor};
      overflow: hidden;

      animation: animate 6s linear infinite alternate;
      --webkit-animation: animate 6s linear infinite alternate;

      @keyframes animate {
        0% {
          width: 0;
        }
        50% {
          width: 100%;
        }
        100% {
          width: 0;
        }
      }
    }

    @media (min-width: 768px) {
      font-size: 1.8rem;
      line-height: 2.3rem;
    }
  }
`;
