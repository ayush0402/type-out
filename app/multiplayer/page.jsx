"use client";
import React from "react";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import CreateGame from "./create/page";
//import {createBrowserHistory} from 'History';
//const history =createBrowserHistory();
const socket = io("http://localhost:5000");
const page = () => {
  const [gameState, setGameState] = useState({
    _id: "",
    isOpen: false,
    players: [],
    words: [],
  });
  useEffect(() => {
    socket.on("updateGame", (game) => {
      console.log(game);
      setGameState(game);
      //
      socket.emit("msg", "Thanks for connecting");
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);
  useEffect(() => {
    if (gameState._id != "") {
      //history.push(`/game/${game._id}`);
    }
  }, [gameState._id]);
  return (
    <div>
      <a
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </a>
    </div>
  );
};

export default page;
