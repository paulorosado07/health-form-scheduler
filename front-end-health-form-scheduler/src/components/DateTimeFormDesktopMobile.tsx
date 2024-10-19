import MessageWelcome from "./MessageWelcome";
import ButtonsTime from "./ButtonsTime";
import { calendar, Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useEffect, useState } from "react";
import { getTimeRegistered } from "../utils/Api";
import { formatMillisecondToaDate } from "../utils/Functions";
import { Button } from "@nextui-org/react";



interface PropsDateTimeFormDesktopMobile {
    setTimeIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
    listDateSaved: string[];
    setListDateSaved: React.Dispatch<React.SetStateAction<string[]>>;
    value: object;
    setValue: React.Dispatch<React.SetStateAction<object>>;
}

function DateTimeFormDesktopMobile(props: PropsDateTimeFormDesktopMobile) {
    const { setTimeIsSelected, setValue, setListDateSaved, value, listDateSaved } = props;

    const [sessionMobile, setSessionMobile] = useState('');

    let isDateUnavailable = (date: any) => {

        if (typeof date === 'object') {
            let dateOnCalendar = `${parseInt(date.year)}-${parseInt(date.month)}-${parseInt(date.day)}`;

            if (listDateSaved.includes(dateOnCalendar) === true) {
                return true;
            }
        }
        return false;

    };

    const eventCalendar = (event: object) => {
        setValue(event);
        setSessionMobile('time');
    }

    useEffect(() => {
        getTimeRegistered().then(data => {

            let dataToSave = [];
            if (data['status'] === true) {
                for (let i = 0; i < data['value'].length; i++) {
                    let dataInMilliseconds = data['value'][i];
                    let resultFormatMillisecondToaDate = formatMillisecondToaDate(dataInMilliseconds);

                    if (resultFormatMillisecondToaDate['status'] === true) {
                        dataToSave.push(resultFormatMillisecondToaDate['value']);
                    }
                }
            }
            setListDateSaved(dataToSave);
        });
    }, [])

    return (
        <div className="flex flex-col gap-x-4 items-center style-container-calendar-time">

            {

                sessionMobile === 'calendar' ?
                    <>

                        Please Select a date
                        <br />
                        <br />

                        <Calendar

                            minValue={today(getLocalTimeZone())}
                            onChange={(event) => { eventCalendar(event); }}
                            isDateUnavailable={isDateUnavailable}
                            aria-label="Date (No Selection)" />

                    </>
                    : sessionMobile == 'time' && Object.keys(value).length > 0 ?

                    <ButtonsTime
                        setTimeIsSelected={setTimeIsSelected}
                    />
                      

                        :
                        <>
                            <div>
                                <MessageWelcome />
                            </div>
                            <Button className="style-btn-select-time mt-10" onClick={() => { setSessionMobile('calendar'); }}>
                                Next
                            </Button>
                        </>
            }

        </div>
    );
}

export default DateTimeFormDesktopMobile;