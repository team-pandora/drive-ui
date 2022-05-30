import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/material";

const MyDropzone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });


  return (
    <Box
    flex={4}
    p={2}
    sx={{
      width: "100%",
      height: "100%",
    }}
  >
      <Box style={{
        backgroundColor: isDragActive ? "lightgreen" : "lightblue",
        height: "830px"
      }} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Box>
  </Box>
  );
}

export default MyDropzone;