import { getlocalizacao, updatelocalizacao } from "../../firebase/cities/localizacao";
import { useEffect, useState } from "react";

const { Typography, Grid, Box, TextField, Button } = require("@mui/material");
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const Localizacao = ({ city }) => {
  const [localizacao, setLocalizacao] = useState("");
  const [address, setAddress] = useState("");

  const [id, setId] = useState("");
  const [type, setType] = useState("create");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getLocalizacaoData = async () => {
      const data = await getlocalizacao(city);
      if (data.length > 0) {
        setAddress(data[0].address);
        setLocalizacao(data[0].localizacao);
        setId(data[0].id);
        setType("edit");
      } else {
        setType("create");
      }
    };

    getLocalizacaoData();
  }, [city, id]);

  const handleSubmit = async () => {
    try {
      await updatelocalizacao({ address, localizacao, city }, id, type);

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
            id="AddressInput"
            label="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="filled"
            type="text"
            sx={{
              width: "100%",
            }}
          />

          <TextField
            id="iframeInput"
            label="Localização - Iframe"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
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
