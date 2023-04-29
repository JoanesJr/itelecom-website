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

function Newsletter() {
  return (
    <MKBox component="section" pt={6} my={6}>
      <Container>
        <Grid container alignItems="center">
          <Grid item sx={12} md={6} sx={{ ml: { xs: 0, lg: 3 }, mb: { xs: 12, md: 0 } }}>
            <MKTypography variant="h4">Informações</MKTypography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <MKTypography variant="body2">
                  <span style={{ fontWeight: "bold" }}>Endereço:</span> Av. Minas Gerais, 914 -
                  Centro, Mucuri - BA, 45930-000
                </MKTypography>
                <MKTypography variant="body2">
                  <span style={{ fontWeight: "bold" }}>Whatsapp Suporte:</span> (73) 2154 - 5231
                </MKTypography>
              </Grid>
              <Grid item xs={4} sx={{ mt: 2 }}>
                <Link
                  href="https://api.whatsapp.com/send?1=pt_BR&phone=5573981436415"
                  target="_blank"
                >
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
                <ResponsiveEmbed
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.4724894539427!2d-39.86474288960073!3d-18.003263082921833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xcaa3eac2f4ef79%3A0xc493d7d5e119b49b!2sITABATA%20TELECOMUNICA%C3%87%C3%95ES%20LTDA!5e0!3m2!1spt-BR!2sbr!4v1682518679947!5m2!1spt-BR!2sbr"
                  allowfullscreen
                />
              </Box>
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Newsletter;
