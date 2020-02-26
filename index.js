const inquirer = require("inquirer");
const api = require("./api");
const generateHTML = require("./generateHTML");
var fs = require('fs');
var  convertFactory = require('electron-html-to');
var open = require("open");

const questions = [
    {
        type:"input",
        name: "username",
        message: "What is your Github username"
    },
    {
        type: "list",
        name:"color",
        message: "What is your fav color?",
        choices: ["red", "blue", "green","pink"]
    }
  
];

function writeToFile(fileName, data) {
}

function init() {
    inquirer.prompt(questions).then((answers) => {
        api.getUser(answers.username).then(response => {
            console.log(response.data)
           api.getStarts(answers.username).then(stars => {
               console.log(stars)
               return generateHTML({stars,color,...response.data})
   
   
           })
        }).then(html => {
           var conversion = convertFactory({
               converterPath: convertFactory.converters.PDF
             });
              
             conversion({ html }, function(err, result) {
               if (err) {
                 return console.error(err);
               }
              
               console.log(result.numberOfPages);
               console.log(result.logs);
               result.stream.pipe(fs.createWriteStream(path.join(__dirname, "resume.pdf")));
               conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
             });
             open(path.join(process.cwd(), "resume.pdf"));
        })
   
   
    })
}

init();
