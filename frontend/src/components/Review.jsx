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

const Review = (props) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // const { _id, picturePath } = useSelector((state) => state.user);

  const theme = useTheme();
  const titleCol = theme.palette.neutral.title;
  const hoverCol = theme.palette.neutral.hoverReview;
  const datesCol = theme.palette.neutral.dates;
  const descriptionCol = theme.palette.neutral.description;

  const { reviewProps, review } = props;
  const {
    setCurrentReview,
    setIsReviewDetailsOpen,
    setIsEditReview,
    setIsDeleteReview,
  } = reviewProps;
  const [isHoverReview, setIsHoverReview] = useState(false);

  const formatDate = (date) => {
    var newDate = new Date(date);
    var formattedDate = dateFormat(newDate, "dd.mm.yy");
    return formattedDate;
  };

  const handleDeleteReview = () => {
    const reviewId = review._id;
    const userId = "53a2b415cc3bd4ebac5eb6d4";

    SectionDataService.deleteReview(reviewId, userId)
      .then((response) => {
        setIsDeleteReview(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEditReview = () => {
    setCurrentReview(review);
    setIsEditReview(true);
    console.log("yes");
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box
        display="flex"
        justifyContent="space-between"
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
        onMouseOver={() => setIsHoverReview(true)}
        onMouseOut={() => setIsHoverReview(false)}
      >
        <Box
          display="flex"
          onClick={() => {
            setCurrentReview(review);
            setIsReviewDetailsOpen(true);
          }}
        >
          {/* <Typography>{review.picture_path}</Typography> */}
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
            width="50vh"
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

        {/* Edit and Delete button */}
        {isHoverReview && (
          <Box
            height="34px"
            width="70px"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            pr="1rem"
          >
            <IconButton onClick={handleEditReview}>
              <EditOutlined sx={{ color: titleCol, fontSize: "18px" }} />
            </IconButton>
            <IconButton onClick={handleDeleteReview}>
              <DeleteOutlined sx={{ color: titleCol, fontSize: "18px" }} />
            </IconButton>
          </Box>
        )}
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
