import React from 'react';

  import {Calendar} from "./Calendar";
  import {CalendarHeader} from "./CalendarHeader";


export const
    CalendarBox = (props) =><>
      <CalendarHeader {...props}/>
      <Calendar {...props}/>
      </>;

