import {getDateTime} from "../utils";
import {getCalendarStore} from "../store/getCalendarStore";
import {computed} from "mobx";

const getDuration = (end, start) => {
    let distance = Math.abs(new Date(end) - new Date(start));
    const hours = Math.floor(distance / 3600000);
    distance -= hours * 3600000;
    const minutes = Math.floor(distance / 60000);
    return `${hours}:${("0" + minutes).slice(-2)}`;
};
export const getParsedEventsMap = () => {
    const events = getCalendarStore()?.events;
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

export const getActiveEventDetailsByEtag = (activeEtag) =>{
    const events = getCalendarStore()?.events;
    const decodedAcTiveEtag = decodeURIComponent(activeEtag);
    return events?.value?.find(e=>{
        return e?.["@odata.etag"] === decodedAcTiveEtag;
    });
};