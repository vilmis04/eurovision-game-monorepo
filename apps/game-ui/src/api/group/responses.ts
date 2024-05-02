export interface GetGroupResponse {
  id: number;
  members: string[];
  name: string;
  owner: string;
}

type PlayerResults = {
  name: string;
  position: number;
  score: number;
};

type GroupId = number;
type GroupName = string;

export interface LeaderboardResponse {
  groups: Record<GroupId, GroupName>;
  playerList: PlayerResults[];
}
