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
  const [avgaccuracy,setAvgAccuray] =useState(0);
  const [topAccuracy,setTopAccuracy]=useState(0);
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

        filteredData.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        setData(filteredData.reverse());

        // Calculate average and top speed
        if (filteredData.length > 0) {
          let sumSpeed = 0;
          let maxSpeed = filteredData[0].speed;
          let maxAccuracy=filteredData[0].accuracy;
          let avgaccuracy=0;
          for (const item of filteredData) {
            sumSpeed += item.speed;
            avgaccuracy+=item.accuracy;
            if (item.speed > maxSpeed) {
              maxSpeed = item.speed;
              
            }
            if(item.accuracy>maxAccuracy){
              maxAccuracy=item.accuracy;
            }
          }
          setAvgSpeed((sumSpeed / filteredData.length).toFixed(2));
          setAvgAccuray((avgaccuracy / filteredData.length).toFixed(2));
          setTopAccuracy(maxAccuracy);
          setTopSpeed(maxSpeed);
        } else {
          setAvgSpeed(0);
          setTopSpeed(0);
          setAvgAccuray(0);
          setTopAccuracy(0);
        }
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
          <Card sx={{ maxWidth: 275, minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Average Accuracy
              </Typography>
              <Typography variant="h5" component="div">
                {avgaccuracy}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                %
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
                Top Accuracy
              </Typography>
              <Typography variant="h5" component="div">
                {topAccuracy}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                %
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
