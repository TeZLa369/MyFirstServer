const { on } = require("events");
const http = require("http");

const port = 8081; //free port
const toDolist = ["need to study", "need to learn"];

http.createServer((req, res) => {
    const { method, url } = req;
    // console.log(method, url);
    // res.end();

    if (url === "/toDo") {

        //http://localhost:8081/toDo
        if (method === "GET") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(toDolist.toString());//converting array to string because UI can't show array
        }
        else if (method === "POST") {
            let body = "";
            req.on("error", (err) => {
                console.log(err);
            }).on('data', (chunk) => {
                body += chunk;
                //chunk => to send the data in parts to the server.
                //body+ chunk =>after reaching the server to get the chunked data in a single element 
                console.log(chunk);
            }).on('end', () => {
                body = JSON.parse(body);
                let newtoDo = toDolist;
                newtoDo.push(body.item);
                console.log(newtoDo);
                res.writeHead(201);
                // console.log("body data ", body);
            });
        }
        else if (method === "DELETE") {
            let body = "";
            req.on("error", (err) => {
                console.error(err);
            })
                .on("data", (chunk) => {
                    body += chunk;
                })
                .on("end", () => {
                    body = JSON.parse(body);
                    let deleteItem = body.item;
                    for (let i = 0; i < toDolist.length; i++) {
                        if (toDolist[i] === deleteItem) {
                            toDolist.splice(i, 1);
                            break;
                        }
                    }
                    res.writeHead(204);
                });
        }
        else {
            res.writeHead(501);
        }
    }
    else {
        res.writeHead(404);
    }
    res.end();

})
    .listen(port, () => {
        console.log(`The Node JS server started on port ${port}`);
    });

// http://localhost:8081


// CSR:

// Client Side Rendering
// url: http://localhost:8081 (req)
//Server Slide data (res)
// html,css, js
// no refresh
// fast
// low rent of server




// SSR:

// Server Side Rendering
// url: http://localhost:8081 (req)
//Server Slide data (res)
// html,css, js
//refresh
// slow