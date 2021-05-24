import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import  { getFilteredEvents } from '../..//helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = props => {
  const [loadedEvents, setLoadedEvents] = useState();

  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR('https://eventsplanner-3e6ec-default-rtdb.firebaseio.com/events.json');

  useEffect(() => {
    if(data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if(!loadedEvents) {
    return <p classes='center'>Loading...</p>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if(isNaN(numMonth) ||
       isNaN(numYear) ||
       numYear > 2022 ||
       numYear < 2021 ||
       numMonth < 1 ||
       numMonth > 12) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>Show all events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if(!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents}/>
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const {params} = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if(isNaN(numMonth) ||
//      isNaN(numYear) ||
//      numYear > 2022 ||
//      numYear < 2021 ||
//      numMonth < 1 ||
//      numMonth > 12 ||
//      error ) {
//     return {
//       props: {
//         hasError: true
//       }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }
// }

export default FilteredEventsPage;

