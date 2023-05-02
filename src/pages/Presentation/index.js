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

// Routes
import routes from "routes";

// Images
// import bgImage from "assets/images/banner-itelecom.png";
import bgImage from "assets/images/banner-home.png";
import { useEffect, useState } from "react";
import { getCities } from "../../firebase/cities/index";

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
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      ></MKBox>

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
                  mt: -22,
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
                    // mt: 0,
                  }}
                >
                  <MKTypography variant="h2" sx={{ color: "#00008B", fontWeigth: "bold" }}>
                    Selecione a sua cidade
                  </MKTypography>
                </Grid>

                {locals.map((local) => (
                  <Grid
                    item
                    sx={12}
                    md={3}
                    lg={3}
                    sx={{
                      ml: { xs: 0, lg: 3 },
                      mb: { xs: 1, md: 0 },
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

      {/* <MKBox pt={6} px={1} mt={6}>
        <CenteredFooter content={footerRoutes} />
      </MKBox> */}
    </>
  );
}

export default Presentation;
