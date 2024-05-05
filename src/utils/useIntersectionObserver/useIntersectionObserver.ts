import { useEffect } from 'react';
import { UseIntersectionObserverParams } from './useIntersectionOberserver.types';
import {
  calculateThreshold,
  isThresholdArray,
} from './useIntersectionObserver.utils';

export const useIntersectionObserver = ({
  action,
  domStatus,
  getObservables,
  options,
}: UseIntersectionObserverParams) => {
  const { root, rootMargin, threshold } = options ?? {};

  useEffect(() => {
    const observables = getObservables();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          action(entry);
        });
      },
      {
        threshold: isThresholdArray(threshold)
          ? threshold
          : calculateThreshold(threshold),
        root,
        rootMargin,
      }
    );

    observables &&
      observables.map((observable) => observer.observe(observable));
  }, [domStatus]);
};
