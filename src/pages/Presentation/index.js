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
import { Container, Grid, Card, CardContent, Box, Typography, Link } from "@mui/material";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import wifiIcon from "../../assets/images/output-onlinegiftools.gif";

// Routes
import routes from "routes";

// Images
// import bgImage from "assets/images/banner-itelecom.png";
// import bgImage from "assets/images/banner_home_2.png";
import bgImage from "assets/images/banner_home.jpg";
import bgImageSmall from "assets/images/banner_home-small.png";
import { useEffect, useState } from "react";
import { getCities } from "../../firebase/cities/index";
import { WifiIcon } from "./wifyIcon";

const controller = new AbortController();

function Presentation() {
  const [locals, setLocals] = useState([]);

  useEffect(() => {
    const getCitiesData = async () => {
      const data = await getCities();

      data.map((item) => {
        item.link = `/${item.name}/home`;
      });

      setLocals(data);
    };

    getCitiesData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <DefaultNavbar routes={routes} showMenus={false} transparent light />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "left top", lg: "left top" },
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box>
          <Box
            component="img"
            sx={{
              position: "absolute",
              top: {
                xs: 30,
                xs1: 30,
                sm: 60,
                smmid: 30,
                md: 40,
                mdmid: 50,
                md1: 45,
                lg: 40,
                lg1: 50,
                xl: 65,
                xlg: 55,
                xxl: 90,
                xxll: 105,
              },
              left: {
                xs: 0,
                xs1: 0,
                sm: 10,
                smmid: 2,
                md: 2,
                mdmid: 5,
                md1: 1,
                lg: -1,
                lg1: 1,
                xl: 7,
                xlg: 5,
                xxl: 12,
                xxll: 18,
              },
              height: { xs: 40, mdmid: 40, md1: 50, lg: 60 },
              width: { xs: 40, mdmid: 40, md1: 50, lg: 60 },
            }}
            alt="wifi Icon"
            src={wifiIcon}
          />
        </Box>
      </MKBox>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            // boxShadow: ({ boxShadows: { xxl } }) => xxl,
            boxShadow: "none",
            backgroundColor: "rgba(255, 250, 250, 0.1)",
          }}
        >
          <MKBox component="section" pt={6} my={6}>
            <Container>
              <Grid
                container
                alignItems="center"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  mx: { xs: 2, lg: 3 },
                  mt: -30,
                  mb: 4,
                  // boxShadow: ({ boxShadows: { xxl } }) => xxl,
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MKTypography variant="h2">Selecione a sua cidade</MKTypography>
                </Grid>

                {locals.map((local) => (
                  <Grid
                    item
                    sx={12}
                    md={6}
                    lg={4}
                    xxll={4}
                    sx={{
                      // ml: { xs: 0, lg: 3 },
                      // mb: { xs: 1, md: 0 },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      flexDirection: "row",
                    }}
                    key={local.BuiltByDevelopers}
                  >
                    <Card
                      sx={{
                        p: "1rem",
                        width: "100%",
                        m: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#0388C5",
                      }}
                      elevation={5}
                    >
                      <Grid
                        container
                        spacing={1}
                        sx={{
                          // mt: 1,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              width: "100%",
                            }}
                            // height={200}
                          >
                            <Link
                              href={local.link}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <MKTypography
                                variant="h4"
                                align="center"
                                sx={{
                                  fontWeigth: "bolder",
                                  // color: "#c0c0c0",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: "#fff",
                                }}
                              >
                                {local.id} - {local.state}
                              </MKTypography>
                            </Link>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </MKBox>
        </Card>
      </Grid>
    </>
  );
}

export default Presentation;
