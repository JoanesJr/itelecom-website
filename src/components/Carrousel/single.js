import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import bgBanner from "assets/images/banner-itelecom.png";
import Container from "assets/theme/components/container";
import { Grid } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

export default class DemoCarousel extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <MKBox
            minHeight="75vh"
            width="100%"
            sx={{
              backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.dark.main, 0.6),
                  rgba(gradients.dark.state, 0.6)
                )}, url(${bgBanner})`,
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
                  <MKTypography
                    component="a"
                    variant="body1"
                    color="white"
                    href="https://www.instagram.com/joanes_njr/"
                    target="_blank"
                    mr={3}
                  >
                    <i className="fab fa-facebook" />
                  </MKTypography>
                  <MKTypography
                    component="a"
                    variant="body1"
                    color="white"
                    href="https://www.instagram.com/joanes_njr/"
                    target="_blank"
                    mr={3}
                  >
                    <i className="fab fa-instagram" />
                  </MKTypography>
                  <MKTypography
                    component="a"
                    variant="body1"
                    color="white"
                    href="https://www.instagram.com/joanes_njr/"
                    target="_blank"
                    mr={3}
                  >
                    <i className="fab fa-twitter" />
                  </MKTypography>
                </MKBox>
              </Grid>
            </Container>
          </MKBox>
        </div>
        <div>
          <img src={bgBanner} />
        </div>
        <div>
          <img src={bgBanner} />
        </div>
      </Carousel>
    );
  }
}
