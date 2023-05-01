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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CenteredFooter from "examples/Footers/CenteredFooter";

// About Us page sections
import Team from "pages/LandingPages/AboutUs/sections/Team";
import Featuring from "pages/LandingPages/AboutUs/sections/Featuring";
import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images

import { useEffect, useState } from "react";
import { getsocial } from "../../../firebase/cities/social";
import { getbanner } from "../../../firebase/cities/banner";
import { useParams } from "react-router-dom";

const controller = new AbortController();

function AboutUs() {
  const [social, setSocial] = useState({});
  const [banner, setBanner] = useState("");

  const { city } = useParams();

  useEffect(() => {
    const getSocials = async () => {
      const data = await getsocial(city);
      setSocial(data[0]);
    };

    const getBanners = async () => {
      const data = await getbanner(city);
      setBanner(data[0].imageURL);
    };

    getSocials();
    getBanners();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <DefaultNavbar routes={routes} city={city} transparent light />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Sua provedora de Internet
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Garantindo a velocidade da sua internet com preços acessiveis
            </MKTypography>
            <MKButton color="default" sx={{ color: ({ palette: { dark } }) => dark.main }}>
              Fale Conosco
            </MKButton>
            <MKTypography variant="h6" color="white" mt={8} mb={1}>
              Nos encontre em
            </MKTypography>
            <MKBox display="flex" justifyContent="center" alignItems="center">
              {social?.facebook && (
                <MKTypography
                  component="a"
                  variant="body1"
                  color="white"
                  href={social.facebook}
                  target="_blank"
                  mr={3}
                >
                  <i className="fab fa-facebook" />
                </MKTypography>
              )}

              {social?.instagram && (
                <MKTypography
                  component="a"
                  variant="body1"
                  color="white"
                  href={social.instagram}
                  target="_blank"
                  mr={3}
                >
                  <i className="fab fa-instagram" />
                </MKTypography>
              )}

              {social?.twitter && (
                <MKTypography
                  component="a"
                  variant="body1"
                  color="white"
                  href={social.twitter}
                  target="_blank"
                  mr={3}
                >
                  <i className="fab fa-twitter" />
                </MKTypography>
              )}
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {/* <Information /> */}
        <Featuring city={city} />
        <Team social={social} city={city} />

        <Newsletter social={social} city={city} />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <CenteredFooter content={footerRoutes} socialB={social} />
      </MKBox>
    </>
  );
}

export default AboutUs;
