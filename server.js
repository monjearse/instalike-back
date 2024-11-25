import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"));
routes(app);


app.listen(3000, () => {
    console.log("Listening on port 3000..."); // Mensagem indicando que o servidor está ouvindo na porta 3000
});






