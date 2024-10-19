export function formatMillisecondToaDate(milliseconds: number) {

    let resultReturn = { 'status': false, value: '0-0-0' };

    if (isNumber(milliseconds) === true) {
        const date = new Date(milliseconds);

        const year = date.getFullYear();
        const month = parseInt(String(date.getMonth() + 1).padStart(2, '0'));
        const day = parseInt(String(date.getDate()).padStart(2, '0'));

        const formattedDate = `${year}-${month}-${day}`;
        resultReturn['status'] = true;
        resultReturn['value'] = formattedDate;
    }

    return resultReturn;
}

function isNumber(value: any) {
    return typeof value === 'number' && !isNaN(value);
}


export function formmatTimeInMilliseconds(valueSelected: any) {
    let resultReturn = { 'status': false, value: 0 };
    if (typeof valueSelected === 'object') {
        if ('day' in valueSelected && 'month' in valueSelected && 'year' in valueSelected) {
            if (isNumber(valueSelected['day']) === true && isNumber(valueSelected['month']) === true && isNumber(valueSelected['year']) === true) {
                let day = parseInt(valueSelected['day']);
                let month = parseInt(valueSelected['month']);
                let year = parseInt(valueSelected['year']);

                let strTime = `${year}-${month}-${day} 15:0`;
                const date = new Date(strTime);
                const milliseconds = date.getTime();


                resultReturn['status'] = true;
                resultReturn['value'] = milliseconds;
            }
        }
    }

    return resultReturn;
}

export function isValidEmail(email:string) {    
    return /\S+@\S+\.\S+/.test(email);
  }