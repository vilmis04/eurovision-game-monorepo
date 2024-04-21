import { FinalVoteProps } from '../CountryRow.types';

export const FinalVote: React.FC<FinalVoteProps> = ({
  position,
  notAvailableSpots,
  updateScore,
}) => {
  return <div>{`Postition: ${position}`}</div>;
};
