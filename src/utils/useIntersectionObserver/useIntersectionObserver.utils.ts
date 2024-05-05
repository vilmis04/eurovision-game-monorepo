import { ThresholdConfig } from './useIntersectionOberserver.types';

export const checkMaxValue = (value: number | undefined) => {
  const limit = 1;
  if (!value) return limit;
  if (value > limit) return limit;

  return value;
};

export const checkMinValue = (value: number | undefined) => {
  const limit = 0;
  if (!value) return limit;
  if (value < limit) return limit;

  return value;
};

export const checkStepValue = (step: number | undefined) => {
  const defaultStep = 0.01;
  const minStep = 0;
  const maxStep = 1;
  if (!step) return defaultStep;
  if (step >= maxStep || step <= minStep) return defaultStep;

  return step;
};

export const calculateThreshold = (config: ThresholdConfig = {}) => {
  const max = checkMaxValue(config.max);
  const min = checkMinValue(config.min);
  const step = checkStepValue(config.step);

  const threshold: number[] = [];
  for (let i = min * 100; i <= max * 100; i += step * 100) {
    threshold.push(i / 100);
  }

  return threshold;
};

export const isThresholdArray = (
  threshold?: ThresholdConfig | number[]
): threshold is number[] => Array.isArray(threshold);
