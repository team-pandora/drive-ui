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
import Owners from "./Owners";

const AccordionSummaryBox = styled(AccordionSummary)({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const ShareUsers: React.FC<{isOpen: boolean, handleChange: () => void}> = (props) => {
    return (
        <Accordion expanded={props.isOpen} onChange={props.handleChange} dir="rtl">
        <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{
          height: "80px",
        }}
      >
        <AccordionSummaryBox>
          <Avatar sx={{ backgroundColor: props.isOpen ? "#4285f4" : "#9aa0a6" }}><PersonAddAlt /></Avatar>
          <Typography
            sx={{ margin: "0 10px", fontSize: "22px",}}>שיתוף עם אנשים וקבוצות
          </Typography>
        </AccordionSummaryBox>
      </AccordionSummary>
        <AccordionDetails

        >
          <SearchUsers />
          <Owners/>

        </AccordionDetails>
      </Accordion>
    );
};

export default ShareUsers;