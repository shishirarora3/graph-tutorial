
import React from 'react';
import '../styles/CalendarListItem.css';
import {Link} from "react-router-dom";
export const CalendarListItem = (props) => {
  const {start, duration, subject, location} = props;
  const encodeEtag = encodeURIComponent(props["@odata.etag"]);
  return <Link className="calendar_3"  to={`/event-details/${encodeEtag}`}>
    <div className="calendar_4">
      <div className="calendar_5">{start && start[1]}</div>
      <div className="calendar_6">{duration}</div>
    </div>
    <div className="calendar_7">
      <div className="calendar_8" />
    </div>
    <div className="calendar_9">
      <div className="calendar_12">
        <div className="calendar_13">
          <div className="calendar_14">{subject}</div>
        </div>
        {location &&
        <div className="calendar_15">
          <span role="img">&#128205;</span>
          {location}
        </div>
        }
      </div>
    </div>
  </Link>;
}
