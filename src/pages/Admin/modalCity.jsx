import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteCity, getCities, updateCity } from "../../firebase/cities/index";
import { Select, MenuItem } from "@mui/material";
import { z } from "zod";

const states = [
  { name: "Acre", abbreviation: "AC" },
  { name: "Alagoas", abbreviation: "AL" },
  { name: "Amapá", abbreviation: "AP" },
  { name: "Amazonas", abbreviation: "AM" },
  { name: "Bahia", abbreviation: "BA" },
  { name: "Ceará", abbreviation: "CE" },
  { name: "Distrito Federal", abbreviation: "DF" },
  { name: "Espírito Santo", abbreviation: "ES" },
  { name: "Goiás", abbreviation: "GO" },
  { name: "Maranhão", abbreviation: "MA" },
  { name: "Mato Grosso", abbreviation: "MT" },
  { name: "Mato Grosso do Sul", abbreviation: "MS" },
  { name: "Minas Gerais", abbreviation: "MG" },
  { name: "Pará", abbreviation: "PA" },
  { name: "Paraíba", abbreviation: "PB" },
  { name: "Paraná", abbreviation: "PR" },
  { name: "Pernambuco", abbreviation: "PE" },
  { name: "Piauí", abbreviation: "PI" },
  { name: "Rio de Janeiro", abbreviation: "RJ" },
  { name: "Rio Grande do Norte", abbreviation: "RN" },
  { name: "Rio Grande do Sul", abbreviation: "RS" },
  { name: "Rondônia", abbreviation: "RO" },
  { name: "Roraima", abbreviation: "RR" },
  { name: "Santa Catarina", abbreviation: "SC" },
  { name: "São Paulo", abbreviation: "SP" },
  { name: "Sergipe", abbreviation: "SE" },
  { name: "Tocantins", abbreviation: "TO" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalCity = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      setNameError(false);
      setNameErrorMessage("");
      const userSchema = z.object({
        name: z.string().min(3, { message: "O nome precisa ter pelo menos 3 caracteres" }),
        state: z.string().min(2, { message: "O estado é obrigatório" }),
      });

      const validationSchema = userSchema.parse({ name, state });
      await updateCity({ name: validationSchema.name, state: validationSchema.state });
      handleClose();
    } catch (err) {
      const existsErrorName = "name" in err.formErrors.fieldErrors;
      const existsErrorState = "state" in err.formErrors.fieldErrors;
      if (existsErrorName || existsErrorState) {
        setNameError(true);
        setNameErrorMessage(
          err.formErrors.fieldErrors.name[0] || err.formErrors.fieldErrors.state[0]
        );
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h3" component="h2">
          Adicionar Cidade
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2, width: "100%" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={nameError}
              id="nameInput"
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={nameErrorMessage}
              variant="outlined"
              type="Name"
            />

            <Box>
              <Typography variant="h6">Estado: </Typography>
              <Select
                value={state}
                onChange={(event) => setState(event.target.value)}
                label="Estado"
                sx={{
                  width: "100%",
                  color: "red",
                  // backgroundColor: "red",
                }}
                InputLabelProps={{
                  style: { color: "red" },
                }}
                inputProps={{ style: { color: "red" } }}
              >
                {states.map((state) => (
                  <MenuItem key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
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
          <Button
            variant="contained"
            sx={{ backgroundColor: "#660000", color: "#fff" }}
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
