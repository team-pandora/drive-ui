import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Avatar,
  styled,
  InputBase,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { Link } from "@mui/icons-material";
import i18next from "i18next";
import CreateLink from "./CreateLink";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../../store/popups";

const AccordionSummaryBox = styled(AccordionSummary)({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const ShareLink: React.FC<{ isOpen: boolean; handleChange: () => void }> = (
  props
) => {
  const dispatch = useDispatch();
  const dir = i18next.dir(i18next.language);
  const handleFocus = (event: any) => event.target.select();
  const [link, setLink] = React.useState("");

  const handleCreate = (time: string, permission: string) => {
    //create link
    setLink(
      "https://drive.google.com/drive/folders/1la4wYAwz9mtHcySorx4yMF1Zr1AqyJbd?usp=sharing"
    );
  };

  const handleFinish = () => {
    dispatch(popupActions.setShare());
  };
  return (
    <Accordion expanded={!props.isOpen} onChange={props.handleChange} dir={dir}>
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{
          height: "80px",
        }}
      >
        <AccordionSummaryBox>
          <Avatar
            sx={{ backgroundColor: props.isOpen ? "#9aa0a6" : "#4285f4" }}
          >
            <Link />
          </Avatar>
          <Typography sx={{ margin: "0 10px", fontSize: "22px" }}>
            {`${i18next.t("messages.ShareByLinkTitle")}`}
          </Typography>
        </AccordionSummaryBox>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <CreateLink handleCreate={handleCreate} />
            {link !== "" && (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "50px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <InputBase
                  style={{
                    width: "90%",
                    backgroundColor: "#f5f5f5",
                  }}
                  type="text"
                  readOnly
                  onFocus={handleFocus}
                  value={link}
                />
              </Box>
            )}
          </Stack>
          <Stack direction="row" spacing={0} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleFinish}
              sx={{ margin: "0px 1%", textTransform: "none" }}
            >{`${i18next.t("buttons.Finish")}`}</Button>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default ShareLink;
