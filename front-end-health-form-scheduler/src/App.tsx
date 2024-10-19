import { Image } from "@nextui-org/react";
import './assets/style/style.css';
import imgDoctor from './assets/img/doctors.jpg';
import imgCheck from './assets/img/check.png';
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { getTimeRegistered } from "./utils/Api";
import { formatMillisecondToaDate } from "./utils/Functions";
import FormToFill from "./components/FormToFill";
import DateTimeFormDesktop from "./components/DateTimeFormDesktop";
import DateTimeFormDesktopMobile from "./components/DateTimeFormDesktopMobile";
import { useMediaQuery } from 'react-responsive'


function App() {
  const [value, setValue] = useState({});
  const [timeIsSelected, setTimeIsSelected] = useState(false);
  const [isTheAppointmentConfirmed, setIsTheAppointmentConfirmed] = useState(false);
  const [listDateSaved, setListDateSaved] = useState<string[]>([]);
  const isMobile = useMediaQuery({
    query: '(max-width: 500px)'
  })

  console.log(isMobile);
  
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
    <>

      <div id="style-body-app">
        <div className='style-container-form'>


          <div className="flex justify-center container-doctors-img">
            <Image
              isZoomed
              isBlurred
              className="style-size-img"

              alt="Doctor Image"
              src={imgDoctor}
            />
          </div>



          {
            !timeIsSelected ?


              isMobile ?

              <DateTimeFormDesktopMobile
                setTimeIsSelected={setTimeIsSelected}
                setValue={setValue}
                setListDateSaved={setListDateSaved}
                value={value}
                listDateSaved={listDateSaved}
              />
              :
              <DateTimeFormDesktop
                setTimeIsSelected={setTimeIsSelected}
                setValue={setValue}
                setListDateSaved={setListDateSaved}
                value={value}
                listDateSaved={listDateSaved}
              />
              :


              <>



                {

                  !isTheAppointmentConfirmed ?
                    <FormToFill
                      setTimeIsSelected={setTimeIsSelected}
                      setIsTheAppointmentConfirmed={setIsTheAppointmentConfirmed}
                      setListDateSaved={setListDateSaved}
                      value={value}
                    />
                    :

                    <div className="style-session-finished-schelud">

                      <Image

                        className="style-img-check"

                        alt="Check Image"
                        src={imgCheck}
                      />
                      <br />
                      <p className="text-center">
                        Thank you for trusting us! We’ve just sent you an email to remind you of your appointment.
                      </p>
                      <br />

                      <Button color="primary" onClick={() => {
                        setIsTheAppointmentConfirmed(false);
                        setTimeIsSelected(false);
                        setValue({});
                      }
                      }>
                        back
                      </Button>
                    </div>
                }
              </>

          }

        </div>
      </div>
    </>
  )
}

export default App
