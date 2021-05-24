import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';

const AllEventsPage = props => {

  const router = useRouter();
  const {events} = props;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <Fragment>
        <EventSearch onSearch={findEventsHandler} />
        <EventList items={events} />
      </Fragment>
    </div>
  );
}

export async function getStaticProps() {
   const events = await getAllEvents();

   return {
    props: {
      events: events
    },
    revalidate: 60
   }
}

export default AllEventsPage;
