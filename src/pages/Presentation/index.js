import { Container, Grid, Card, Box, Typography, Link } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import bgImageNew from "assets/images/banner-novo.png";
import { useEffect, useState } from "react";
import { getCities } from "../../firebase/cities/index";

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
  }, []);

  return (
    <>
      <DefaultNavbar routes={routes} showMenus={false} transparent light />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImageNew})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
          filter: "brightness(0.7)",
        }}
      />

      <Container sx={{ mt: -10, mb: 4 }}>
        <Card
          sx={{
            p: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            borderRadius: 4,
          }}
        >
          <MKTypography
            variant="h2"
            align="center"
            sx={{ mb: 4, fontWeight: "bold", color: "#003366" }}
          >
            Selecione a sua cidade
          </MKTypography>

          <Grid container spacing={4} justifyContent="center">
            {locals.map((local) => (
              <Grid item xs={12} md={6} lg={4} key={local.BuiltByDevelopers}>
                <Card
                  sx={{
                    p: 3,
                    backgroundColor: "#0388C5",
                    color: "#fff",
                    textAlign: "center",
                    borderRadius: 2,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Link href={local.link} underline="none">
                    <Typography variant="h5" fontWeight="bold" color="#FFFFFF">
                      {local.id} - {local.state}
                    </Typography>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Container>
    </>
  );
}

export default Presentation;
