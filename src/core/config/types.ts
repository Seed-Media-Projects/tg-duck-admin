export type ConfigData = {
  id: number;
  techProblem: boolean;
  notification: boolean;
  notificationText: string;
  file: {
    id: number;
    fileUrl: string;
    name: string | null;
    deleted: string | null;
  } | null;
  created: string;
  deleted: string | null;
};

export type SaveConfigPayload = {
  fileId: number;
  techProblem: boolean;
  notification: boolean;
  notificationText: string;
};
