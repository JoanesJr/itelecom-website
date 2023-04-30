import { useEffect, useState } from "react";
import { ModalPlano } from "./modalPlano";
import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getPlans, updatePlans, deletePlans } from "../../firebase/cities/planos";

import { useBreakpointValue } from "@chakra-ui/react";

import { ButtonsCrud } from "./buttonsCrudAdmin";

const columns = [
  { field: "id", headerName: "ID", width: 0 },
  {
    field: "mb",
    headerName: "Megas",
    width: 80,
    editable: false,
  },
  {
    field: "value",
    headerName: "Valor",
    width: 80,
    editable: false,
  },
  {
    field: "instalacaoGratis",
    headerName: "Inst. Gratis",
    width: 100,
    editable: false,
  },
  {
    field: "image",
    headerName: "Logo",
    width: 80,
    editable: false,
  },
  {
    field: "wifi",
    headerName: "Wifi",
    width: 80,
    editable: false,
  },
  {
    field: "roteador5g",
    headerName: "Rot. 5G",
    width: 80,
    editable: false,
  },
  {
    field: "tvGratis",
    headerName: "TV Gratis",
    width: 80,
    editable: false,
  },
  {
    field: "destaque",
    headerName: "Destaque",
    width: 90,
    editable: false,
  },
];
const controller = new AbortController();

export const Planos = ({ city }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectionModel, setSelectionModel] = useState("");
  const [type, setType] = useState("create");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getPlansData = async () => {
      const data = await getPlans(city);
      setRows(data);
    };

    getPlansData();

    return () => {
      controller.abort();
    };
  }, [rows]);

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const deletePlansSubmit = async () => {
    if (window.confirm("Tem certeza que deseja excluir ?")) {
      await deletePlans(selectionModel);
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Grid
        item
        sx={12}
        sx={{
          mb: 5,
        }}
      >
        <ButtonsCrud
          entity="Plano"
          handleOpen={handleOpen}
          updateAction={updatePlans}
          deleteAction={deletePlansSubmit}
          editable={true}
          config={false}
          selectionModel={selectionModel}
          setType={setType}
        />
      </Grid>
      <Grid item sx={12}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            onRowClick={(params) => {
              setSelectionModel(params.row.id);
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
        {open && (
          <ModalPlano
            open={open}
            handleClose={handleClose}
            city={city}
            selectionModel={selectionModel}
            type={type}
          />
        )}
      </Grid>
    </Grid>
  );
};
