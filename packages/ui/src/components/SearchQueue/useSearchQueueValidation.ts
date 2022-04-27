import * as Yup from 'yup';
import { Fields } from './SearchQueueConstants';

export const useSearchQueueValidation = () => {
  return Yup.object().shape({
    [Fields.JOBKEY]: Yup.string()
      .min(1, 'Job Data Key should be at least 1 character')
      .required('Please enter a Job Data Key'),
    [Fields.JOBVALUE]: Yup.string()
      .min(1, 'Job Data Value should be at least 1 character')
      .required('Please enter a Job Data Value'),
  });
};
