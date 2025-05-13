import { Box } from "@mui/material";
import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
export interface IDefaultLayoutRegisterPage {
  children?: ReactNode;
  body?: ReactNode;
  type: "user" | "organization";
}

export const DefaultLayoutRegisterPage = ({
  children,
  type,
}: IDefaultLayoutRegisterPage) => {
  const getRightSideContent = () => {
    switch (type) {
      case "organization":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="../../public/assets/meeting.png"
              alt="Organization Register Illustration"
              sx={{
                width: "225px",
                maxWidth: "425px",
              }}
            />
            <Box
              component="img"
              src="../../public/assets/coffe.png"
              alt="Organization Register Illustration"
              sx={{
                width: "225px",
                maxWidth: "425px",
              }}
            />
          </Box>
        );
      case "user":
      default:
        return (
          <>
            <Box
              component="img"
              src="../../public/assets/image.png"
              alt="User Register Illustration 1"
              sx={{
                width: "225px",
                maxWidth: "300px",
              }}
            />
            <Box
              component="img"
              src="../../public/assets/image2.png"
              alt="User Register Illustration 2"
              sx={{
                width: "225px",
                maxWidth: "300px",
              }}
            />
            <Box
              component="img"
              src="../../public/assets/image3.png"
              alt="User Register Illustration 3"
              sx={{
                width: "225px",
                maxWidth: "300px",
              }}
            />
          </>
        );
    }
  };

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Grid container sx={{ height: "100%" }}>
        {/* Grid esquerdo */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            backgroundColor: "#ffff",
          }}
        >
          {children}
        </Grid>

        {/* Grid direito */}
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
            {getRightSideContent()}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
