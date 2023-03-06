const express = require("express"); //import express
const app = express();

app.use(express.json()); //application will use JSON format

const port = 8081;
const toDolist = ["need to study", "need to learn"];

//http://localhost:8081/toDo

app.get("/toDo", (req, res) => {
    res.status(200).send(toDolist);
});

app.post("/toDo", (req, res) => {
    let newToDoItem = req.body.item;
    toDolist.push(newToDoItem);
    res.status(201).send({
        message: "The new item got added successfully"
    })
});

app.delete("/toDo", (req, res) => {
    const ItemtoDelete = req.body.item;

    toDolist.find((element, index) => {
        if (element === ItemtoDelete) {
            toDolist.splice(index, 1);
        }
    });
    res.status(202).send({
        message: "Deleted item $(req.body.item)",
    })
});

app.all("/toDo", (res, req) => {
    res.status(501).send();
})

app.all("*", (res, req) => {
    res.status(501).send();
})


app.listen(port, () => {
    console.log("Node js sever has started on $(port)");
})


