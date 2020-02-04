import React from 'react';
import "../styles/CalendarListItemHeader.css";

export const CalendarListItemHeader = ({
                                         start
})=><div className="header_4">
  <div className="header_5">
    <div className="header_6">
      { start[0]} {start[2]}
    </div>
  </div>
</div>;