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
  width: "640px",
  height: "50px",
  borderRadius: 10,
}));

const Search = styled("div")(() => ({
  padding: "0 10px",
  borderRadius: 8,
  width: "40%",
}));

const PlaceHolderAndIcon = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  margin: "0 10px",
  width: "100%",
}));

const SearchBar = () => {
  const dir = i18next.dir(i18next.language);

  return (
    <SearchBox dir={dir}>
      <PlaceHolderAndIcon>
        <IconButton sx={{}}>
          <SearchIcon sx={{ color: "#5f6368" }} />
        </IconButton>
        <Search sx={{ width: "100%" }}>
          <InputBase sx={{ width: "100%" }} placeholder={`${i18next.t("search.Search")}`} />
        </Search>
      </PlaceHolderAndIcon>
    </SearchBox>
  );
};

export default SearchBar;
