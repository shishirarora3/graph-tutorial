import {createStore} from 'satcheljs';

export const getCalendarStore = createStore("calendarStore", {
    events:{value: []}
});