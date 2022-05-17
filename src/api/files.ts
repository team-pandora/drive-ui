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
  const response = await Axios.get(`http://localhost:8000/api/actions/fsObjects/states?userId=123&parent=${parent}`);
  const data =await response.data;
  return data;
}


