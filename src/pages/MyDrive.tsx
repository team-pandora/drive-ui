import React from "react";
import { Box } from "@mui/material";
import TableMenuHeader from "../components/BreadCrumbs";
import { MyDriveData } from "../data/fakedata";
import Table from '../components/tables/MyDrive';

const MyDrive = () => {

  // const { data, isLoading, isError, error } = useQuery("files", getFile);

  // if (isLoading) {
  //   return (
  //     <Box flex={4} p={2} height={800}>
  //       'Loading files...'
  //     </Box>
  //   );
  // }

  // if (isError) {
      
  //   return (
  //     <Box flex={4} p={2} height={800}>
  //       'Something went wrong!!'
  //     </Box>
  //   );
  // }

  return (
    <Box flex={4} p={2}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <TableMenuHeader hierarchy={["האחסון שלי", "תיקייה 1",]} />
      <Table filesArray={MyDriveData}/>
    </Box>
  );
};

export default MyDrive;
