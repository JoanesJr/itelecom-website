/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./style.module.css";
import { FaWhatsapp } from "react-icons/fa";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import CenteredFooter from "examples/Footers/CenteredFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import { z } from "zod";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";

// Image
import bgImage from "assets/images/banner-itelecom.png";
import { useEffect, useState } from "react";
const controller = new AbortController();
import { getbanner } from "../../../firebase/cities/banner";
import { getemails } from "../../../firebase/cities/email";
import { getsocial } from "../../../firebase/cities/social";
import { useParams } from "react-router-dom";

import emailjs from "@emailjs/browser";
import { Alert, Typography } from "@mui/material";

function ContactUs() {
  const [banner, setBanner] = useState("");
  const [sendEmail, setSendEmail] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [messageErrorMessage, setMessageErrorMessage] = useState("");
  const [showLoader, setLoader] = useState(false);
  const [endProcess, setEndProcess] = useState(false);
  const [endStatus, setEndStatus] = useState("");
  const [endMessage, setEndMessages] = useState("");
  const [social, setSocial] = useState({});

  const { city } = useParams();
  useEffect(() => {
    const getBanners = async () => {
      const data = await getbanner(city);
      setBanner(data[0].imageURL);
    };

    const getEmails = async () => {
      const data = await getemails(city);
      setSendEmail(data[0].email);
    };

    const getSocials = async () => {
      const data = await getsocial(city);
      setSocial(data[0]);
    };

    getBanners();
    getEmails();
    getSocials();

    return () => {
      controller.abort();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setEndProcess(false);
      setEndMessages("");
      setEndStatus("");
      setEmailError(false);
      setEmailErrorMessage("");
      setNameError(false);
      setNameErrorMessage("");
      setMessageError(false);
      setMessageErrorMessage("");
      setLoader(true);

      const schema = z.object({
        name: z.string().min(3, { message: "O nome deve conter pelo menos 03 caracteres" }),
        email: z.string().email({ message: "Informe um e-mail valido." }),
        message: z
          .string()
          .max(250, { message: "A mensagem pode contar no máximo 250 caracteres" }),
      });

      const dataValidate = schema.parse({ name, email, message });

      const templateParams = {
        from_name: dataValidate.name,
        message: dataValidate.message,
        email: dataValidate.email,
        city,
        toEmail: sendEmail,
      };

      emailjs
        .send("service_86f0ela", "template_rzycntd", templateParams, "FiNpDKwOyrOot-Hv3")
        .then((dt) => {
          setName("");
          setMessage("");
          setEmail("");
          setEndProcess(true);
          setLoader(false);
          setEndStatus("success");
          setEndMessages("E-mail enviado com sucesso");

          setTimeout(() => {
            setEndProcess(false);
            setEndStatus("");
            setEndMessages("");
          }, [2000]);
        })
        .catch((err) => {
          setLoader(false);
          setEndProcess(true);
          setEndStatus("error");
          setEndMessages("Ocrreu um erro ao enviar o E-mail");

          setTimeout(() => {
            setEndProcess(false);
            setEndStatus("");
            setEndMessages("");
          }, [2000]);
        });
      // await SendMail({ name, message, emailSent: email, city, email: emailSent });
    } catch (err) {
      setLoader(false);
      const existsErrorEmail = "email" in err.formErrors.fieldErrors;
      const existsErrorName = "name" in err.formErrors.fieldErrors;
      const existsErrorMessage = "message" in err.formErrors.fieldErrors;
      if (existsErrorEmail) {
        setEmailError(true);
        setEmailErrorMessage(err.formErrors.fieldErrors.email[0]);
      }
      if (existsErrorName) {
        setNameError(true);
        setNameErrorMessage(err.formErrors.fieldErrors.name[0]);
      }
      if (existsErrorMessage) {
        setMessageError(true);
        setMessageErrorMessage(err.formErrors.fieldErrors.message[0]);
      }
    }
  };

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar routes={routes} transparent />
      </MKBox>
      <Grid container spacing={3} alignItems="center">
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={8}
          xl={8}
          ml={{ xs: "auto", lg: "auto" }}
          mr={{ xs: "auto", lg: "auto" }}
          sx={{}}
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <MKBox
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <MKTypography variant="h3" color="white">
                Entre em contato
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKTypography variant="body2" color="text" mb={3}>
                Para entrar em contato conosco, preencha os dados corretamente no formulário abaixo.
              </MKTypography>
              <MKBox width="100%" component="form" method="post" autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MKInput
                      variant="standard"
                      error={nameError}
                      helperText={nameErrorMessage}
                      label="Nome Completo"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MKInput
                      type="email"
                      error={emailError}
                      helperText={emailErrorMessage}
                      variant="standard"
                      label="Email"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MKInput
                      variant="standard"
                      error={messageError}
                      helperText={messageErrorMessage}
                      label="Como podemos ajudar você?"
                      placeholder="Escreva a sua mensagem em até 250 caracteres"
                      InputLabelProps={{ shrink: true }}
                      multiline
                      fullWidth
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <MKButton type="submit" variant="gradient" color="info" onClick={handleSubmit}>
                    Enviar Mensagem
                  </MKButton>
                </Grid>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  {showLoader && <CircularProgress />}

                  {endProcess && <Alert severity={endStatus}>{endMessage}</Alert>}
                </Grid>
              </MKBox>
            </MKBox>
          </MKBox>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: -15, lg: 0 },
          }}
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <MKBox
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
              sx={{ height: "100%" }}
            >
              <MKTypography variant="h3" color="white">
                Dados de contato
              </MKTypography>
            </MKBox>
            <MKBox p={3} sx={{ height: "100%" }}>
              {social?.whatsappNumber &&
                social?.whatsappNumber.split("|").map((ct) => (
                  <Box
                    sx={{
                      display: "flex",
                      mt: 2,
                    }}
                  >
                    {ct.includes("Whatsapp") && <FaWhatsapp />}
                    {!ct.includes("Whatsapp") && <LocalPhoneSharpIcon />}

                    <Typography ml={2} variant="body2">
                      {ct.replace("(Whatsapp)", "")}
                    </Typography>
                  </Box>
                ))}
              <Box
                sx={{
                  display: "flex",
                  mt: 2,
                }}
              >
                <EmailSharpIcon />
                <Typography variant="body2" ml={2}>
                  {sendEmail}
                </Typography>
              </Box>
              {social?.instagram && (
                <Box
                  sx={{
                    display: "flex",
                    mt: 2,
                  }}
                >
                  <MKTypography
                    component="a"
                    variant="body1"
                    href={social?.instagram || ""}
                    target="_blank"
                    mr={3}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <i className="fab fa-instagram" />
                    <Typography variant="body2" ml={2}>
                      @{social?.instagram && social?.instagram.split("/")[3]}
                    </Typography>
                  </MKTypography>
                </Box>
              )}
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <CenteredFooter content={footerRoutes} socialB={social} />
      </MKBox>
    </>
  );
}

export default ContactUs;
