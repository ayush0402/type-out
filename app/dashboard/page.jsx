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
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const formattedTime = (rawTime) => {
  const date = new Date(rawTime);
  return date.toLocaleString();
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [topSpeed, setTopSpeed] = useState(0);

  const supabase = createClientComponentClient();

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError) {
          errors.add(userError.message);
          throw userError;
        }
        const { data, error } = await supabase
          .from("individual_session_data")
          .select("*");
        if (error) {
          errors.add(error.message);
          throw error;
        }

        const filteredData = data.filter(
          (item) => item.user_id === user.user.id
        );
        setData(filteredData);

        // Calculate average and top speed
        if (filteredData.length > 0) {
          let sumSpeed = 0;
          let maxSpeed = filteredData[0].speed;
          for (const item of filteredData) {
            sumSpeed += item.speed;
            if (item.speed > maxSpeed) {
              maxSpeed = item.speed;
            }
          }
          setAvgSpeed(sumSpeed / filteredData.length);
          setTopSpeed(maxSpeed);
        } else {
          setAvgSpeed(0);
          setTopSpeed(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-foreground text-xl mt-10">Dashboard</h1>
        <div className="mt-20" style={{ display: "flex", gap: "20px" }}>
          <Card sx={{ maxWidth: 275, minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Average Speed
              </Typography>
              <Typography variant="h5" component="div">
                {avgSpeed}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                wpm
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ maxWidth: 275, minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Top Speed
              </Typography>
              <Typography variant="h5" component="div">
                {topSpeed}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                wpm
              </Typography>
            </CardContent>
          </Card>
        </div>
        <TableContainer className="mt-20" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
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

export default Dashboard;
