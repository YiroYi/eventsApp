import { Fragment } from 'react';
import { useRouter } from 'next/router';
import  { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  if(!filterData) {
    return <p classes='center'>Loading...</p>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  console.log(numYear);
  console.log(numMonth);

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

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
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

export default FilteredEventsPage;

