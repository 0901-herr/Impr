import React, { useState } from "react";
import dateFormat from "dateformat";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SectionDataService from "../services/reviews";
import GradientText from "./GradientText";
const Section = (props) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // const { _id, picturePath } = useSelector((state) => state.user);

  const theme = useTheme();

  const primaryLight = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const menuText = theme.palette.neutral.menuText;
  const hoverCol = theme.palette.neutral.hover;

  const [isHoverSection, setIsHoverSection] = useState(false);

  const { sectionProps, section } = props;
  const { onClickSection, currentSection, setIsEditSection } = sectionProps;

  const handleDeleteSection = () => {
    const sectionId = section._id;
    const userId = "53a2b415cc3bd4ebac5eb6d4";
    SectionDataService.deleteSection(sectionId, userId)
      .then((response) => {
        // setIsDeleteSection(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEditSection = () => {
    setIsEditSection(true);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="0.75rem 0.8rem"
      sx={{
        borderRadius: "6px",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: hoverCol,
        },
      }}
      onMouseOver={() => setIsHoverSection(true)}
      onMouseOut={() => setIsHoverSection(false)}
      onClick={() => {
        onClickSection(section);
      }}
    >
      <GradientText
        fontWeight={currentSection === section ? "600" : "medium"}
        fontSize="15px"
        gradientColors={
          currentSection === section
            ? [primaryLight, primaryMain]
            : [menuText, menuText]
        }
      >
        {section.title}
      </GradientText>

      {isHoverSection && (
        <Box
          height="20px"
          width="60px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          pr="1rem"
        >
          <IconButton onClick={handleEditSection}>
            <EditOutlined sx={{ color: menuText, fontSize: "16px" }} />
          </IconButton>
          <IconButton onClick={handleDeleteSection}>
            <DeleteOutlined sx={{ color: menuText, fontSize: "16px" }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Section;
