import React from "react";
import { Box, LinearProgress, Stack } from "@mui/material";
import TableMenuHeader from "../components/BreadCrumbs";
import Table from "../components/tables/MyDrive";
import Grid from "../components/grids/MyDrive";
import { useQuery } from "react-query";
import { getFile } from "../api/files";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import i18next from "i18next";

const MyDrive = () => {
  const params: { folderId: string } = useParams();
  const folderId: string | null = params.folderId ? params.folderId : null;
  const [files, setFiles] = React.useState([]);
  const isGridView = useSelector((state: any) => state.ui.isGridView);
  console.log(isGridView);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery(
    "files",
    () => getFile(folderId),
    {
      onError: (error) => {
        toast.error("Failed loading files");
      },
      onSuccess: (data) => {
        setFiles(data);
      },
      // refetchInterval: 1000,
      // refetchIntervalInBackground: true,
    }
  );

  if (isLoading) {
    console.log("loading");
  }

  const stack = isLoading && <Stack
  sx={{
    width: "85%",
    color: "grey.500",
    position: "absolute",
  }}
  spacing={2}
>
  <LinearProgress color="inherit" />
</Stack>

  return (
    <Box flex={4} paddingTop={2} padding={2}>
      <TableMenuHeader hierarchy={[i18next.t("titles.MyDrive")]} />
      {isGridView ? <Grid filesArray={files} /> : <Table filesArray={files} />}
      <ToastContainer position="bottom-right" />
      {stack}
    </Box>
  );
};

export default MyDrive;
