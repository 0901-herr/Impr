import React from "react";
import {
  Box,
  Typography,
  Drawer,
  InputBase,
  IconButton,
  Dialog,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  Close,
  ContentCopy,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import Navbar from "../Menu/index.jsx";
import FlexBetween from "../../components/FlexBetween.jsx";
import GradientText from "../../components/GradientText";
import GradientButton from "../../components/GradientButton.jsx";
import { useState } from "react";

const NewReviewDialog = (props) => {
  const { setIsAddNewReviewOpen, isAddNewReviewOpen } = props;
  const maxWidth = "600px";

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const menuText = theme.palette.neutral.menuText;
  const menuBackground = theme.palette.background.menu;
  const popUpBackground = theme.palette.neutral.popUp;
  const line = theme.palette.neutral.line;

  const titleCol = theme.palette.neutral.title;
  const calendarCol = theme.palette.neutral.calendar;
  const datesCol = theme.palette.neutral.dates;
  const descriptionCol = theme.palette.neutral.description;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [isDrag, setIsDrag] = useState(false);

  const handleClose = () => {
    setIsAddNewReviewOpen(false);
  };

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
      label: "6",
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
  return (
    <Dialog onClose={handleClose} open={isAddNewReviewOpen}>
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
              setIsAddNewReviewOpen(false);
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
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
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
            <Box display="flex" flexDirection="row" alignItems="center">
              <TextField
                select
                SelectProps={{
                  native: true,
                }}
                variant="standard"
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
              </TextField>

              <Typography
                ml="0.6rem"
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
        <Box mt="1.5rem" pb="5rem">
          <Typography fontSize="18px" fontWeight="bold" color={descriptionCol}>
            description
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
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

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // const { _id, picturePath } = useSelector((state) => state.user);

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const menuText = theme.palette.neutral.menuText;
  const menuBackground = theme.palette.background.menu;
  const popUpBackground = theme.palette.neutral.popUp;
  const line = theme.palette.neutral.line;

  const titleCol = theme.palette.neutral.title;
  const calendarCol = theme.palette.neutral.calendar;
  const datesCol = theme.palette.neutral.dates;
  const descriptionCol = theme.palette.neutral.description;

  const [isNavBarOpen, setIsNavBarOpen] = useState(true);
  const [isReviewDetailsOpen, setIsReviewDetailsOpen] = useState(false);
  const [isAddNewReviewOpen, setIsAddNewReviewOpen] = useState(false);

  const navBarProps = { setIsNavBarOpen };
  const newReviewProps = { isAddNewReviewOpen, setIsAddNewReviewOpen };

  const navBarWidth = 260;

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
        // pl={isNavBarOpen ? "6rem" : "10rem"}
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
            width={`${navBarWidth}px`}
            backgroundColor={calendarCol}
            borderRadius="8px"
            padding="0.3rem 1rem"
          >
            <InputBase placeholder="search" />
          </Box>
        </Box>

        {/* Section title */}
        <Box mt="2rem" ml="0.75rem">
          <Typography fontSize="30px" fontWeight="bold" color={titleCol}>
            books
          </Typography>
        </Box>

        {/* Reviews */}
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
                  setIsAddNewReviewOpen(true);
                }}
              >
                add
              </GradientButton>
            </Box>
          </FlexBetween>

          {/* Reviews */}
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setIsReviewDetailsOpen(true)}
            >
              <Box
                display="flex"
                p="0.75rem 0.75rem"
                mt="0.15rem"
                borderRadius="4px"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: calendarCol,
                  },
                }}
              >
                {/* Image */}
                <img
                  width="100"
                  height="100"
                  alt="advert"
                  src={process.env.PUBLIC_URL + "/img/book.jpeg"}
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                />

                {/* Summary */}
                <Box
                  width="60%"
                  height="100"
                  m="0 1.5rem"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ alignContent: "flex-start" }}>
                    <Typography
                      fontSize="20px"
                      fontWeight="bold"
                      color={titleCol}
                    >
                      The subtle art of not giving a fuck
                    </Typography>
                    <Typography fontSize="14px" color={datesCol}>
                      12.03.2022
                    </Typography>
                  </Box>

                  <Box mt="0.4rem">
                    <Typography fontSize="14px" color={descriptionCol}>
                      I recommend because it’s a tell us that the working
                      environment realy is not something...{" "}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Rating */}
              <Box width="20%" display="flex" justifyContent="center">
                <Typography
                  fontSize="26px"
                  fontWeight="bold"
                  color={descriptionCol}
                >
                  9/10
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setIsReviewDetailsOpen(true)}
            >
              <Box
                display="flex"
                p="0.75rem 0.75rem"
                mt="0.15rem"
                borderRadius="4px"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: calendarCol,
                  },
                }}
              >
                {/* Image */}
                <img
                  width="100"
                  height="100"
                  alt="advert"
                  src={process.env.PUBLIC_URL + "/img/book.jpeg"}
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                />

                {/* Summary */}
                <Box
                  width="60%"
                  height="100"
                  m="0 1.5rem"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ alignContent: "flex-start" }}>
                    <Typography
                      fontSize="20px"
                      fontWeight="bold"
                      color={titleCol}
                    >
                      The subtle art of not giving a fuck
                    </Typography>
                    <Typography fontSize="14px" color={datesCol}>
                      12.03.2022
                    </Typography>
                  </Box>

                  <Box mt="0.4rem">
                    <Typography fontSize="14px" color={descriptionCol}>
                      I recommend because it’s a tell us that the working
                      environment realy is not something...{" "}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Rating */}
              <Box width="20%" display="flex" justifyContent="center">
                <Typography
                  fontSize="26px"
                  fontWeight="bold"
                  color={descriptionCol}
                >
                  9/10
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setIsReviewDetailsOpen(true)}
            >
              <Box
                display="flex"
                p="0.75rem 0.75rem"
                mt="0.15rem"
                borderRadius="4px"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: calendarCol,
                  },
                }}
              >
                {/* Image */}
                <img
                  width="100"
                  height="100"
                  alt="advert"
                  src={process.env.PUBLIC_URL + "/img/book.jpeg"}
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                />

                {/* Summary */}
                <Box
                  width="60%"
                  height="100"
                  m="0 1.5rem"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ alignContent: "flex-start" }}>
                    <Typography
                      fontSize="20px"
                      fontWeight="bold"
                      color={titleCol}
                    >
                      The subtle art of not giving a fuck
                    </Typography>
                    <Typography fontSize="14px" color={datesCol}>
                      12.03.2022
                    </Typography>
                  </Box>

                  <Box mt="0.4rem">
                    <Typography fontSize="14px" color={descriptionCol}>
                      I recommend because it’s a tell us that the working
                      environment realy is not something...{" "}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Rating */}
              <Box width="20%" display="flex" justifyContent="center">
                <Typography
                  fontSize="26px"
                  fontWeight="bold"
                  color={descriptionCol}
                >
                  9/10
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Review details */}
      <Drawer
        anchor="right"
        open={isReviewDetailsOpen}
        onClose={() => setIsReviewDetailsOpen(false)}
      >
        <Box
          width="400px"
          display="flex"
          justifyContent="center"
          p="1.5rem 0rem"
        >
          <Box width="320px">
            {/* Title */}
            <Typography fontSize="24px" fontWeight="bold" color={titleCol}>
              The subtle art of not giving a fuck
            </Typography>

            {/* Image */}
            <Box mt="0.75rem">
              <img
                width="320"
                height="320"
                alt="advert"
                src={process.env.PUBLIC_URL + "/img/book.jpeg"}
                style={{ objectFit: "cover", borderRadius: "5px" }}
              />
            </Box>

            {/* Date */}
            <Box mt="1rem">
              <Typography fontSize="16px" fontWeight="medium" color={datesCol}>
                25.03.22
              </Typography>
            </Box>

            {/* Sumarry */}
            <Box mt="0.5rem">
              <Typography fontSize="15px" fontWeight="medium" color={titleCol}>
                I recommend because it told me to stop giving a fuck about the
                things i dont care
              </Typography>
            </Box>

            {/* Rating */}
            <Box mt="1.2rem">
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
                    9
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
            <Box mt="1.2rem">
              <Typography
                fontSize="16px"
                fontWeight="bold"
                color={descriptionCol}
              >
                description
              </Typography>

              <Box mt="0.4rem" display="flex" justifyContent="center">
                <Typography
                  paragraph
                  fontSize="15px"
                  fontWeight="medium"
                  color={titleCol}
                >
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </Typography>
              </Box>
            </Box>

            {/* Share */}
            <Box m="1.2rem 0">
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
                mt="0.4rem"
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
      </Drawer>

      {/* Add review */}
      <NewReviewDialog {...newReviewProps} />
    </Box>
  );
};

export default HomePage;
