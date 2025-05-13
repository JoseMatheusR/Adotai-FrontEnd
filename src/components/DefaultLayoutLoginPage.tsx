import { Box } from "@mui/material";
import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
export interface IDefaultLayoutLoginPage {
  children?: ReactNode;
  body?: ReactNode;
  type: "user" | "organization";
}

export const DefaultLayoutLoginPage = ({
  children,
  type,
}: IDefaultLayoutLoginPage) => {
  const getImageSource = () => {
    switch (type) {
      case "organization":
        return "../../public/assets/org_login.png";
      case "user":
      default:
        return "../../public/assets/user_logo_higher_resolution.png";
    }
  };
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Grid container sx={{ height: "100%" }}>
        {/* Grid esquerdo */}

        <Grid
          size={{ xs: 0, sm: 0, md: 6 }}
          sx={{
            backgroundColor: "#F4EADA",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Box
              component="img"
              src={getImageSource()}
              alt="Logo Illustration"
              sx={{
                width: "375px",
                maxWidth: "425px",
              }}
            />
          </Box>
        </Grid>
        {/* Grid direito */}

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            backgroundColor: "#ffff",
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
