import React from "react";
import { styled, InputBase, Box, IconButton } from "@mui/material";
import { width } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import i18next from "i18next";

const SearchBox = styled(Box)(() => ({
  display: "flex",
  // gap: "10px",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,.04)",
  width: "600px",
  height: "50px",
    borderRadius: "10px 10px 0px 0px",   
//   borderRadius: 10,
  borderBottom: "2px solid #4285f4",
}));

const Search = styled("div")(() => ({
//   padding: "0 10px",
//   borderRadius: 8,
  width: "100%",
}));

const PlaceHolderAndIcon = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  margin: "0 10px",
  width: "100%",
}));

const SearchBar = () => {
  const lang = useSelector((state: any) => state.ui.language);
  const dir = lang === "en" ? "ltr" : "rtl";

  return (
    <SearchBox dir={dir}>
      <PlaceHolderAndIcon>
        <Search sx={{ width: "100%" }}>
          <InputBase sx={{ width: "100%", fontSize: '14px' }} placeholder={`הוספת אנשים וקבוצות`} />
        </Search>
      </PlaceHolderAndIcon>
    </SearchBox>
  );
};

export default SearchBar;
