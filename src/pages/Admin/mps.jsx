import { getmps, updatemps } from "../../firebase/cities/mps";
import { useEffect, useState } from "react";
import { z } from "zod";

const { Typography, Grid, Box, TextField, Button, Divider } = require("@mui/material");
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const MPS = ({ city }) => {
  const [mp1Title, setMp1Title] = useState("");
  const [mp1Desc, setMp1Desc] = useState("");
  const [mp2Title, setMp2Title] = useState("");
  const [mp2Desc, setMp2Desc] = useState("");
  const [mp3Title, setMp3Title] = useState("");
  const [mp3Desc, setMp3Desc] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("create");

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getEmailData = async () => {
      const data = await getmps(city);
      if (data.length > 0) {
        setMp1Desc(data[0].mp1Desc);
        setMp1Title(data[0].mp1Title);
        setMp2Desc(data[0].mp2Desc);
        setMp2Title(data[0].mp2Title);
        setMp3Desc(data[0].mp3Desc);
        setMp3Title(data[0].mp3Title);
        setId(data[0].id);
        setType("edit");
      } else {
        setType("create");
      }
    };

    getEmailData();
  }, [city, id]);

  const handleSubmit = async () => {
    try {
      await updatemps({ mp1Desc, mp1Title, mp2Desc, mp2Title, mp3Desc, mp3Title, city }, id, type);

      setShowAlert(true);

      setInterval(() => {
        setShowAlert(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12}>
        <Stack sx={{ width: "100%", display: showAlert ? "block" : "none" }} spacing={2}>
          <Alert severity="success">Dados alterados com sucesso</Alert>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="mp1TitleInput"
            label="MP1 - Title"
            value={mp1Title}
            onChange={(e) => setMp1Title(e.target.value)}
            variant="filled"
            type="texg"
            sx={{
              width: "100%",
            }}
          />

          <TextField
            id="mp1DescInput"
            label="MP1 - Desc"
            value={mp1Desc}
            onChange={(e) => setMp1Desc(e.target.value)}
            variant="filled"
            type="text"
          />

          <Divider />
          <TextField
            id="mp2TitleInput"
            label="MP2 - Title"
            value={mp2Title}
            onChange={(e) => setMp2Title(e.target.value)}
            variant="filled"
            type="texg"
            sx={{
              width: "100%",
            }}
          />

          <TextField
            id="mp2DescInput"
            label="MP2 - Desc"
            value={mp2Desc}
            onChange={(e) => setMp2Desc(e.target.value)}
            variant="filled"
            type="text"
          />

          <Divider />

          <TextField
            id="mp3TitleInput"
            label="MP3 - Title"
            value={mp3Title}
            onChange={(e) => setMp3Title(e.target.value)}
            variant="filled"
            type="texg"
            sx={{
              width: "100%",
            }}
          />

          <TextField
            id="mp3DescInput"
            label="MP3 - Desc"
            value={mp3Desc}
            onChange={(e) => setMp3Desc(e.target.value)}
            variant="filled"
            type="text"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#00563B", color: "#fff" }}
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
