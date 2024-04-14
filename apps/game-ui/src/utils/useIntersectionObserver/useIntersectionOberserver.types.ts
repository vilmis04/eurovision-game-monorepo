export type ThresholdConfig = {
  /**  Default: 0, min: 0 */
  min?: number;
  /**  Default: 1, max: 1 */
  max?: number;
  /**  Default: 0.01, cannot be more than max or less than min */
  step?: number;
};

interface IntersectionObserverOptions
  extends Omit<IntersectionObserverInit, 'threshold'> {
  threshold?: ThresholdConfig | number[];
}

export interface UseIntersectionObserverParams {
  action: (entry: IntersectionObserverEntry) => void;
  domStatus: boolean;
  getObservables: () => Element[] | null;
  options?: IntersectionObserverOptions;
}
