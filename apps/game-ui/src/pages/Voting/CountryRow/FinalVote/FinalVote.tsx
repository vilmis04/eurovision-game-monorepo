import { FinalVoteProps } from '../CountryRow.types';

export const FinalVote: React.FC<FinalVoteProps> = ({ position }) => {
  return <div>{`Postition: ${position}`}</div>;
};
