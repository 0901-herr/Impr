import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import FlexBetween from "../../components/FlexBetween.jsx";
import GradientButton from "../../components/GradientButton.jsx";

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

  const {
    setCurrentReview,
    setIsReviewDetailsOpen,
    setIsAddNewReview,
    sectionId,
    sectionTitle,
  } = props;

  const reviewProps = { setCurrentReview, setIsReviewDetailsOpen };

  const initialSectionState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };

  const [section, setSection] = useState(initialSectionState);
  const [isLoading, setIsLoading] = useState(true);

  const getSection = (id) => {
    SectionDataService.get(id)
      .then((response) => {
        setSection(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClickAddNewReview = () => {
    console.log(sectionId);
    setIsAddNewReview(true);
  };

  useEffect(() => {
    getSection(sectionId);
  }, [sectionId]);

  const deleteReview = (reviewId, index) => {
    // SectionDataService.deleteReview(reviewId, props.user.id)
    //   .then((response) => {
    //     setRestaurant((prevState) => {
    //       prevState.reviews.splice(index, 1);
    //       return {
    //         ...prevState,
    //       };
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  return (
    <Box>
      {isLoading ? (
        <Box
          width="100%"
          height="70vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color={calendarCol} />
        </Box>
      ) : (
        <Box mt="2rem">
          {/* Section title */}
          <Box ml="0.75rem">
            <Typography fontSize="30px" fontWeight="bold" color={titleCol}>
              {sectionTitle}
            </Typography>
          </Box>

          <Box mt="1rem">
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
              {section.reviews.map((review) => {
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
