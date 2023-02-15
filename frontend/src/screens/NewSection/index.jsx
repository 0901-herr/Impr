import React, { useState, useEffect } from "react";
import { Box, Typography, InputBase, Dialog, useTheme } from "@mui/material";
import SectionDataService from "../../services/reviews";

const NewSectionDialog = (props) => {
  const {
    currentSection,
    isAddNewSection,
    isEditSection,
    setIsAddNewSection,
    setIsEditSection,
  } = props;
  const maxWidth = "600px";

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const menuText = theme.palette.neutral.menuText;
  const titleCol = theme.palette.neutral.title;

  const [title, setTitle] = useState("");

  const handleClose = () => {
    setIsAddNewSection(false);
    setIsEditSection(false);
    clearFields();
  };

  const clearFields = () => {
    setTitle("");
  };

  const onClickDone = () => {
    var data = {
      section_id: currentSection._id,
      user_id: "53a2b415cc3bd4ebac5eb6d4",
      title: title,
      name: "Philippe Yong",
    };

    if (isEditSection) {
      console.log("editing section...");
      SectionDataService.updateSection(data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      SectionDataService.createSection(data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    clearFields();
  };

  useEffect(() => {
    setTitle(currentSection?.title ?? "");
  }, [currentSection, isEditSection]);

  return (
    <Dialog onClose={handleClose} open={isAddNewSection || isEditSection}>
      <Box width={maxWidth} height="26vh" p="2rem">
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
            placeholder="section title"
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
      </Box>
    </Dialog>
  );
};

export default NewSectionDialog;
