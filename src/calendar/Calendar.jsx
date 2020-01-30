import React from 'react';
import {CalendarListItemHeader} from "./CalendarListItemHeader";
import {CalendarListItem} from "./CalendarListItem";
import {getDateTime} from "./utils";
import config from "../Config";
import {getEvents} from "../GraphService";
import "./Calender.css";

const getDuration = (end, start) => {
    let distance = Math.abs(new Date(end) - new Date(start));
    const hours = Math.floor(distance / 3600000);
    distance -= hours * 3600000;
    const minutes = Math.floor(distance / 60000);
    return `${hours}:${("0" + minutes).slice(-2)}`;
};

const getParsedEvents =  (events) => {
        try {
            const dateGroups = {};
            events.value.forEach(item => {
                const start = getDateTime(item?.start?.dateTime);
                const end = getDateTime(item?.end?.dateTime);
                const duration = getDuration(item?.end?.dateTime, item?.start?.dateTime);
                dateGroups[start[3]] = dateGroups[start[3]] || [];
                const _item = {
                    ...item,
                    itemId: item?.id,
                    subject: item?.subject,
                    isRead: true,
                    start,
                    end,
                    location: item?.location?.displayName,
                    duration
                };
                dateGroups[start[3]].push(_item);
            });
            return dateGroups;
        } catch (err) {
            console.log("Error : " + err);
        }

};


export class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          eventsList: []
        };
    }

    async componentDidMount() {
        try {
            // Get the user's access token
            const accessToken = await window.msal.acquireTokenSilent({
                scopes: config.scopes
            });
            // Get the user's events
            const events = await getEvents(accessToken);
            // Update the array of events in state
            this.setState({eventsList: getParsedEvents(events)});
        } catch (err) {
            console.error('ERROR', JSON.stringify(err));
        }
    }

    render() {
        const {eventsList} = this.state;
        const eventKeys = Object.keys(eventsList).sort();
        return <div className="mailListContainer">{
            eventKeys.map((eventKey, k) => <React.Fragment key={k}>
                <CalendarListItemHeader start={eventsList[eventKey][0]?.start}/>
                {eventsList[eventKey].map((e, k)=><CalendarListItem key={k} {...e} />)}
            </React.Fragment>)
        }
        </div>;
    }
}