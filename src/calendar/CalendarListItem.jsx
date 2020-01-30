
import React from 'react';
import './CalendarListItem.css';

export const CalendarListItem = ({start, duration, subject, location, body:{content}}) => <div className="calendar_3">
  <div className="calendar_4">
    <div className="calendar_5">{start && start[1]}</div>
    <div className="calendar_6">{duration}</div>
    <div>{JSON.stringify(content)}</div>
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
</div>;
