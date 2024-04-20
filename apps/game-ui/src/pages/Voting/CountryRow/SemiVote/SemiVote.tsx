import { VoteProps } from '../CountryRow.types';

export const SemiVote: React.FC<VoteProps> = ({
  inFinal,
  position,
  updateScore,
}) => {
  return <div>{`Top ten: ${inFinal}`}</div>;
};
