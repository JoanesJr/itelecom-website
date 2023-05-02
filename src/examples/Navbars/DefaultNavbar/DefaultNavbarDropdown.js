/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";

// @mui material components
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { Box } from "@mui/material";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";

function DefaultNavbarDropdown({
  name,
  icon,
  children,
  collapseStatus,
  light,
  href,
  route,
  collapse,
  showMenus = true,
  ...rest
}) {
  const linkComponent = {
    component: "a",
    href,
    target: "_blank",
    rel: "noreferrer",
  };

  const routeComponent = {
    component: Link,
    to: route,
  };

  const { city } = useParams();
  const navigate = useNavigate();

  return (
    <>
      {showMenus && (
        <>
          <MKBox
            {...rest}
            mx={1}
            p={1}
            display="flex"
            alignItems="baseline"
            color={light ? "white" : "dark"}
            opacity={light ? 1 : 0.6}
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => navigate(`/${city}/home`)}
            // {...(route && routeComponent)}
            // {...(href && linkComponent)}
          >
            <MKBox
              sx={
                {
                  // display: "flex",
                }
              }
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <MKTypography
                  variant="body2"
                  lineHeight={1}
                  color="inherit"
                  sx={{ alignSelf: "center", "& *": { verticalAlign: "middle" } }}
                >
                  <HomeSharpIcon />
                </MKTypography>
                <MKTypography
                  variant="button"
                  fontWeight="regular"
                  textTransform="capitalize"
                  color={light ? "white" : "dark"}
                  sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
                >
                  Home
                </MKTypography>
              </Box>
            </MKBox>
          </MKBox>
          <MKBox
            {...rest}
            mx={1}
            p={1}
            display="flex"
            alignItems="baseline"
            color={light ? "white" : "dark"}
            opacity={light ? 1 : 0.6}
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => navigate(`/${city}/contato`)}
            // {...(route && routeComponent)}
            // {...(href && linkComponent)}
          >
            <MKBox
              sx={
                {
                  // display: "flex",
                }
              }
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <MKTypography
                  variant="body2"
                  lineHeight={1}
                  color="inherit"
                  sx={{ alignSelf: "center", "& *": { verticalAlign: "middle" } }}
                >
                  <SendSharpIcon />
                </MKTypography>
                <MKTypography
                  variant="button"
                  fontWeight="regular"
                  textTransform="capitalize"
                  color={light ? "white" : "dark"}
                  sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
                  onClick={() => navigate(`/${city}/home`)}
                >
                  Contato
                </MKTypography>
              </Box>
            </MKBox>
          </MKBox>
          <MKBox
            {...rest}
            mx={1}
            p={1}
            display="flex"
            alignItems="baseline"
            color={light ? "white" : "dark"}
            opacity={light ? 1 : 0.6}
            sx={{ cursor: "pointer", userSelect: "none" }}
            // onClick={() => navigate(`/${city}/contato`)}
            component="a"
            href="https://ixc.itelecominternet.com.br/central_assinante_web/login"
            target="_blank"
            // {...(route && routeComponent)}
            // {...(href && linkComponent)}
          >
            <MKBox
              sx={
                {
                  // display: "flex",
                }
              }
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <MKTypography
                  variant="body2"
                  lineHeight={1}
                  color="inherit"
                  sx={{ alignSelf: "center", "& *": { verticalAlign: "middle" } }}
                >
                  <PersonSharpIcon />
                </MKTypography>
                <MKTypography
                  variant="button"
                  fontWeight="regular"
                  textTransform="capitalize"
                  color={light ? "white" : "dark"}
                  sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
                  onClick={() => navigate(`/${city}/home`)}
                >
                  Area do Cliente
                </MKTypography>
              </Box>
            </MKBox>
          </MKBox>
        </>
      )}
    </>
  );
}

// Setting default values for the props of DefaultNavbarDropdown
DefaultNavbarDropdown.defaultProps = {
  children: false,
  collapseStatus: false,
  light: false,
  href: "",
  route: "",
};

// Typechecking props for the DefaultNavbarDropdown
DefaultNavbarDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node,
  collapseStatus: PropTypes.bool,
  light: PropTypes.bool,
  href: PropTypes.string,
  route: PropTypes.string,
  collapse: PropTypes.bool.isRequired,
};

export default DefaultNavbarDropdown;
