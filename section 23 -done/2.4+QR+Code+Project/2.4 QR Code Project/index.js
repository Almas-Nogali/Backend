import inquirer  from "inquirer";
import qr from "qr-image";
import fs from "fs";


// 1. Use the inquirer npm package to get user input.
inquirer
  .prompt([
    {
      message: "Type in yiur URL :",
      name: "URL",
    },
  ])
  .then((answers) => {
    // console.log(answers);
    const url = answers.URL;
    
    // 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
    var qr_svg = qr.image( url );
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    // 3. Create a txt file to save the user input using the native fs node module.
    // We can use appendFile to append the url to prevuis urls (https://allaboutcode.medium.com/how-to-append-data-to-a-file-using-node-fs-d9d15228f846#:~:text=To%20append%20data%20to%20file,function%20for%20synchronous%20file%20operation.)

    //OR writeFile to remove anu prevuis text and adding the generated one.
    fs.appendFile('URLs.txt',( url+"\n"), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });


