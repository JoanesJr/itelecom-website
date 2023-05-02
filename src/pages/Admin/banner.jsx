import { getbanner, updatebanner } from "../../firebase/cities/banner";
import { useEffect, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { fileStorage as storage } from "../../firebase/index";

import LinearProgress from "@mui/material/LinearProgress";
const { Typography, Grid, Box, TextField, Button } = require("@mui/material");
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const controller = new AbortController();

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export const Banner = ({ city }) => {
  const [id, setId] = useState("");
  const [type, setType] = useState("create");
  const [showAlert, setShowAlert] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState("");
  const [progressPorcent, setPorgessPorcent] = useState(0);

  const submitFirestore = async (img, name) => {
    try {
      await updatebanner({ imageURL: img, name, city }, id, type);

      setShowAlert(true);

      setInterval(() => {
        setShowAlert(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;
    setIsUploading(true);
    setImgURL("");

    const storageRef = ref(storage, `images/${file.name}-${city}`);
    const deleteRef = ref(storage, `images/${name}-${city}`);
    deleteObject(deleteRef)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPorgessPorcent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
          setIsUploading(false);
          setName(file.name);
          submitFirestore(downloadURL, file.name);
        });
      }
    );
  };

  useEffect(() => {
    const getBannerData = async () => {
      const data = await getbanner(city);
      if (data.length > 0) {
        setImgURL(data[0].imageURL);
        setName(data[0].name);
        setId(data[0].id);
        setType("edit");
      } else {
        setType("create");
      }
    };

    getBannerData();
    return () => {
      controller.abort();
    };
  }, [id]);

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
          onSubmit={handleSubmit}
        >
          <TextField
            id="bannerHome"
            label="Banner"
            variant="filled"
            type="file"
            sx={{
              width: "100%",
            }}
          />

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
              type="submit"
            >
              Salvar
            </Button>
          </Box>
        </Box>

        {!imgURL && isUploading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progressPorcent} />
          </Box>
        )}
        {imgURL && (
          <Box
            component="img"
            sx={{
              height: 233,
              width: 450,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 450 },
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            alt="Banner do site"
            src={imgURL}
          />
        )}
      </Grid>
    </Grid>
  );
};
