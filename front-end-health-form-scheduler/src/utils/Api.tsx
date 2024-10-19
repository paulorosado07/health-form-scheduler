export async function getTimeRegistered(){          
    const response = await fetch('http://localhost:8000/get_time_registered');
    if(response.ok) {
        const data = await response.json();        
        return data;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}


export async function addMeet(timeMilliseconds:number, name:string, email:string){
    const data = {
        'name': name,
        'email': email,
        'time_milliseconds': timeMilliseconds,
    };    
  
    const response = await fetch('http://localhost:8000/add_meet', {
        method: 'POST',   
        body: JSON.stringify(data),
        
    });
    if(response.ok) {
        const data = await response.json();        

        return data;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
