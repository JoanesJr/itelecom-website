/* eslint-disable react/jsx-no-duplicate-props */
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

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { Box, Link } from "@mui/material";

// Images
import ResponsiveEmbed from "react-responsive-embed";
import { useEffect, useState } from "react";

import { getlocalizacao } from "../../../../firebase/cities/localizacao";
import { useParams } from "react-router-dom";

const controller = new AbortController();

function Newsletter({ social, city }) {
  const [address, setAddress] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      const data = await getlocalizacao(city);
      setAddress(data[0].address);
      setLocalizacao(data[0].localizacao);
    };

    getAddress();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <MKBox component="section" pt={6} my={6}>
      <Container>
        <Grid container alignItems="center">
          <Grid item sx={12} md={6} sx={{ ml: { xs: 0, lg: 3 }, mb: { xs: 12, md: 0 } }}>
            <MKTypography variant="h4">Informações</MKTypography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <MKTypography variant="body2">
                  <span style={{ fontWeight: "bold" }}>Endereço:</span> {address || ""}
                </MKTypography>
                <MKTypography variant="body2">
                  <span style={{ fontWeight: "bold" }}>Whatsapp Suporte:</span>{" "}
                  {social?.whatsappNumber || ""}
                </MKTypography>
              </Grid>
              <Grid item xs={4} sx={{ mt: 2 }}>
                <Link href={social?.whatsapp || ""} target="_blank">
                  <MKButton variant="gradient" color="info" sx={{ height: "100%" }}>
                    Whatsapp
                  </MKButton>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} sx={{ ml: "auto" }}>
            <MKBox position="relative">
              <Box sx={{}}>
                <ResponsiveEmbed src={localizacao || ""} allowfullscreen />
              </Box>
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Newsletter;
