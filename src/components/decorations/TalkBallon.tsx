import { Box } from "@mui/material";

export const TalkBalloon = (props: { sx?: any }) => (
  <Box
    component="img"
    src="../../public/assets/moi.png"
    alt="Talk Balloon"
    sx={{
      width: "80px",
      height: "auto",
      position: "absolute",
      ...props.sx,
    }}
  />
);

export default TalkBalloon;
