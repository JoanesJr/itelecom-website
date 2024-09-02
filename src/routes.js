
import Icon from "@mui/material/Icon";

// @mui icons

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";

const routes = [
  {
    name: "Menu",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        // name: "Menu",
        collapse: [
          {
            name: "Home",
            route: "/home",
            component: <AboutUs />,
          },
          {
            name: "Entre em Contato",
            route: "/:contatos",
            component: <ContactUs />,
          },
        ],
      },
    ],
  },
];

export default routes;
