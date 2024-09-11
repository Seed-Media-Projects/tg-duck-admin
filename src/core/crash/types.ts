export type CrashGameItem = {
  id: string;
  resultRatio: number;
  created: string;
  started: string | null;
  finished: string | null;
};

export type CrashGamePlayer = {
  id: string;
  winner: boolean;
  bet: number;
  ratio: number;
  joined: string;
  stopped: string | null;
  stoppedBy: 'system' | 'player' | null;
};

export type CrashGameInfo = CrashGameItem & {
  players: CrashGamePlayer[];
};
