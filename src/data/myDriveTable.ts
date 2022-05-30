export interface Data {
  name: string;
  owner: string;
  lastUpdated: string;
  size: number;
}

function createData(
  name: string,
  owner: string,
  lastUpdated: string,
  size: number
): Data {
  return {
    name,
    owner,
    lastUpdated,
    size,
  };
}

export const rows = [
  createData("קובץ 1", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 2", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 3", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 4", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 5", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 6", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 7", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 8", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 9", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 0", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 10", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 11", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 12", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 13", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 14", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 15", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 16", "אני", "12 באפר' 2022 אני", 200),
  createData("קובץ 17", "אני", "12 באפר' 2022 אני", 200),
];

export interface SharedData {
  name: string;
  sharedBy: string;
  dateOfSharing: string;
}

export const sortableMyDriveCells = ["name", "lastUpdated"];
export const sortableTrashCells = ["lastUpdated"];

export const sortableHeadCells = {
  myDrive: ["name", "fsObjectUpdatedAt"],
  shared: ["name", "stateCreatedAt"],
  recent: [],
  starred: ["name", "fsObjectUpdatedAt"],
	trash: ["name", "fsObjectUpdatedAt"],
  sentFilesStatus: ["name", "transferDate"],
  incomingFiles: ["name", "fsObjectUpdatedAt"],
  outgoingFiles: ["name", "fsObjectUpdatedAt"],
}

// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
// }

// export const headCells: readonly HeadCell[] = [
//   {
//     id: "name",
//     numeric: false,
//     disablePadding: true,
//     label: "שם",
//   },
//   {
//     id: "owner",
//     numeric: false,
//     disablePadding: false,
//     label: "בעלים",
//   },
//   {
//     id: "lastUpdated",
//     numeric: false,
//     disablePadding: false,
//     label: `השינוי האחרון`,
//   },
//   {
//     id: "size",
//     numeric: false,
//     disablePadding: false,
//     label: `גודל הקובץ`,
//   },
// ];

// interface SharedHeadCell {
//   disablePadding: boolean;
//   id: keyof SharedData;
//   label: string;
//   numeric: boolean;
// }

// export const sharedheadCells: readonly SharedHeadCell[] = [
//   {
//     id: "name",
//     numeric: false,
//     disablePadding: true,
//     label: "שם",
//   },
//   {
//     id: "sharedBy",
//     numeric: false,
//     disablePadding: false,
//     label: "שותף על ידי",
//   },
//   {
//     id: "dateOfSharing",
//     numeric: false,
//     disablePadding: false,
//     label: `תאריך השיתוף`,
//   },
// ];
