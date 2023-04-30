/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import paramountStreaming from "assets/images/logos/paramount_streaming.png";
import watchBr from "assets/images/logos/logo-share.png";
import itelecomTv from "assets/images/logos/itelecom-tv.png";

import { Box, Button, Link } from "@mui/material";

// eslint-disable-next-line react/prop-types
function HorizontalTeamCard({
  position,
  value,
  mb,
  instalacaoGratis,
  wifi,
  roteador5g,
  tvGratis,
  image,
  destaque,
  contato,
}) {
  return (
    <>
      <Card
        sx={{
          mt: 3,
          height: { sm: "33rem", md: "29rem" },
          width: { sm: "15rem", md: "20rem" },
          backgroundColor: destaque ? "#00008B" : "",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              my: "auto",
            }}
          >
            <MKBox
              pt={{ xs: 1, lg: 2.5 }}
              pb={2.5}
              pr={4}
              pl={{ xs: 4, lg: 1 }}
              lineHeight={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <MKTypography variant="h4" color={position.color} mb={1}>
                {mb} MEGAS
              </MKTypography>
              <MKTypography variant="h1" color="text">
                R$ {value}
              </MKTypography>
              <MKTypography variant="h5" color="text">
                por mês
              </MKTypography>

              <Box
                sx={{
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: "5rem",
                      width: "6rem",
                      maxHeight: { xs: "5rem", md: "5rem" },
                      maxWidth: { xs: "6rem", md: "8rem" },
                      mt: -2,
                      mb: 2,
                    }}
                    alt="itelecomTv"
                    src={itelecomTv}
                  />
                </Box>
                {instalacaoGratis && (
                  <MKTypography variant="h6" color="text">
                    + Instalação Gratis
                  </MKTypography>
                )}
                {wifi && (
                  <MKTypography variant="h6" color="text">
                    + Wifi
                  </MKTypography>
                )}
                {roteador5g && (
                  <MKTypography variant="h6" color="text">
                    + Roteador 5G
                  </MKTypography>
                )}
              </Box>

              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  mt: -5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    width: "100%",
                    // m: 1,
                  }}
                >
                  {image && (
                    <>
                      <Box
                        component="img"
                        sx={{
                          height: "6rem",
                          width: "10rem",
                          maxHeight: { xs: "6rem", md: "6rem" },
                          maxWidth: { xs: "10rem", md: "12rem" },
                          mt: 5,
                        }}
                        alt="paramount streaming"
                        src={paramountStreaming}
                      />
                      <Box
                        component="img"
                        sx={{
                          height: "6rem",
                          width: "23rem",
                          maxHeight: { xs: "6rem", md: "6rem" },
                          maxWidth: { xs: "10rem", md: "23rem" },
                          mt: 5,
                        }}
                        alt="watch Br"
                        src={watchBr}
                      />
                    </>
                  )}
                </Box>
              </Grid>
            </MKBox>
          </Grid>
        </Grid>
      </Card>
      <Grid container sx={{ width: { sm: "15rem", md: "20rem" } }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: -2,
          }}
        >
          <Link href={contato} target="_blank">
            <Button variant="contained" sx={{ color: "#FFF", fontWeight: "bolder" }}>
              CONTRATAR
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

// Typechecking props for the HorizontalTeamCard
HorizontalTeamCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
};

export default HorizontalTeamCard;
