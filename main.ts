import express from "express"
import serverRoutes from "./routes/server";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT ?? 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs');
app.use(serverRoutes);
app.use(function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})