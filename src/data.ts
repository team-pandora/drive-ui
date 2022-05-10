export const fsobject = {
  key: "1",
  bucket: "1",
  source: "drive",
  size: 50,
  isPublic: false,
  _id: "6267ebf6503a7fc0a3c3572a",
  name: "file-3",
  parent: null,
  type: "file",
  createdAt: "2022-04-26T12:56:22.520Z",
  updatedAt: "2022-04-26T12:56:22.520Z",
  __v: 0,
};

interface Data {
  key: string;
  bucket: string;
  source: string;
  size: number;
  isPublic: boolean;
  _id: string;
  name: string;
  parent: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

function createData(
  key: string,
  bucket: string,
  source: string,
  size: number,
  isPublic: boolean,
  _id: string,
  name: string,
  parent: string,
  type: string,
  createdAt: string,
  updatedAt: string
): Data {
  return {
    key,
    bucket,
    source,
    size,
    isPublic,
    _id,
    name,
    parent,
    type,
    createdAt,
    updatedAt,
  };
}

export const rows = [
  createData(
    "1",
    "1",
    "drive",
    50,
    false,
    "6267ebf6503a7fc0a3c3572a",
    "file-3",
    "2",
    "file",
    "2022-04-26T12:56:22.520Z",
    "2022-04-26T12:56:22.520Z"
  ),
  createData(
    "2",
    "1",
    "drive",
    50,
    false,
    "6267ebf6503a7fc0a3c3572a",
    "file-3",
    "null",
    "file",
    "2022-04-26T12:56:22.520Z",
    "2022-04-26T12:56:22.520Z"
  ),
  createData(
    "3",
    "1",
    "drive",
    50,
    false,
    "6267ebf6503a7fc0a3c3572a",
    "file-3",
    "1",
    "file",
    "2022-04-26T12:56:22.520Z",
    "2022-04-26T12:56:22.520Z"
  ),
];

export interface FileData {
  stateId: string;
  userId: string;
  fsObjectId: string;
  favorite: boolean;
  trash: boolean;
  stateCreatedAt: string;
  stateUpdatedAt: string;
  key: string;
  bucket: string;
  source: string;
  size: number;
  public: boolean;
  name: string;
  parent: string;
  type: string;
  fsObjectCreatedAt: string;
  fsObjectUpdatedAt: string;
}
