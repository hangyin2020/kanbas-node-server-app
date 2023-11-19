// console.log("Hello World");
function HelloRoutes(app){
app.get("/", (req, res) => {
    res.send("Welcome to Web Dev !")
})
app.get("/hello", (req, res) => {
    res.send("life is good!")
})
}

export default HelloRoutes;