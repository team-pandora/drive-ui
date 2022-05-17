import React, { useEffect } from "react";
import { Box, CircularProgress, LinearProgress, Stack } from "@mui/material";
import TableMenuHeader from "../components/BreadCrumbs";
import { MyDriveData } from "../data/fakedata";
import Table from "../components/tables/MyDrive";
import { useQuery, useQueryClient } from "react-query";
import { getFile } from "../api/files";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const MyDrive = () => {
  const params: { folderId: string } = useParams();
  const folderId: string | null = params.folderId ? params.folderId : null;
  const [files, setFiles] = React.useState([]);

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
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  );

  if (isLoading) {
    console.log("loading");
  }

  return (
    <Box
      flex={4}
      p={2}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <TableMenuHeader hierarchy={["האחסון שלי", "תיקייה 1"]} />
      <Table filesArray={files}/>
      <ToastContainer position="bottom-right" />
      {isLoading && (
        <Stack
          sx={{
            width: "85%",
            color: "grey.500",
            position: "absolute",
          }}
          spacing={2}
        >
          <LinearProgress color="inherit" />
        </Stack>
      )}
    </Box>
  );
};

export default MyDrive;
