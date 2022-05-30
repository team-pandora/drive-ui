import Axios from "axios";
// export const createFile = async () => {
//     const response = await Axios.post(
//         "http://localhost:8000/api/actions/users/122/fs/file",
//         {
//           name: 'maya',
//           size: '12346',
//           public: true,
//           source: "drive",
//           parent: null,
//           key: "abc",
//           bucket: "abc",
//         }
//       );

//       const data = await response.data;
//       return data;
// }

export const getFile = async (parent: null | string) => {
  const response = await Axios.get(
    `http://localhost:8000/api/users/62655a5dd681ae7e5f9eafe0/fsObjects/states?parent=${parent}`
  );
  const data = await response.data;
  return data;
};

export const createFile = async (file: any) => {
  const response = await Axios.post(
    "http://localhost:8000/api/users/62655a5dd681ae7e5f9eafe0/fs/file",
    {
      name: "alive4",
      parent: null,
      key: "string",
      bucket: "string",
      size: 50,
      public: false,
      source: "drive",
    }
  );
  const data = await response.data;
  console.log(data);
};

export const test = async () => {
  console.log("in test function");
}

export const RenameFile = async (fileId: string, newName: string) => {
  const response = await Axios.get(
    `http://127.0.0.1:8000/api/users/62655a5dd681ae7e5f9eafe0/fsObjects/states?parent=${null}`
  );
};
