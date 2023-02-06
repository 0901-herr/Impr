import React, { useState } from "react";
import {
  Box,
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

const numbers = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "9",
    label: "9",
  },
  {
    value: "10",
    label: "10",
  },
];

const NewReviewDialog = (props) => {
  const { setIsAddNewReview, isAddNewReview, sectionId } = props;
  // const { _id, name } = useSelector((state) => state.user);
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
  const [intro, setIntro] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [isDrag, setIsDrag] = useState(false);

  const handleClose = () => {
    setIsAddNewReview(false);
    clearFields();
  };

  const clearFields = () => {
    setTitle("");
    setIntro("");
    setRating("");
    setDescription("");
    setImage(null);
    setIsDrag(false);
  };

  const onClickDone = () => {
    const formData = new FormData();
    formData.append("user_id", "53a2b415cc3bd4ebac5eb6d4");
    formData.append("name", "Philippe Yong");
    // console.log("done", sectionId)
    formData.append("section_id", sectionId);
    formData.append("title", title);
    formData.append("summary", intro);
    formData.append("rating", rating);
    formData.append("description", description);

    if (image) {
      formData.append("picture", image);
      formData.append("picture_path", image.name);
    }

    SectionDataService.createReview(formData)
      .then((response) => {
        setIsAddNewReview(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    clearFields();
    // if (editing) {
    //   data.review_id = props.location.state.currentReview._id;
    //   SectionDataService.updateReview(data)
    //     .then((response) => {
    //     setIsAddNewReview(false);
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // } else {
    //   SectionDataService.createReview(data)
    //     .then((response) => {
    //       setIsAddNewReview(false);
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
  };

  return (
    <Dialog onClose={handleClose} open={isAddNewReview}>
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
                  {!image ? (
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
                    <Box>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                      <IconButton onClick={() => setImage(null)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </FlexBetween>
            )}
          </Dropzone>
        </Box>

        {/* Sumarry */}
        <Box mt="1.5rem">
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
        <Box mt="1.5rem">
          <Typography fontSize="18px" fontWeight="bold" color={descriptionCol}>
            my rating
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box />
            <Box display="flex" flexDirection="row">
              {numbers.map((option) => (
                <Box width="40px" height="40px" backgroundColor={calendarCol} />
              ))}
              {/* <TextField
                select
                SelectProps={{
                  native: true,
                }}
                variant="standard"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                inputProps={{
                  style: {
                    fontSize: "20px",
                    color: descriptionCol,
                  },
                }}
              >
                {numbers.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField> */}

              {/* <Typography
                ml="0.6rem"
                fontSize="46px"
                fontWeight="bold"
                color={descriptionCol}
              >
                /10
              </Typography> */}
            </Box>
          </Box>
        </Box>

        {/* Description */}
        <Box mt="1.5rem" pb="5rem">
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
