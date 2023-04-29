import { Button, ButtonGroup } from "@mui/material";
import { BsPersonAdd, BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";

export const ButtonsCrud = ({
  entity,
  handleOpen,
  deleteAction,
  editable = true,
  config = false,
  selectionModel,
  setType,
}) => {
  const openEditModal = () => {
    setType("edit");
    handleOpen();
  };

  const openCreateModal = () => {
    setType("create");
    handleOpen();
  };

  const navigate = useNavigate();

  const navigateConfig = () => {
    navigate(`/admin/${selectionModel}/config/planos`);
  };
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button color="info" startIcon={<BsPersonAdd />} onClick={openCreateModal}>
        Adicionar {entity}
      </Button>
      {editable && (
        <Button color="warning" startIcon={<BsFillPencilFill />} onClick={openEditModal}>
          Editar {entity}
        </Button>
      )}

      <Button color="error" startIcon={<BsFillTrash3Fill />} onClick={deleteAction}>
        Remover {entity}
      </Button>

      {config && (
        <Button color="error" startIcon={<SettingsSharpIcon />} onClick={navigateConfig}>
          Configurar {entity}
        </Button>
      )}
    </ButtonGroup>
  );
};
