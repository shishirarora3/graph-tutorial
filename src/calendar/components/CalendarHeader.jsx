import React from 'react';
import "../styles/CalendarHeader.css";
export const CalendarHeader = ({headerText}) =><div className="header" >
  <div className="header-item">
      <span>{headerText}</span>
  </div>
</div>;
