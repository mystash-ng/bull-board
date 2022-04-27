import React, { useState } from 'react';
import { Store } from '../../hooks/useStore';
import { JobCard } from '../JobCard/JobCard';
import { SearchQueue } from '../SearchQueue/SearchQueue';
import { QueueActions } from '../QueueActions/QueueActions';
import { StatusMenu } from '../StatusMenu/StatusMenu';
import s from './QueuePage.module.css';
import { AppQueue } from '@bull-board/api/typings/app';
import { Pagination } from '../Pagination/Pagination';
import { useQuery } from '../../hooks/useQuery';

type State = {
  key: string;
  value: string;
};

export const QueuePage = ({
  selectedStatus,
  actions,
  queue,
}: {
  queue: AppQueue | undefined;
  actions: Store['actions'];
  selectedStatus: Store['selectedStatuses'];
}) => {
  // console.log('This is the Queue', queue);
  const query = useQuery();
  const searchTab = query.get('status');

  const [state, setState] = useState<State>({
    key: '',
    value: '',
  });
  if (!queue) {
    return <section>Queue Not found</section>;
  }

  return (
    <section>
      <div className={s.stickyHeader}>
        <SearchQueue
          //  queue={queue}
          state={state}
          setState={setState}
        />
        <StatusMenu queue={queue} actions={actions} />
        <div className={s.actionContainer}>
          <div>
            {queue.jobs.length > 0 && !queue.readOnlyMode && (
              <QueueActions
                queue={queue}
                actions={actions}
                status={selectedStatus[queue.name]}
                allowRetries={queue.allowRetries}
              />
            )}
          </div>
          <Pagination pageCount={queue.pagination.pageCount} />
        </div>
      </div>
      {searchTab === 'search'
        ? queue.jobs
            .filter((job) => {
              let objKeys = Object.keys(job.data);
              const hasKey = objKeys.includes(state.key);
              if (hasKey && job.data[state.key] === state.value) {
                console.log(job);
                return job;
              }
            })
            .map((job) => (
              <JobCard
                key={job.id}
                job={job}
                status={selectedStatus[queue.name]}
                actions={{
                  cleanJob: actions.cleanJob(queue?.name)(job),
                  promoteJob: actions.promoteJob(queue?.name)(job),
                  retryJob: actions.retryJob(queue?.name)(job),
                  getJobLogs: actions.getJobLogs(queue?.name)(job),
                }}
                readOnlyMode={queue?.readOnlyMode}
                allowRetries={queue?.allowRetries}
              />
            ))
        : queue.jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              status={selectedStatus[queue.name]}
              actions={{
                cleanJob: actions.cleanJob(queue?.name)(job),
                promoteJob: actions.promoteJob(queue?.name)(job),
                retryJob: actions.retryJob(queue?.name)(job),
                getJobLogs: actions.getJobLogs(queue?.name)(job),
              }}
              readOnlyMode={queue?.readOnlyMode}
              allowRetries={queue?.allowRetries}
            />
          ))}
    </section>
  );
};
