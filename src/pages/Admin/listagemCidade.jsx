import { EditIcon } from "@chakra-ui/icons";

import { useContext, useEffect, useState } from "react";
import { ModalCity } from "./modalCity";
import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getCities, updateCity, deleteCity } from "../../firebase/cities/index";

import { useDisclosure, useBreakpointValue } from "@chakra-ui/react";

import { ButtonsCrud } from "./buttonsCrudAdmin";
import { AuthContext } from "context/auth";

const controller = new AbortController();

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Nome",
    width: 150,
    editable: false,
  },
  {
    field: "state",
    headerName: "Estado",
    width: 150,
    editable: false,
  },
];

export const CrudCity = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectionModel, setSelectionModel] = useState("");
  const [rows, setRows] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    const getCitysData = async () => {
      const data = await getCities();

      setRows(data);
    };

    getCitysData();
    return () => {
      controller.abort();
    };
  }, [rows]);

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const deleteCitySubmit = async () => {
    await deleteCity(selectionModel);
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Grid item sx={12}>
        <ButtonsCrud
          entity="Cidade"
          handleOpen={handleOpen}
          updateAction={updateCity}
          deleteAction={deleteCitySubmit}
          editable={false}
          config={true}
          selectionModel={selectionModel}
          setType={setType}
        />
      </Grid>
      <Grid item sx={12}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            onRowClick={(params) => {
              setSelectionModel(params.id);
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
        {open && <ModalCity open={open} handleClose={handleClose} />}
      </Grid>
    </Grid>
  );
};
