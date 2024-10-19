import MessageWelcome from "./MessageWelcome";
import ButtonsTime from "./ButtonsTime";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useEffect } from "react";
import { getTimeRegistered } from "../utils/Api";
import { formatMillisecondToaDate } from "../utils/Functions";

interface PropsDateTimeFormDesktop {
    setTimeIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
    listDateSaved: string[];
    setListDateSaved: React.Dispatch<React.SetStateAction<string[]>>;
    value: object;
    setValue: React.Dispatch<React.SetStateAction<object>>;
}

function DateTimeFormDesktop(props: PropsDateTimeFormDesktop) {
    const { setTimeIsSelected, setValue, setListDateSaved, value, listDateSaved } = props;

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
        <div className="flex gap-x-4 justify-between style-container-calendar-time">
            <div>

                {
                    Object.keys(value).length > 0 ?

                        <ButtonsTime
                            setTimeIsSelected={setTimeIsSelected}
                        />

                        :
                        <MessageWelcome />
                }

            </div>
            <div>
                <Calendar

                    minValue={today(getLocalTimeZone())}
                    onChange={(event) => { eventCalendar(event); }}
                    isDateUnavailable={isDateUnavailable}
                    aria-label="Date (No Selection)" />

            </div>

        </div>
    );
}

export default DateTimeFormDesktop;