import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientText = styled(Typography)(({ theme, gradientColors }) => ({
  backgroundImage: `linear-gradient(to bottom right, ${gradientColors.join(
    ","
  )})`, // direction color1 color2
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

export default GradientText;
