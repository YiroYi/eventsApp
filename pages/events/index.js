import { Fragment } from 'react';
import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';

const AllEventsPage = () => {
  const events = getAllEvents();

  return (
    <div>
      <Fragment>
        <EventSearch/>
        <EventList items={events}/>
      </Fragment>
    </div>
  );
}

export default AllEventsPage;
