import { Fragment } from 'react';
import { useRouter } from 'next/router';
import  { getFilteredEvents } from '../..//helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = props => {
  const router = useRouter();

  // const filterData = router.query.slug;

  // if(!filterData) {
  //   return <p classes='center'>Loading...</p>
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if(props.hasError) {
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

  const filteredEvents = props.events;

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

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents}/>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const {params} = context;

  const filterData = params.slug;

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
    return {
      props: {
        hasError: true
      }
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth
      }
    }
  }
}

export default FilteredEventsPage;

