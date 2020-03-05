import express from 'express';
import path from 'path';
import reload from 'reload';

const public_path = path.join(__dirname, '/../../client/public');
let app = express();

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

let code = "ls";
let fs = require('fs');
let exec = require('child_process').exec;
let docker_path = "src/octave-image";

app.get('/result', (req, res) => {
    console.log("GET request /result returning: " + code);

    execute('docker build -t octave-image .', function (result) {
        console.log(result);
        execute('docker run ' +
            '--mount src="$(pwd)",' +
            'target=/test_container,' +
            'type=bind octave-image matlab.m' +
            ' -qH --no-window-system', function (result) {
            console.log(result);
            res.send(result);
        });
    });

});

app.post('/code', (req, res) => {
    console.log("POST request /code: " + req.body.code);
    code = req.body.code;

    fs.writeFile('src/octave-image/matlab.m', code, function (err) {
        if (err) throw err;
    });
});



function execute(command, callback) {
    exec(command,{cwd: docker_path}, function (error, stdout, stderr) {
         if(stdout){
            callback(stdout);
        }else if(stderr) {
            callback(stderr)
        }else if(error){
            callback(error)
         }
    });
};








// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise((resolve, reject) => {
    // Setup hot reload (refresh web page on client changes)
    reload(app).then(reloader => {
        app.listen(3000, (error) => {
            if (error) reject(error.message);
            console.log('Express server started');
            // Start hot reload (refresh web page on client changes)
            reloader.reload(); // Reload application on server restart
            fs.watch(public_path, () => reloader.reload());
            resolve();
        });
    });
});
