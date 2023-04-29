import { Box, Typography } from "@mui/material";
import { DrawerConfig } from "./drawerConfig";
import { useParams } from "react-router-dom";
import { Planos } from "./planos";

export const ConfigAdmin = () => {
  const { city, page } = useParams();

  const getPage = () => {
    if (page == "planos") {
      return <Planos city={city} />;
    }
  };

  return (
    <DrawerConfig title={`Configuração - ${city}`}>
      <Box>{getPage(page)}</Box>
    </DrawerConfig>
  );
};
