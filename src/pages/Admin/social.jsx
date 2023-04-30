import { getsocial, updatesocial } from "../../firebase/cities/social";
import { useEffect, useState } from "react";

const { Typography, Grid, Box, TextField, Button } = require("@mui/material");
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const controller = new AbortController();

export const Social = ({ city }) => {
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("create");
  const [twitter, setTwitter] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getSocialData = async () => {
      const data = await getsocial(city);
      if (data.length > 0) {
        setInstagram(data[0].instagram);
        setFacebook(data[0].facebook);
        setTwitter(data[0].twitter);
        setWhatsapp(data[0].whatsapp);
        setId(data[0].id);
        setType("edit");
      } else {
        setType("create");
      }
    };

    getSocialData();

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleSubmit = async () => {
    try {
      await updatesocial({ instagram, twitter, facebook, whatsapp, city }, id, type);

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
            id="twitterInput"
            label="Twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            variant="filled"
            type="text"
            sx={{
              width: "100%",
            }}
          />

          <TextField
            id="facebookInput"
            label="Facebook"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            variant="filled"
            type="text"
          />

          <TextField
            id="instagramInput"
            label="Instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            variant="filled"
            type="text"
          />

          <TextField
            id="whatsappInput"
            label="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
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
