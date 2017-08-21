
var fs = require('fs');
var Crawler = require("crawler");

var c = new Crawler({
    maxConnections : 5,    
});

const keyWords = ["keybernetwork", "keyber network", "kyber network", "kybernetwork"]

main();

//read list check
function main(){
    let list = JSON.parse(fs.readFileSync('list_check.json', 'utf8'));
    for(let i = 0; i< list.length; i++){
        checkScram(list[i], writeScam)        
    }    
}

function checkScram(url, callBack){
    c.queue([{
        uri: url,
        jQuery: false,

        // The global callback won't be called
        callback: function (error, res, done) {
            if(error){
               // console.log(error);
            }else{
               // console.log(res)
                let body = res.body.toLowerCase();
                for (let i = 0; i< keyWords.length;i++){
                    if (body.includes(keyWords[i])){
                        callBack(url)
                    }
                }                

            }
            done();
        }
    }]);
    return true;
}

function writeScam(url){
    let fileName = getFileName()

    fs.stat('list_scam/'+fileName+'.json', function(err, stat) {
        if(err == null) {
            let list = JSON.parse(fs.readFileSync('list_scam/'+fileName+'.json', 'utf8'));
            for(let i = 0; i< list.length; i++){
                if (list[i] === url){
                    return;
                }
            }    
            list.push(url);
            fs.writeFile('list_scam/'+fileName+'.json', JSON.stringify(list),'utf8', function(err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        } else if(err.code == 'ENOENT') {
            // file does not exist
            fs.writeFile('list_scam/'+fileName+'.json', JSON.stringify([url]),'utf8', function(err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        } else {
            console.log('Some other error: ', err.code);
        }
    });    
}


function getFileName(){
    let dateObj = new Date();        
    let year = dateObj.getUTCFullYear();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    if (month < 10) month = "0" + month;
    let day = dateObj.getUTCDate();
    //let hour = dateObj.getHours();
    //if (hour < 10) hour = "0" + hour
    return year + "_" + month + "_" + day
}