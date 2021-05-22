import { useRouter } from 'next/router';
import  { getFilteredEvents } from '../../dummy-data';

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


  if(isNaN(numMonth) ||
     isNaN(numYear) ||
     numYear > 2020 ||
     numYear < 2021 ||
     numMonth < 1 ||
     numMonth > 12) {
    return <p>Invalid filter please try again</p>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  if(!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found</p>
  }

  return <div><h1>FilteredEventsPage</h1></div>
}

export default FilteredEventsPage;

