
var fs = require('fs');
var Crawler = require("crawler");

var c = new Crawler({
    maxConnections : 10,    
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
                console.log(error);
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
    let list = JSON.parse(fs.readFileSync('list_scam.json', 'utf8'));
    for(let i = 0; i< list.length; i++){
        if (list[i] === url){
            return;
        }
    }    
    list.push(url);
    fs.writeFile("list_scam.json", JSON.stringify(list),'utf8', function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}
