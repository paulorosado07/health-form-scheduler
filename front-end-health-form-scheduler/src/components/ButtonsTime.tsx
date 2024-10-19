import { Button } from "@nextui-org/react";

interface PropsButtonsTime {
    setTimeIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonsTime(props:PropsButtonsTime) {
    const {setTimeIsSelected} = props;
    return (
        <div>

            <p className="text-lg">
            Please select the time that best suits your needs.
            </p>
            <div>
                <Button className="style-btn-select-time" onClick={() => { setTimeIsSelected(true); }}>
                    <p>10:00<small>am</small></p>
                </Button>
                <br />
                <Button className="style-btn-select-time" onClick={() => { setTimeIsSelected(true); }}>                    
                    <p>12:00<small>pm</small></p>
                </Button>

                <br />
                <Button className="style-btn-select-time" onClick={() => { setTimeIsSelected(true); }}>                    
                    <p>03:00<small>pm</small></p>
                </Button>

            </div>
        </div>
    )

}

export default ButtonsTime;