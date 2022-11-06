import type { Ref } from "vue";
export interface IStepsProps {
  space: number | string;
  active: number;
  direction: string;
  simple: boolean;
  alignCenter: boolean;
  finishStatus: string;
  processStatus: string;
}

export interface StepItemState {
  uid: number;
  currentStatus: string;
  setIndex: (val: number) => void;
  calcProgress: (status?: string) => void;
}

export interface IStepsInject {
  props: IStepsProps;
  steps: Ref<StepItemState[]>;
}
