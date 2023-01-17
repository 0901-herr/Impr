import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const borderRadius = 20;

const GradientButton = styled(Button)(({ theme, gradientColors }) => ({
  position: "relative",
  border: "1px solid transparent",
  backgroundClip: "padding-box",
  borderRadius,

  "&:after": {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(to bottom right, ${gradientColors.join(",")})`,
    content: '""',
    zIndex: -1,
    borderRadius,
  },
}));

export default GradientButton;
