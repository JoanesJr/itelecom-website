import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

// Images
// import team1 from "assets/images/team-5.jpg";
import team1 from "assets/images/logos/Paramount+.png";
import { useEffect, useState } from "react";
import { getPlans } from "../../../../firebase/cities/planos";
import { useParams } from "react-router-dom";

const planos = [
  {
    id: 1,
    value: 500,
    mb: 50,
    instalacaoGratis: true,
    image: false,
    wifi: true,
    roteador5g: true,
    tvGratis: true,
    destaque: true,
  },
  {
    id: 2,
    value: 60,
    mb: 100,
    instalacaoGratis: true,
    image: true,
    wifi: true,
    roteador5g: true,
    tvGratis: true,
    destaque: false,
  },
  {
    id: 3,
    value: 70,
    mb: 200,
    instalacaoGratis: true,
    image: true,

    wifi: true,
    roteador5g: true,
    tvGratis: true,
    destaque: true,
  },
  {
    id: 4,
    value: 80,
    mb: 300,
    instalacaoGratis: true,
    image: true,

    wifi: true,
    roteador5g: true,
    tvGratis: true,
    destaque: false,
  },
  {
    id: 5,
    value: 90,
    mb: 400,
    instalacaoGratis: true,
    image: true,

    wifi: true,
    roteador5g: true,
    tvGratis: true,
    image: true,
    destaque: false,
  },
  {
    id: 6,
    value: 100,
    mb: 500,
    instalacaoGratis: true,
    image: true,

    wifi: true,
    roteador5g: true,
    tvGratis: true,
    destaque: false,
  },
];

function Team() {
  const [planos, setPlanos] = useState([]);
  const { city } = useParams();

  useEffect(() => {
    const getPlansData = async () => {
      const data = await getPlans(city);
      setPlanos(data);
    };

    getPlansData();
  });

  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              Planos
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              Planos de internet para sua cidade
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {planos.map((plano) => (
            <Grid item xs={12} md={6} lg={4} key={plano.id}>
              <MKBox mb={1}>
                <HorizontalTeamCard
                  position={{ color: "info", label: "UI Designer" }}
                  description="Artist is a term applied to a person who engages in an activity deemed to be an art."
                  value={plano.value}
                  mb={plano.mb}
                  instalacaoGratis={plano.instalacaoGratis}
                  image={plano.image}
                  wifi={plano.wifi}
                  roteador5g={plano.roteador5g}
                  tvGratis={plano.tvGratis}
                  destaque={plano.destaque}
                />
              </MKBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
