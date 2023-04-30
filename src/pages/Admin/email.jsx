import { getemails, updateemails } from "../../firebase/cities/email";
import { useEffect, useState } from "react";
import { z } from "zod";

const { Typography, Grid, Box, TextField, Button } = require("@mui/material");
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const Email = ({ city }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("create");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getEmailData = async () => {
      const data = await getemails(city);
      if (data.length > 0) {
        setEmail(data[0].email);
        setPassword(data[0].password);
        setId(data[0].id);
        setType("edit");
      } else {
        setType("create");
      }
    };

    getEmailData();
  }, [city]);

  const handleSubmit = async () => {
    try {
      setEmailError(false);
      setEmailErrorMessage("");
      setPasswordError(false);
      setPasswordErrorMessage("");

      const emailSchema = z.object({
        email: z.string().email({ message: "Informe um e-mail valido." }),
        password: z.string().min(3, { message: "A Senha é obrigatória" }),
      });

      const dataValidate = emailSchema.parse({ email, password });

      await updateemails(
        { email: dataValidate.email, password: dataValidate.password, city },
        id,
        type
      );

      setShowAlert(true);

      setInterval(() => {
        setShowAlert(false);
      }, 3000);
    } catch (err) {
      const existsErrorEmail = "email" in err.formErrors.fieldErrors;
      const existsErrorPassword = "password" in err.formErrors.fieldErrors;
      if (existsErrorEmail) {
        setEmailError(true);
        setEmailErrorMessage(err.formErrors.fieldErrors.email[0]);
      }
      if (existsErrorPassword) {
        setPasswordError(true);
        setPasswordErrorMessage(err.formErrors.fieldErrors.password[0]);
      }
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
            error={emailError}
            id="emailInput"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={emailErrorMessage}
            variant="filled"
            type="email"
            sx={{
              width: "100%",
            }}
          />

          <TextField
            error={passwordError}
            id="passwordInput"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            type="password"
            helperText={passwordErrorMessage}
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
