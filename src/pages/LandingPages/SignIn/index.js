/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useContext, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { z } from "zod";
import { SignIn } from "../../../firebase/index";
import { AuthContext } from "context/auth";

function SignInBasic() {
  const navigate = useNavigate();
  const { signInEmailPassword, verifyToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

  const handleLogin = async () => {
    try {
      setErrorLogin(false);
      setErrorLoginMessage("");
      const loginSchema = z.object({
        email: z.string().email({ message: "Informe um e-mail valido" }),
        password: z.string().min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
      });

      const validateLogin = loginSchema.parse({ email, password });

      await signInEmailPassword({
        email: validateLogin.email,
        password: validateLogin.password,
      });

      navigate("/admin/super/home");
    } catch (err) {
      if (err.formErrors?.fieldErrors) {
        const existsErrorEmail = "email" in err.formErrors.fieldErrors;
        const existsErrorPassword = "password" in err.formErrors.fieldErrors;
        if (existsErrorEmail) {
          setErrorLogin(true);
          setErrorLoginMessage(err.formErrors.fieldErrors.email[0]);
        }
        if (existsErrorPassword) {
          setErrorLogin(true);
          setErrorLoginMessage(err.formErrors.fieldErrors.password[0]);
        }
      }

      setErrorLogin(true);
      setErrorLoginMessage("Dados de login inválidos");
    }
  };

  return (
    <>
      <DefaultNavbar routes={routes} showMenus={false} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Login
                </MKTypography>

                {errorLogin && (
                  <MKTypography variant="h6" fontWeight="small" color="error" mt={1}>
                    {errorLoginMessage}
                  </MKTypography>
                )}
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Senha"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </MKBox>

                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                      Entrar
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignInBasic;
