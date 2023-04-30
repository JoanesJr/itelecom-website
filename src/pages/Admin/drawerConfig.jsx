import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HandshakeSharpIcon from "@mui/icons-material/HandshakeSharp";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import PlaceSharpIcon from "@mui/icons-material/PlaceSharp";
import NearMeSharpIcon from "@mui/icons-material/NearMeSharp";
import PhotoSizeSelectActualSharpIcon from "@mui/icons-material/PhotoSizeSelectActualSharp";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import { useNavigate } from "react-router-dom";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";

const drawerWidth = 240;

const getIconOne = (index) => {
  let icon;
  switch (index) {
    case 0:
      icon = <PaidSharpIcon />;
      break;
    case 1:
      icon = <HandshakeSharpIcon />;
      break;
    case 2:
      icon = <MailIcon />;
      break;
    case 3:
      icon = <ShareSharpIcon />;
      break;
  }

  return icon;
};

const getIconTwo = (index) => {
  let icon;
  switch (index) {
    case 0:
      icon = <NearMeSharpIcon />;
      break;
    case 1:
      icon = <PlaceSharpIcon />;
      break;
    case 2:
      icon = <PhotoSizeSelectActualSharpIcon />;
      break;
    case 3:
      icon = <SettingsSharpIcon />;
      break;
  }

  return icon;
};

export const DrawerConfig = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <List>
        <ListItem disablePadding onClick={() => navigate("/admin/home")}>
          <ListItemButton>
            <ListItemIcon>
              <HomeSharpIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      <List>
        {["Planos", "Parceiros", "E-mail", "Social"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => navigate(`/admin/${props.city}/config/${text.toLowerCase()}`)}
          >
            <ListItemButton>
              <ListItemIcon>{getIconOne(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Endereço", "Localização", "Banner", "MPS"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => navigate(`/admin/${props.city}/config/${text.toLowerCase()}`)}
          >
            <ListItemButton>
              <ListItemIcon>{getIconTwo(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box>{props.children}</Box>
      </Box>
    </Box>
  );
};
