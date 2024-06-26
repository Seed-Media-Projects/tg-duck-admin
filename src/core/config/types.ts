import { BaseFileInfo } from '../files';

export type ConfigData = {
  id: number;
  techProblem: boolean;
  notification: boolean;
  notificationText: string;
  file: BaseFileInfo | null;
  created: string;
  deleted: string | null;
};

export type SaveConfigPayload = {
  fileId: number;
  techProblem: boolean;
  notification: boolean;
  notificationText: string;
};
