const fetch = require('node-fetch');
yaml = require('js-yaml');
fs   = require('fs');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

function versionExtract(value){
    let res = value.split("/");
    console.log(res);
    for( index=0; index < res.length; index++){
            if (res[index].search("jenkins") !=-1)
            return res[index];
    }

}

function updateDockerYml(value){
    try {
        var doc = yaml.safeLoad(fs.readFileSync('docker-compose.yml', 'utf8')); 
        
        //let indentedJson = JSON.stringify(doc, null, 4);
        //console.log(indentedJson);  
       //let value = doc.services.mongodb.image;
        //console.log(value);
       // let arr = value.split(":");
       // arr[1] = "1.2.2";
        //var final_value = arr.join(":");
        //console.log(final_value);
        //doc.services.mongodb.image = arr.join(":");
        doc.services.mongodb.image = value;        
        fs.writeFileSync('docker-compose.yml',yaml.dump(doc));            
       console.log("-------------- Done ----------------");
      } catch (e) {
        console.log(e);
      }
}


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
        let value = json['uri'];
        updateDockerYml(versionExtract(value));
        })
    .catch(err => console.error(err));
