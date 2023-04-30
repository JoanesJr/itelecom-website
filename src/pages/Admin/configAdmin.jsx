import { Box, Typography } from "@mui/material";
import { DrawerConfig } from "./drawerConfig";
import { useParams } from "react-router-dom";
import { Planos } from "./planos";
import { Email } from "./email";

export const ConfigAdmin = () => {
  const { city, page } = useParams();

  const getPage = () => {
    if (page.toLowerCase() == "planos") {
      return <Planos city={city} />;
    }

    if (page.toLowerCase() == "e-mail") {
      return <Email city={city} />;
    }
  };

  return (
    <DrawerConfig title={`Configuração - ${city}`} city={city}>
      <Box>{getPage(page)}</Box>
    </DrawerConfig>
  );
};