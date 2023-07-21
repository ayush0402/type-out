"use client";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import { headingAnimationColor, primaryColor } from "../constants/color";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { errors } from "./errors";

const Speed = (props) => {
  const elementRef = useRef(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (props.countDown === 0 || props.isFinished) {
      console.log("isFinished");
      elementRef.current.click();
    }
  });

  if (props.symbols !== 0 && props.sec !== 0) {
    const wpm = props.symbols / 5 / (props.sec / 60);

    return (
      <Div isSpeed={wpm >= 50}>
        <h3
          ref={elementRef}
          onClick={async () => {
            props.typingCardCallback(Math.round(wpm));
            const user = await supabase.auth.getUser();

            if (user) {
              const { data, error } = await supabase
                .from("individual_session_data")
                .insert({
                  user_id: user.data.user.id,
                  email: user.data.user.email,
                  speed: Math.round(wpm),
                  accuracy: 0,
                })
                .select("*")
                .single();

              if (error) {
                errors.add(error.message);
                throw error;
              }
              console.log("saved", data);
            }
          }}
        >
          {Math.round(wpm)} wpm
        </h3>
      </Div>
    );
  }

  return (
    <Div>
      <h3>0 wpm</h3>
    </Div>
  );
};

export default Speed;

const Div = styled.div`
  color: ${({ isSpeed }) => (isSpeed ? headingAnimationColor : primaryColor)};
  h3 {
    line-height: 0.2rem;
  }
`;
