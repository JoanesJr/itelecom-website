import { Box, Typography } from "@mui/material";
import { DrawerConfig } from "./drawerConfig";
import { useParams } from "react-router-dom";
import { Planos } from "./planos";
import { Email } from "./email";
import { Social } from "./social";
import { Localizacao } from "./localizacao";
import { MPS } from "./mps";
import { Banner } from "./banner";

export const ConfigAdmin = () => {
  const { city, page } = useParams();

  const getPage = () => {
    if (page.toLowerCase() == "planos") {
      return <Planos city={city} />;
    }

    if (page.toLowerCase() == "e-mail") {
      return <Email city={city} />;
    }

    if (page.toLowerCase() == "social") {
      return <Social city={city} />;
    }

    if (page.toLowerCase() == "endereço") {
      return <Localizacao city={city} />;
    }

    if (page.toLowerCase() == "mps") {
      return <MPS city={city} />;
    }

    if (page.toLowerCase() == "banner") {
      return <Banner city={city} />;
    }
  };

  return (
    <DrawerConfig title={`Configuração - ${city}`} city={city}>
      <Box>{getPage(page)}</Box>
    </DrawerConfig>
  );
};
