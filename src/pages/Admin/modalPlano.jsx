import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { deletePlans, getPlans, updatePlans, getPlan } from "../../firebase/cities/planos";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { z } from "zod";
const controller = new AbortController();

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

export const ModalPlano = ({ open, handleClose, city, selectionModel, type }) => {
  const [mb, setMb] = useState("100");
  const [value, setValue] = useState("50");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState({});

  if (type == "edit") {
    useEffect(() => {
      const getPlanData = async () => {
        const plan = await getPlan(selectionModel);
        setMb(plan.mb);
        setValue(plan.value);
        setState({
          ...state,
          destaque: plan.destaque,
          instalacaoGratis: plan.instalacaoGratis,
          image: plan.image,
          wifi: plan.wifi,
          roteador5g: plan.roteador5g,
          tvGratis: plan.tvGratis,
        });
      };

      getPlanData();
      return () => {
        controller.abort();
      };
    }, [selectionModel]);
  } else {
    useEffect(() => {
      setState({
        ...state,
        destaque: false,
        instalacaoGratis: true,
        image: true,
        wifi: true,
        roteador5g: true,
        tvGratis: true,
      });
      return () => {
        controller.abort();
      };
    }, [selectionModel]);
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    try {
      setError(false);
      setErrorMessage("");
      const plannsSchema = z.object({
        value: z.string({ message: "O valor é obrigatporio" }),
        mb: z.string({ message: "O megabytes é obrigatporio" }),
      });

      const validationSchema = plannsSchema.parse({ value, mb });
      await updatePlans(
        {
          mb: validationSchema.mb,
          value: validationSchema.value,
          instalacaoGratis: state.instalacaoGratis,
          image: state.image,
          wifi: state.wifi,
          roteador5g: state.roteador5g,
          destaque: state.destaque,
          tvGratis: state.tvGratis,
          city,
        },
        selectionModel,
        type
      );
      handleClose();
    } catch (err) {
      if (err.formErrors.fieldErrors) {
        setError(true);
        setErrorMessage("Valor e Megabytes são campos obrigatórios.");
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
          Adicionar Plano
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
            <Grid container>
              <Grid item sx={12}>
                <TextField
                  error={error}
                  id="mb"
                  label="MegaBytes"
                  value={mb}
                  helperText={errorMessage}
                  onChange={(e) => setMb(e.target.value)}
                  variant="outlined"
                  type="number"
                />
                <TextField
                  error={error}
                  id="mb"
                  label="Valor R$"
                  helperText={errorMessage}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  variant="outlined"
                  type="number"
                />
              </Grid>

              <Grid item sx={12}>
                <FormControl component="fieldset" variant="standard">
                  <FormLabel component="legend">Caracteristicas</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={state.wifi} onChange={handleChange} name="wifi" />}
                      label="Wifi"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.instalacaoGratis}
                          onChange={handleChange}
                          name="instalacaoGratis"
                        />
                      }
                      label="Instalação Gratis"
                    />
                    <FormControlLabel
                      control={
                        <Switch checked={state.image} onChange={handleChange} name="image" />
                      }
                      label="Logo"
                    />
                    <FormControlLabel
                      control={
                        <Switch checked={state.tvGratis} onChange={handleChange} name="tvGratis" />
                      }
                      label="TV Gratis"
                    />
                    <FormControlLabel
                      control={
                        <Switch checked={state.destaque} onChange={handleChange} name="destaque" />
                      }
                      label="Destaque"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
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
