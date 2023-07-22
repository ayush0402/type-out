"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { errors } from "@/components/errors";
import { useState } from "react";
import { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
} from "@mui/material";

const formattedTime = (rawTime) => {
  const date = new Date(rawTime);
  return date.toLocaleString();
};

const Leaderboard = () => {
  const [data, setData] = useState([]);

  const supabase = createClientComponentClient();

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("individual_session_data")
          .select("*");
        if (error) {
          errors.add(error.message);
          throw error;
        }
        const sortedData = data.sort((a, b) => b.speed - a.speed);
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
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
      <Container className="mt-20">
        <h1 className="text-foreground text-xl mt-10">Leaderboard</h1>
        <h1 className="text-foreground text-lg">Global ranking based on wpm</h1>
        <TableContainer className="mt-20" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Player</TableCell>
                <TableCell align="right">Speed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {formattedTime(row.created_at)}
                  </TableCell>
                  <TableCell align="centre">
                    {row.email.split("@")[0]}
                  </TableCell>
                  <TableCell align="right">{row.speed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Leaderboard;
