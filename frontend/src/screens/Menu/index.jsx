import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  LogoutOutlined,
  PersonOutlineOutlined,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";

import GradientText from "../../components/GradientText";
import { sectionsData } from "./data.ts";
import { menuOptionsData } from "./data.ts";

import SectionDataService from "../../services/reviews";

const Navbar = (props) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();

  const primaryLight = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const menuText = theme.palette.neutral.menuText;
  const menuBackground = theme.palette.background.menu;
  const line = theme.palette.neutral.line;
  const hoverCol = theme.palette.neutral.hover;

  const [sections, setSections] = useState(sectionsData);
  const [currentSection, setCurrentSection] = useState(null);

  const { setIsNavBarOpen, setSectionId, setSectionTitle, setIsAddNewSection } =
    props;

  const onClickSection = (section) => {
    setCurrentSection(section);
    setSectionId(section._id);
    setSectionTitle(section.title);
  };

  const retrieveSections = () => {
    SectionDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setSections(response.data.sections);

        if (sections != null) {
          onClickSection(response.data.sections[0]);
        }

        console.log("currentSection: ", currentSection);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveSections();
  }, []);

  return (
    <Box
      width="260px"
      justifyContent="space-between"
      backgroundColor={menuBackground}
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <Box display="flex" justifyContent="space-between" p="0.8rem">
        <Box />
        <IconButton onClick={() => setIsNavBarOpen(false)}>
          <Close sx={{ color: menuText, fontSize: "20px" }} />
        </IconButton>
      </Box>

      <Box
        p="0 0.8rem"
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Box height="70vh" p="0.5rem">
          {/* Add section button */}
          <Box
            align="center"
            p="0.5rem"
            border="0.8px solid"
            borderRadius="6px"
            borderColor={line}
            onClick={() => {
              setIsAddNewSection(true);
            }}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Typography fontWeight="600" fontSize="15px" color={menuText}>
              add
            </Typography>
          </Box>

          {/* Section titles */}
          <Box mt="1rem">
            {sections.map((section) => (
              <Box
                p="0.75rem 0.8rem"
                sx={{
                  borderRadius: "6px",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: hoverCol,
                  },
                }}
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
              </Box>
            ))}
          </Box>
        </Box>

        <Divider color={menuText} width="100%" />

        {/* Menu options */}
        <Box height="25vh" m="0.25rem 0" p="0rem 0.25rem">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            p="0.75rem 0.6rem"
            borderRadius="6px"
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: hoverCol,
              },
            }}
            onClick={() => dispatch(setMode())}
          >
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined sx={{ color: menuText, fontSize: "18px" }} />
            ) : (
              <DarkModeOutlined sx={{ color: menuText, fontSize: "18px" }} />
            )}
            {theme.palette.mode === "dark" ? (
              <Typography
                fontWeight="500"
                fontSize="15px"
                color={menuText}
                pl="0.75rem"
              >
                light mode
              </Typography>
            ) : (
              <Typography
                fontWeight="500"
                fontSize="15px"
                color={menuText}
                pl="0.75rem"
              >
                dark mode
              </Typography>
            )}
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            p="0.75rem 0.6rem"
            borderRadius="6px"
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: hoverCol,
              },
            }}
            onClick={() => navigate("/profile")}
          >
            <PersonOutlineOutlined sx={{ color: menuText, fontSize: "18px" }} />
            <Typography
              fontWeight="500"
              fontSize="15px"
              color={menuText}
              pl="0.75rem"
            >
              profile
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            p="0.75rem 0.6rem"
            borderRadius="6px"
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: hoverCol,
              },
            }}
            // onClick={() => dispatch(setLogout())}
          >
            <LogoutOutlined sx={{ color: menuText, fontSize: "18px" }} />
            <Typography
              fontWeight="500"
              fontSize="15px"
              color={menuText}
              pl="0.75rem"
            >
              logout
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
