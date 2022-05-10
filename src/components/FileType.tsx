import React from 'react';
import { SvgIcon } from '@mui/material';

import { Folder } from "@mui/icons-material";

const FileType = (fileType: string) => {
    switch (fileType) {
        case 'folder':
            return <Folder sx={{ color: "rgb(95, 99, 104)" }} />
        case 'png':
            return <SvgIcon>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />

            </SvgIcon>

    }

};

export default FileType;