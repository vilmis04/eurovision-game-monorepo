import { Box, Typography } from '@mui/material';
import { styles } from './MemberList.styles';
import { useIntersectionObserver } from '../../../../utils/useIntersectionObserver/useIntersectionObserver';
import { MemberRow } from './MemberRow/MemberRow';
import { Spinner } from '../../../../components/Spinner/Spinner';

interface MemberListProps {
  isFetching?: boolean;
  groupName: string;
  members?: string[];
  groupNameRefName: string;
}

const DIVIDER_OPACITY_ADJUSTMENT = 0.4;

const nicknameRootRef = 'nicknameRootRef';
const nicknameRef = 'nicknameRef';

export const MemberList: React.FC<MemberListProps> = ({
  isFetching = false,
  groupName,
  members = [],
  groupNameRefName,
}) => {
  useIntersectionObserver({
    action: (entry) => {
      const boundaryLine = window.innerHeight / 2;
      const position = entry.boundingClientRect.y;
      if (position > boundaryLine) {
        // @ts-expect-error target type does not expect to have style - but it does
        entry.target.style.opacity =
          entry.intersectionRatio + DIVIDER_OPACITY_ADJUSTMENT;
        const opacity = (entry.intersectionRatio - 0.3) / 0.7;
        let adjustedOpacity = opacity;
        if (opacity > 1) adjustedOpacity = 1;
        if (opacity < 0) adjustedOpacity = 0;
        // @ts-expect-error target type does not expect to have style - but it does
        entry.target.firstChild.style.opacity = adjustedOpacity;
      }
    },
    domStatus: isFetching,
    getObservables: () => {
      const elements: Element[] = [];
      document
        .querySelectorAll(`[data-ref="${nicknameRef}"]`)
        .forEach((element) => elements.push(element));

      return elements;
    },
    options: {
      root: document.querySelector(`[data-ref="${nicknameRootRef}"]`),
    },
  });

  return (
    <Box sx={styles.groupMembers} data-ref={nicknameRootRef}>
      <Spinner isLoading={isFetching} size={24} color="secondary">
        <Box>
          <Typography
            variant="h1"
            sx={styles.title}
            data-ref={groupNameRefName}
          >
            {groupName}
          </Typography>
          {members.map((member) => (
            <MemberRow key={member} member={member} memberRef={nicknameRef} />
          ))}
        </Box>
      </Spinner>
    </Box>
  );
};
