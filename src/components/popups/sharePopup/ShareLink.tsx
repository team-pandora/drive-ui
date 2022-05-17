import React, { useState, Fragment } from "react";
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Avatar,
  styled,
  InputBase,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import { Link, PersonAddAlt } from "@mui/icons-material";
import SearchUsers from "./SearchUsers";
import i18next from "i18next";

const AccordionSummaryBox = styled(AccordionSummary)({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const ShareLink: React.FC<{ isOpen: boolean; handleChange: () => void }> = (
  props
) => {
  const handleFocus = (event: any) => event.target.select();

  return (
    <Accordion expanded={!props.isOpen} onChange={props.handleChange} dir="rtl">
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{
          height: "80px",
        }}
      >
        <AccordionSummaryBox>
          <Avatar sx={{ backgroundColor: props.isOpen ? "#9aa0a6" : "#4285f4" }}><Link /></Avatar>
          <Typography
            sx={{ margin: "0 10px", fontSize: "22px",}}>להצגת הקישור
          </Typography>
        </AccordionSummaryBox>
      </AccordionSummary>

      <AccordionDetails sx={{
        //   backgroundColor: 'pink',
      }}>
          <Stack spacing={4}>
          <Stack direction="row" spacing={0} justifyContent="space-between">
          <InputBase
              style={{
                width: "80%",
                backgroundColor: "#f5f5f5",
              }}
              type="text"
              readOnly
              onFocus={handleFocus}
              value={
                "https://drive.google.com/drive/folders/1la4wYAwz9mtHcySorx4yMF1Zr1AqyJbd?usp=sharing"
              }
            />
            <Button sx={{ color: "#4285f4", margin: "0px 1%", textTransform: "none" }}>{`${'יצירת קישור'}`}</Button>
          </Stack>
          <Stack direction="row" spacing={0} justifyContent="flex-end">
            <Button variant="contained" sx={{ margin: "0px 1%", textTransform: "none" }}>{`${'סיום'}`}</Button>
          </Stack>
          </Stack>

      </AccordionDetails>
    </Accordion>
  );
};

export default ShareLink;
