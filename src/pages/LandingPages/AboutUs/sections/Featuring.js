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

// Material Kit 2 React examples
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";

// Images
import coinbase from "assets/images/logos/gray-logos/logo-coinbase.svg";
import nasa from "assets/images/logos/gray-logos/logo-nasa.svg";
import netflix from "assets/images/logos/gray-logos/logo-netflix.svg";
import pinterest from "assets/images/logos/gray-logos/logo-pinterest.svg";
import spotify from "assets/images/logos/gray-logos/logo-spotify.svg";
import vodafone from "assets/images/logos/gray-logos/logo-vodafone.svg";
import { useEffect, useState } from "react";
import { getmps } from "../../../../firebase/cities/mps";

const controller = new AbortController();

function Featuring({ city }) {
  const [mp1Title, setMp1Title] = useState("");
  const [mp1Desc, setMp1Desc] = useState("");
  const [mp2Title, setMp2Title] = useState("");
  const [mp2Desc, setMp2Desc] = useState("");
  const [mp3Title, setMp3Title] = useState("");
  const [mp3Desc, setMp3Desc] = useState("");

  useEffect(() => {
    const getmpss = async () => {
      const data = await getmps(city);
      setMp1Desc(data[0].mp1Desc);
      setMp1Title(data[0].mp1Title);
      setMp2Desc(data[0].mp2Desc);
      setMp2Title(data[0].mp2Title);
      setMp3Desc(data[0].mp3Desc);
      setMp3Title(data[0].mp3Title);
    };

    getmpss();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <MKBox component="section" pt={3} pb={8}>
      <Container>
        {/* <Grid container spacing={3} sx={{ mb: 12 }}>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={coinbase} alt="coinbase" width="100%" opacity={0.7} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={nasa} alt="nasa" width="100%" opacity={0.7} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={netflix} alt="netflix" width="100%" opacity={0.7} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={pinterest} alt="pinterest" width="100%" opacity={0.7} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={spotify} alt="spotify" width="100%" opacity={0.7} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={vodafone} alt="vodafone" width="100%" opacity={0.7} />
          </Grid>
        </Grid> */}
        <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              count={5234}
              separator=","
              title={mp1Title}
              type="monitoring"
              description={mp1Desc}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              count={3400}
              separator=","
              suffix="+"
              title={mp2Title}
              type="money"
              description={mp2Desc}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              prefix="/"
              count={7}
              title={mp3Title}
              type="support"
              description={mp3Desc}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Featuring;
