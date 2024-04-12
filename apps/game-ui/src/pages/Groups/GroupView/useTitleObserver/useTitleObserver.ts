import { useEffect } from 'react';

export const useTitleObserver = (
  action: (entry: IntersectionObserverEntry) => void,
  domStatus: boolean,
  getObservable: () => Element | null
) => {
  useEffect(() => {
    const observable = getObservable();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          action(entry);
        });
      },
      {
        threshold: [0.4, 0.45, 0.5, 0.55, 0.6],
      }
    );

    observable && observer.observe(observable);
  }, [domStatus]);
};
