import React from "react";
import {
  Box,
  Drawer,
  InputBase,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import Navbar from "../Menu/index.jsx";
import NewReviewDialog from "../NewReview/index.jsx";
import NewSectionDialog from "../NewSection/index.jsx";
import ReviewDetails from "../ReviewDetails/index.jsx";
import Reviews from "../Reviews/index.jsx";
import { useState } from "react";

const navBarWidth = 260;

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // const { _id, picturePath } = useSelector((state) => state.user);

  const theme = useTheme();

  const titleCol = theme.palette.neutral.title;
  const calendarCol = theme.palette.neutral.calendar;

  let initialReviewState = {
    date: null,
    description: "",
    name: "",
    picture_path: "",
    rating: "5",
    section_id: "",
    summary: "",
    title: "",
    user_id: "",
  };

  const [sectionId, setSectionId] = useState("");
  const [sectionTitle, setSectionTitle] = useState("");
  const [currentReview, setCurrentReview] = useState(initialReviewState);
  const [currentSection, setCurrentSection] = useState(null);
  const [isNavBarOpen, setIsNavBarOpen] = useState(true);
  const [isReviewDetailsOpen, setIsReviewDetailsOpen] = useState(false);
  const [isAddNewReview, setIsAddNewReview] = useState(false);
  const [isEditReview, setIsEditReview] = useState(false);
  const [isAddNewSection, setIsAddNewSection] = useState(false);
  const [isEditSection, setIsEditSection] = useState(false);
  const [isRefetchSection, setIsRefetchSection] = useState(null);

  const navBarProps = {
    currentSection,
    setCurrentSection,
    setIsNavBarOpen,
    setSectionId,
    setSectionTitle,
    setIsAddNewSection,
    setIsEditSection,
  };

  const reviewDetailsProps = {
    currentReview,
    isReviewDetailsOpen,
    setIsReviewDetailsOpen,
  };

  const reviewsProps = {
    sectionId,
    sectionTitle,
    isRefetchSection,
    setCurrentReview,
    setIsReviewDetailsOpen,
    setIsAddNewReview,
    setIsRefetchSection,
    setIsEditReview,
  };

  const newReviewProps = {
    sectionId,
    currentReview,
    isEditReview,
    isAddNewReview,
    setIsAddNewReview,
    setIsEditReview,
    setIsRefetchSection,
  };

  const newSectionProps = {
    currentSection,
    isAddNewSection,
    isEditSection,
    setIsAddNewSection,
    setIsEditSection,
  };

  return (
    <Box
      width="100%"
      display={isNonMobileScreens ? "flex" : "block"}
      flexDirection="row"
    >
      <Box p="1.5rem">
        <IconButton onClick={() => setIsNavBarOpen(!isNavBarOpen)}>
          <Menu sx={{ color: titleCol, fontSize: "24px" }} />
        </IconButton>
      </Box>

      {/* Nav bar */}
      <Drawer
        sx={{
          width: "260px",
          flexShrink: 0,
        }}
        variant="persistent"
        anchor="left"
        open={isNavBarOpen}
        onClose={() => setIsNavBarOpen(!isNavBarOpen)}
      >
        <Navbar {...navBarProps} />
      </Drawer>

      <Box
        p="2rem"
        width={isNonMobileScreens ? "72%" : undefined}
        sx={{
          display: "flex",
          flexDirection: "column",
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: `-${navBarWidth - 150}px`,
          ...(isNavBarOpen && {
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          }),
        }}
      >
        {/* Search bar */}
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box />
          <Box
            width="260px"
            backgroundColor={calendarCol}
            borderRadius="8px"
            padding="0.3rem 1rem"
          >
            <InputBase fullWidth="240px" placeholder="search" />
          </Box>
        </Box>

        {/* Reviews */}
        <Reviews {...reviewsProps} />
      </Box>

      {/* Review details */}
      <ReviewDetails {...reviewDetailsProps} />

      {/* Add review */}
      <NewReviewDialog {...newReviewProps} />

      {/* Add section */}
      <NewSectionDialog {...newSectionProps} />
    </Box>
  );
};

export default HomePage;
