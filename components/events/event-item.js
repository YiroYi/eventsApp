import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

import classes from './event-item.module.css';

const EventItems = props => {
  const {title, image, date, location, id} = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`

  return(
    <li className={classes.item}>
      <img src={image} alt="Image" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon/>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon/>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <span>
            <Button link={exploreLink}>Explore Event</Button>
          </span>
          <span className={classes.icon}>
            <ArrowRightIcon/>
          </span>
        </div>
      </div>
    </li>
  );
}

export default EventItems;
