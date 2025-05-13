import { Box } from "@mui/material";
import { Crown } from "./svg/crown";
import { Sun } from "./svg/Sun";
import Fish from "./svg/fish";
import BikiniCat from "./svg/BikiniCat";
import DotPattern from "./svg/DotPattern";
import SkateSeagull from "./svg/SkateSeagull";
import Circles from "./svg/Circles";
import LineCircle from "./svg/LineCircle";
import Adotavio from "./svg/Adotavio";
import TalkBalloon from "./TalkBallon";

export const BackgroundDecorations = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "90vh",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        display: { xs: "none", lg: "block" },
      }}
    >
      <Crown
        sx={{
          position: "absolute",
          top: "140px",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      />
      <Sun
        sx={{
          position: "absolute",
          top: "50px",
          left: "120px",
          transform: "scale(1.7)",
        }}
      />
      <Fish
        sx={{
          position: "absolute",
          top: "200px",
          left: "220px",
          transform: "scale(1.3)",
        }}
      />
      <BikiniCat
        sx={{
          position: "absolute",
          top: "180px",
          left: "1350px",
        }}
      />
      <DotPattern
        sx={{
          position: "absolute",
          top: "20px",
          left: "1150px",
          transform: "scale(1.2)",
        }}
      />

      <SkateSeagull
        sx={{
          position: "absolute",
          bottom: "1px",
          left: "150px",
          transform: "scale(1)",
        }}
      />
      <Circles
        sx={{
          position: "absolute",
          bottom: "1px",
          left: "50px",
        }}
      />

      <LineCircle
        sx={{
          position: "absolute",
          bottom: "1px",
          right: "400px",
        }}
      />

      <Adotavio
        sx={{
          position: "absolute",
          bottom: "1px",
          right: "150px",
          pointerEvents: "auto",
          height: " 70px",
          zIndex: 999,
        }}
      />
      <TalkBalloon
        sx={{
          position: "absolute",
          bottom: "80px",
          right: "150px",
          transition: "opacity 0.6s ease",
        }}
      />
    </Box>
  );
};
