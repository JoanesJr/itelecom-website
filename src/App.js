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

import { useContext, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// Material Kit 2 React routes
import routes from "routes";
import AboutUs from "pages/LandingPages/AboutUs";
import { CrudCity } from "pages/Admin/listagemCidade";
import * as firesebase from "./firebase/index";

import { ConfigAdmin } from "pages/Admin/configAdmin";
import SignInBasic from "pages/LandingPages/SignIn";
import { AuthProvider } from "context/auth";
import { AuthContext } from "context/auth";
import ContactUs from "pages/LandingPages/ContactUs";

const PrivateRoutes = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <Outlet /> : <Navigate to="/admin/super/login" />;
};

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* {getRoutes(routes)} */}
        <Route path="/" element={<Presentation />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="/:city/home" element={<AboutUs />} />
        <Route path="/:city/contato" element={<ContactUs />} />
      </Routes>
      <AuthProvider>
        <Routes>
          <Route path="/admin/super/login" element={<SignInBasic />} />
          <Route path="/admin/super/home" element={<PrivateRoutes />}>
            <Route path="/admin/super/home" element={<CrudCity />} />
          </Route>
          <Route path="/admin/super/:city/config/:page" element={<ConfigAdmin />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
