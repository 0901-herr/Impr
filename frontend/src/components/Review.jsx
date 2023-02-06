import React, { useState } from "react";
import dateFormat from "dateformat";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const Review = (props) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // const { _id, picturePath } = useSelector((state) => state.user);

  const theme = useTheme();
  const titleCol = theme.palette.neutral.title;
  const hoverCol = theme.palette.neutral.hoverReview;
  const datesCol = theme.palette.neutral.dates;
  const descriptionCol = theme.palette.neutral.description;

  const { reviewProps, review } = props;
  const { setCurrentReview, setIsReviewDetailsOpen } = reviewProps;

  const formatDate = (date) => {
    var newDate = new Date(date);
    var formattedDate = dateFormat(newDate, "dd.mm.yy");
    return formattedDate;
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      onClick={() => {
        setCurrentReview(review);
        setIsReviewDetailsOpen(true);
      }}
    >
      <Box
        display="flex"
        p="0.75rem 0.75rem"
        mt="0.15rem"
        width="100vh"
        borderRadius="4px"
        sx={{
          "&:hover": {
            cursor: "pointer",
            backgroundColor: hoverCol,
          },
        }}
      >
        {/* Image */}
        {review.picture_path ? (
          <img
            width="100"
            height="100"
            alt="advert"
            src={`http://localhost:5000/assets/${review.picture_path}`}
            style={{ objectFit: "cover", borderRadius: "5px" }}
          />
        ) : (
          <Box
            width="100px"
            height="100px"
            backgroundColor={hoverCol}
            borderRadius="5px"
          />
        )}

        {/* Summary */}
        <Box
          width="60%"
          height="100"
          m="0 1.5rem"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ alignContent: "flex-start" }}>
            <Typography fontSize="20px" fontWeight="bold" color={titleCol}>
              {review.title}
            </Typography>
            <Typography fontSize="14px" color={datesCol}>
              {formatDate(review.date)}
            </Typography>
          </Box>

          <Box mt="0.4rem">
            <Typography fontSize="14px" color={descriptionCol}>
              {review.summary}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Rating */}
      <Box width="20%" display="flex" justifyContent="center">
        <Typography fontSize="26px" fontWeight="bold" color={descriptionCol}>
          {review.rating}/10
        </Typography>
      </Box>
    </Box>
  );
};

export default Review;
