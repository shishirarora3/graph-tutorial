import {mutatorAction} from 'satcheljs';
import {getCalendarStore} from '../store/getCalendarStore';

// returns a mutator function, which  creates and dispatches and handles, an UPDATE_CALENDAR_ITEMS_MAP action
export const updateCalendarItemsMap = mutatorAction("UPDATE_CALENDAR_ITEMS_MAP",(newEvents) => {
    const calendarStore = getCalendarStore();
    const {events} = calendarStore;
   events.value=newEvents.value;
});
