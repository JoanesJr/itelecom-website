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

// @mui material components
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function CenteredFooter({ company, links, socials, light, socialB }) {
  const { href, name } = company;

  const year = new Date().getFullYear();

  return (
    <MKBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Stack display="flex" direction="row" justifyContent="center" spacing={3} mt={1} mb={3}>
            <MKTypography
              component={Link}
              href={socialB.facebook}
              variant="body2"
              color={light ? "white" : "secondary"}
              fontWeight="regular"
            >
              <FacebookIcon />
            </MKTypography>

            <MKTypography
              component={Link}
              href={socialB.instagram}
              variant="body2"
              color={light ? "white" : "secondary"}
              fontWeight="regular"
            >
              <InstagramIcon />
            </MKTypography>

            <MKTypography
              component={Link}
              href={socialB.twitter}
              variant="body2"
              color={light ? "white" : "secondary"}
              fontWeight="regular"
            >
              <TwitterIcon />
            </MKTypography>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <MKTypography variant="body2" color={light ? "white" : "secondary"}>
            Copyright &copy; {year} Material by{" "}
            <MKTypography
              component={Link}
              href={href}
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color={light ? "white" : "secondary"}
            >
              Joanes Technology
            </MKTypography>
            .
          </MKTypography>
        </Grid>
      </Grid>
    </MKBox>
  );
}

// Setting default values for the props of CenteredFooter
CenteredFooter.defaultProps = {
  company: { href: "https://www.creative-tim.com/", name: "Joanes Technology" },
  socials: [
    { icon: <FacebookIcon fontSize="small" />, link: "", social: "facebook" },
    {
      icon: <TwitterIcon fontSize="small" />,
      link: "",
      social: "twitter",
    },
    {
      icon: <InstagramIcon fontSize="small" />,
      link: "",
      social: "instagram",
    },
  ],
  light: false,
};

// Typechecking props for the CenteredFooter
CenteredFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  socials: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  light: PropTypes.bool,
};

export default CenteredFooter;
