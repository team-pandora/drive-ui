import React from 'react';
import { Box, Typography } from '@mui/material'

const GridHeader: React.FC<{label: string}> = (props) => {
  return (
    <Box sx={{
        width: "100%",
        height: "40px",
        // backgroundColor: "grey.100",
    }}>
        <Typography color={'gray'} variant="body1">{props.label}</Typography>
    </Box>
  )
}

export default GridHeader
