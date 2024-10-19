import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { formmatTimeInMilliseconds, formatMillisecondToaDate, isValidEmail } from "../utils/Functions";
import { addMeet } from "../utils/Api";
import { useState } from "react";
import { listMessageAlert } from "../utils/Variables";

interface PropsButtonsTime {
    setTimeIsSelected:            React.Dispatch<React.SetStateAction<boolean>>;
    setIsTheAppointmentConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
    setListDateSaved:             React.Dispatch<React.SetStateAction<string[]>>;
    value:                        object;
}

function FormToFill(props:PropsButtonsTime) {
    const {setTimeIsSelected, setIsTheAppointmentConfirmed, setListDateSaved, value} = props;
    
    const [name, setName]                           = useState('');
    const [email, setEmail]                         = useState('');
    const [alertUnfilledForm, setAlertUnfilledForm] = useState(false);
    const [messageAlert, setMessageAlert]           = useState("");    

    const saveEvent = (paramValue:any ) =>{
        let kpd = formmatTimeInMilliseconds(paramValue);
        if (kpd['status'] === true) {
          addMeet(kpd['value'], name, email).then(data => {
            
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
        }
      };

    return (

        <div className="style-container-form-to-fill">
            
          
            {

            alertUnfilledForm 
            ?
            <Card className="mb-3">
                <CardBody>
                    <p>{messageAlert}</p>
                </CardBody>
            </Card>
            :
            ""

            }

            <Input type="text" label="Name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <Input type="email" label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />

            

            <Button className="me-2" color="primary" onClick={() => {

                let emailChecked = isValidEmail(email);

                if (name.length > 1 && emailChecked === true) {
                    setAlertUnfilledForm(false);                                      
                    setIsTheAppointmentConfirmed(true);
                    saveEvent(value)
                }else{

                  if(name.length <= 1){
                    setMessageAlert(listMessageAlert['name']);  
                  }else{
                    setMessageAlert(listMessageAlert['email']);
                  }
                  setAlertUnfilledForm(true);
                  
                }
            }}>
                Confirm
            </Button>

            <Button onClick={() => { setTimeIsSelected(false); }}>
                Back
            </Button>
        </div>

    );

}

export default FormToFill;