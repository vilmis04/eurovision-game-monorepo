export interface GetGroupResponse {
  id: number;
  members: string[];
  name: string;
  owner: string;
}

type PlayerResults = {
  position: number;
  score: number;
};

type GroupId = number;
type GroupName = string;
type PlayerName = string;

export interface LeaderboardResponse {
  groups: Record<GroupId, GroupName>;
  playerList: Record<PlayerName, PlayerResults>;
}
