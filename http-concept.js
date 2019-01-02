const fetch = require('node-fetch'); 


const uri = 'https://bin.barco.com/artifactory/api/storage/evm-containeros-local?lastModified';

let h = new fetch.Headers();
h.append('X-JFrog-Art-Api','AKCp5btytZurK6CAKNrCWsVXNNS1oRePPvzeBmb48doWSqYYKTQ6Ku73oQiQfaT3FQBvvHDcK');
h.append('Accept','application/json');
h.append('strictSSL', false);
let req = new fetch.Request(uri, {
    method: 'GET',
    headers: h,
    mode: 'cors'    
});


fetch(req)    
    .then((res) => {
            if(res.ok){
                
                return res.json();
                
            }
            else{
                throw new Error('BAD https stuff');
            }
    })
    .then(json => {
        console.log("--------------------------------------------")
        console.log(json)})
    .catch(err => console.error(err));