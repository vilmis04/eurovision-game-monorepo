import { VoteProps } from '../CountryRow.types';

export const FinalVote: React.FC<VoteProps> = ({
  position,
  inFinal,
  updateScore,
}) => {
  return <div>{`Postition: ${position}`}</div>;
};
