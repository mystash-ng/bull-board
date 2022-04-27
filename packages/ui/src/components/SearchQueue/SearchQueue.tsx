import React from 'react';
import { Field, Formik, Form, FieldProps } from 'formik';
import cn from 'clsx';
// import { AppQueue } from '@bull-board/api/typings/app';
import { SearchIcon } from '../Icons/Search';
import s from './SearchQueue.module.css';
import { Redirect } from 'react-router-dom';

import { useActiveQueue } from '../../hooks/useActiveQueue';

import { useSearchQueueValidation } from './useSearchQueueValidation';
import { Fields, INITIAL_SEARCH_QUEUE_VALUES } from './SearchQueueConstants';

import { GetQueuesResponse } from '@bull-board/api/typings/responses';

type State = {
  data: null | GetQueuesResponse;
  loading: boolean;
};

export interface Store {
  state: State;
}

export const SearchQueue = ({ state, setState }: { state: any; setState: any }) => {
  const activeQueue = useActiveQueue();

  const redirectUrl = `/queue/${activeQueue}?status=search`;

  const validationSchema = useSearchQueueValidation();

  const redirectToSearchTab = (url: string) => {
    return <Redirect to={url} />;
  };

  return (
    <Formik
      initialValues={INITIAL_SEARCH_QUEUE_VALUES}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        setState({ ...state, key: values.jobKey, value: values.jobValue });
        redirectToSearchTab(redirectUrl);
        resetForm();
      }}
    >
      {(formikBag) => {
        return (
          <Form>
            <div className={s.searchDiv}>
              <Field name={Fields.JOBKEY}>
                {({ field, form }: FieldProps<string>) => {
                  return (
                    <div>
                      <div className={s.searchWrapper}>
                        <SearchIcon />
                        <input
                          {...field}
                          className={s.search}
                          type="search"
                          id="search-queues"
                          placeholder="enter job key"
                        />
                      </div>
                      <p className={s.errorText}>
                        {form.touched[Fields.JOBKEY] && form.errors[Fields.JOBKEY]}
                      </p>
                    </div>
                  );
                }}
              </Field>

              <Field name={Fields.JOBVALUE}>
                {({ field, form }: FieldProps<string>) => {
                  return (
                    <div>
                      <div className={s.searchWrapper}>
                        <SearchIcon />
                        <input
                          {...field}
                          className={s.search}
                          type="search"
                          id="search-queues"
                          placeholder="enter job value"
                        />
                      </div>
                      <p className={s.errorText}>
                        {!form.errors[Fields.JOBVALUE] &&
                          form.touched[Fields.JOBVALUE] &&
                          form.errors[Fields.JOBVALUE]}
                      </p>
                    </div>
                  );
                }}
              </Field>

              <button
                type="submit"
                className={cn(s.button, {
                  [s.isActive]: !formikBag.isSubmitting,
                })}
                onClick={() => {
                  formikBag.submitForm;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    formikBag.submitForm;
                  }
                }}
              >
                Search
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );

  // {
  //   redirect? <Redirect to="`/queue/${activeQueue}?status=search`" />)
  // }
};
