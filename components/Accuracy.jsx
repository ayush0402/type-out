"use client";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import { headingAnimationColor, primaryColor } from "../constants/color";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { errors } from "./errors";

const Accuracy = (props) => {
  const elementRef = useRef(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (props.countDown === 0 || props.isFinished) {
      console.log("isFinished");
      elementRef.current.click();
    }
  });

  if (props.symbols >= 0 && props.sec >= 0) {
    let accuracy;
    if(props.total==0)accuracy=100;
    else{
    accuracy =( (props.symbols) / (props.total))*100;
    accuracy=accuracy.toPrecision(4);}

    return (
      <Div >
        <h3
          ref={elementRef}
          onClick={async () => {}}
            //props.typingCardCallback(accuracy);
           
        >
          {accuracy}%
        </h3>
      </Div>
    );
  }

  return (
    <Div>
      <h3>0%</h3>
    </Div>
  );
};

export default Accuracy;

const Div = styled.div`
  color: ${({ isSpeed }) => (isSpeed ? headingAnimationColor : primaryColor)};
  h3 {
    line-height: 0.2rem;
  }
`;