import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import FlexBetween from "../../components/FlexBetween.jsx";
import GradientButton from "../../components/GradientButton.jsx";
import RefreshIcon from "@mui/icons-material/Refresh";

import Review from "../../components/Review.jsx";
import SectionDataService from "../../services/reviews";

const Reviews = (props) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // const { _id, picturePath } = useSelector((state) => state.user);

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const menuText = theme.palette.neutral.menuText;
  const titleCol = theme.palette.neutral.title;
  const calendarCol = theme.palette.neutral.calendarCol;

  const [isDeleteReview, setIsDeleteReview] = useState(null);

  const {
    setIsEditReview,
    setCurrentReview,
    setIsReviewDetailsOpen,
    setIsAddNewReview,
    sectionId,
    sectionTitle,
  } = props;

  const reviewProps = {
    setCurrentReview,
    setIsReviewDetailsOpen,
    setIsEditReview,
    setIsDeleteReview,
  };

  const fetchSection = () => {
    return SectionDataService.get(sectionId);
  };

  const { data, status, refetch } = useQuery(
    ["section", sectionId],
    fetchSection
  );

  const refetchReviews = () => {
    refetch();
    console.log("refetching reviews...");
  };

  const onClickAddNewReview = () => {
    setIsAddNewReview(true);
  };

  useEffect(() => {
    refetchReviews();
  }, [isDeleteReview]);

  return (
    <Box>
      {status === "loading" && (
        <Box
          width="100%"
          height="70vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color={calendarCol} />
        </Box>
      )}

      {status === "success" && (
        <Box mt="1rem">
          <IconButton onClick={refetchReviews}>
            <RefreshIcon sx={{ color: titleCol, fontSize: "24px" }} />
          </IconButton>

          {/* Section t"itle */}
          <Box mt="1.25rem" ml="0.75rem">
            <Typography fontSize="30px" fontWeight="bold" color={titleCol}>
              {sectionTitle}
            </Typography>
          </Box>

          <Box mt="0.75rem">
            {/* Date */}
            <FlexBetween>
              <Box ml="0.75rem">
                <Typography fontSize="20px" fontWeight="bold" color={titleCol}>
                  03.22
                </Typography>
              </Box>
              <Box width="20%" display="flex" justifyContent="center">
                <GradientButton
                  gradientColors={[primaryLight, primaryMain]}
                  sx={{
                    width: 80,
                    height: 36,
                    textTransform: "none",
                    fontWeight: "600",
                    color: menuText,
                  }}
                  onClick={() => {
                    onClickAddNewReview();
                  }}
                >
                  add
                </GradientButton>
              </Box>
            </FlexBetween>

            {/* Reviews */}
            <Box mt="0.5rem">
              {data?.data.reviews.map((review) => {
                return <Review {...{ reviewProps, review }} />;
              })}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Reviews;
