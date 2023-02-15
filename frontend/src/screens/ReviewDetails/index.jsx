import React from "react";
import dateFormat from "dateformat";
import {
  Box,
  Typography,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { useSelector } from "react-redux";
import GradientText from "../../components/GradientText";
import { useState } from "react";

const ReviewDetails = (props) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // const { _id, picturePath } = useSelector((state) => state.user);

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const menuText = theme.palette.neutral.menuText;
  const descriptionCol = theme.palette.neutral.description;
  const line = theme.palette.neutral.line;

  const titleCol = theme.palette.neutral.title;
  const calendarCol = theme.palette.neutral.calendar;
  const datesCol = theme.palette.neutral.dates;

  const { currentReview, isReviewDetailsOpen, setIsReviewDetailsOpen } = props;

  const formatDate = (date) => {
    var newDate = new Date(date);
    var formattedDate = dateFormat(newDate, "dd.mm.yy");
    return formattedDate;
  };

  return (
    <Drawer
      anchor="right"
      open={isReviewDetailsOpen}
      onClose={() => setIsReviewDetailsOpen(false)}
    >
      {currentReview ? (
        <Box
          width="400px"
          display="flex"
          justifyContent="center"
          p="1.5rem 0rem"
        >
          <Box width="320px">
            {/* Title */}
            <Typography fontSize="24px" fontWeight="bold" color={titleCol}>
              {currentReview.title}
            </Typography>

            {/* Image */}
            <Box mt="0.8rem">
              <img
                width="320"
                height="320"
                alt="advert"
                src={`http://localhost:5000/assets/${currentReview.picture_path}`}
                style={{ objectFit: "cover", borderRadius: "5px" }}
              />
            </Box>

            {/* Date */}
            <Box mt="1rem">
              <Typography fontSize="16px" fontWeight="medium" color={datesCol}>
                {formatDate(currentReview.date)}
              </Typography>
            </Box>

            {/* Sumarry */}
            <Box mt="0.5rem">
              <Typography fontSize="15px" fontWeight="medium" color={titleCol}>
                {currentReview.summary}
              </Typography>
            </Box>

            {/* Rating */}
            <Box mt="1.3rem">
              <Typography
                fontSize="16px"
                fontWeight="bold"
                color={descriptionCol}
              >
                my rating
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box />
                <Box display="flex" flexDirection="row" alignItems="center">
                  <GradientText
                    fontSize="46px"
                    fontWeight="bold"
                    mr="0.1rem"
                    gradientColors={[primaryLight, primaryMain]}
                  >
                    {currentReview.rating}
                  </GradientText>

                  <Typography
                    fontSize="46px"
                    fontWeight="bold"
                    color={descriptionCol}
                  >
                    /10
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Description */}
            <Box mt="1.3rem">
              <Typography
                fontSize="16px"
                fontWeight="bold"
                color={descriptionCol}
                paragraph
              >
                description
              </Typography>

              <Box mt="0.4rem" display="flex">
                <Typography
                  paragraph
                  fontSize="15px"
                  fontWeight="medium"
                  color={titleCol}
                >
                  {currentReview.description}
                </Typography>
              </Box>
            </Box>

            {/* Share */}
            <Box m="1.3rem 0">
              <Typography
                fontSize="16px"
                fontWeight="bold"
                color={descriptionCol}
              >
                share this
              </Typography>
              <Box
                width="320px"
                height="44px"
                mt="0.45rem"
                display="flex"
                alignItems="center"
              >
                <Box
                  width="270px"
                  height="44px"
                  backgroundColor={calendarCol}
                  borderRadius="8px 0 0 8px"
                  p="0.5rem 1rem"
                  display="flex"
                  alignItems="center"
                >
                  <Typography fontSize="14px" color={titleCol}>
                    https://irecommend/philippe/book/sub...
                  </Typography>
                </Box>

                <Box
                  width="50px"
                  height="44px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="0 8px 8px 0"
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                    background: `linear-gradient(to bottom right, ${primaryLight}, ${primaryMain})`,
                  }}
                  onClick={() => {}}
                >
                  <ContentCopy sx={{ color: menuText, fontSize: "20px" }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Drawer>
  );
};

export default ReviewDetails;
