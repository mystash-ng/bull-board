export enum Fields {
  JOBKEY = 'jobKey',
  JOBVALUE = 'jobValue',
}

export const INITIAL_SEARCH_QUEUE_VALUES: Record<Fields, string> = {
  [Fields.JOBKEY]: '',
  [Fields.JOBVALUE]: '',
};
