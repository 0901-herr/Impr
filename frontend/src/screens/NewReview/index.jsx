import React, { useState, useEffect } from "react";
import {
  Box,
  Slider,
  Typography,
  InputBase,
  IconButton,
  Dialog,
  TextField,
  useTheme,
} from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween.jsx";
import SectionDataService from "../../services/reviews";

const NewReviewDialog = (props) => {
  const {
    sectionId,
    currentReview,
    isEditReview,
    isAddNewReview,
    setIsAddNewReview,
    setIsEditReview,
  } = props;
  const maxWidth = "600px";

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const menuText = theme.palette.neutral.menuText;

  const titleCol = theme.palette.neutral.title;
  const calendarCol = theme.palette.neutral.calendar;
  const descriptionCol = theme.palette.neutral.description;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [picturePath, setPicturePath] = useState(null);
  const [intro, setIntro] = useState("");
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");
  const [isDrag, setIsDrag] = useState(false);

  const handleClose = () => {
    setIsAddNewReview(false);
    setIsEditReview(false);
    clearFields();
  };

  const handleSliderChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPicturePath(null);
    setIsDrag(false);
  };

  const clearFields = () => {
    setTitle("");
    setIntro("");
    setRating(5);
    setDescription("");
    setImage(null);
    setPicturePath(null);
    setIsDrag(false);
  };

  const onClickDone = () => {
    const formData = new FormData();
    formData.append("user_id", "53a2b415cc3bd4ebac5eb6d4");
    formData.append("name", "Philippe Yong");
    formData.append("section_id", sectionId);
    formData.append("title", title);
    formData.append("summary", intro);
    formData.append("rating", rating);
    formData.append("description", description);

    if (image) {
      formData.append("picture", image);
      formData.append("picture_path", image.name);
    } else if (picturePath) {
      formData.append("picture_path", picturePath);
    }

    if (isEditReview) {
      console.log("editing review id: ", currentReview._id);
      formData.append("review_id", currentReview._id);
      console.log("updating review...");
      SectionDataService.updateReview(formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      SectionDataService.createReview(formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setIsAddNewReview(false);
    setIsEditReview(false);

    clearFields();
  };

  useEffect(() => {
    if (isEditReview && currentReview) {
      setTitle(currentReview.title);
      setIntro(currentReview.summary);
      setRating(currentReview.rating ?? 0);
      setDescription(currentReview.description);
      setPicturePath(currentReview.picture_path);
    }
  }, [isEditReview, currentReview]);

  return (
    <Dialog onClose={handleClose} open={isAddNewReview || isEditReview}>
      <Box width={maxWidth} height="90vh" p="2rem">
        {/* Done button */}
        <Box display="flex" justifyContent="flex-end">
          <Box
            width="80px"
            height="36px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="20px"
            sx={{
              background: `linear-gradient(to bottom right, ${primaryLight}, ${primaryMain})`,
              "&:hover": {
                borderColor: titleCol,
                cursor: "pointer",
              },
            }}
            onClick={() => {
              onClickDone();
            }}
          >
            <Typography fontWeight="600" fontSize="12px" color={menuText}>
              done
            </Typography>
          </Box>
        </Box>

        {/* Title */}
        <Box mt="0.75rem">
          <InputBase
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            sx={{
              width: "100%",
              fontSize: "32px",
              fontWeight: "bold",
              color: titleCol,
            }}
          />
        </Box>

        {/* Image */}
        <Box mt="0.75rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDragEnter={() => {
              setIsDrag(true);
            }}
            onDragLeave={() => {
              setIsDrag(false);
            }}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`1.5px dashed ${isDrag ? menuText : descriptionCol}`}
                  p="1rem 2rem"
                  width="100%"
                  height="25vh"
                  borderRadius="4px"
                  backgroundColor={isDrag ? calendarCol : menuText}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      borderColor: titleCol,
                      cursor: "pointer",
                    },
                  }}
                >
                  <input {...getInputProps()} />
                  {!image && !picturePath ? (
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography
                        fontSize="26px"
                        fontWeight="bold"
                        color={descriptionCol}
                      >
                        upload photo here
                      </Typography>
                      <Typography fontSize="14px" color={descriptionCol}>
                        drag and drop any relevant photo
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Typography fontSize="16px" fontWeight="medium">
                        {picturePath ? picturePath : image.name}
                      </Typography>

                      <Box
                        mt="1rem"
                        width="80px"
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <IconButton>
                          <EditOutlined
                            sx={{ color: titleCol, fontSize: "20px" }}
                          />
                        </IconButton>
                        <IconButton onClick={handleDeleteImage}>
                          <DeleteOutlined
                            sx={{ color: titleCol, fontSize: "20px" }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </Box>
              </FlexBetween>
            )}
          </Dropzone>
        </Box>

        {/* Sumarry */}
        <Box mt="1.75rem">
          <Typography fontSize="18px" fontWeight="bold" color={descriptionCol}>
            intro
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            inputProps={{ style: { fontSize: 16 } }}
            sx={{
              mt: "0.4rem",
              width: "100%",
            }}
          />
        </Box>

        {/* Rating */}
        <Box mt="1.75rem">
          <Typography fontSize="18px" fontWeight="bold" color={descriptionCol}>
            my rating
          </Typography>

          <Box m="0.5rem 0">
            <Slider
              aria-label="Temperature"
              defaultValue={5}
              value={rating}
              valueLabelDisplay="auto"
              step={1}
              onChange={handleSliderChange}
              marks
              min={0}
              max={10}
              sx={{
                height: 10,
                borderRadius: "4px",
                color: `linear-gradient(to bottom right, ${primaryLight}, ${primaryMain})`,
                "& .MuiSlider-thumb": {
                  height: 20,
                },
              }}
            />
          </Box>
        </Box>

        {/* Description */}
        <Box mt="1.75rem" pb="5rem">
          <Typography fontSize="18px" fontWeight="bold" color={descriptionCol}>
            description
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ style: { fontSize: 16 } }}
            sx={{
              mt: "0.4rem",
              width: "100%",
            }}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default NewReviewDialog;
