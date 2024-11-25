import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

//console.log(process.env.STRING_CONEXAO);

const posts = [
    {
        id:1,
        descricao: "Uma foto teste",
        imagem: "https://http.cat/images/426.jpg"
    },
    {
        id:2,
        descricao: "Gato adorável fazendo careta",
        imagem: "https://placekitten.com/200/300"
    },
    {
        id:3,
        descricao: "Paisagem incrível de um pôr do sol",
        imagem: "https://picsum.photos/seed/123/600/400"
    },
    {
        id:4,
        descricao: "Cachorro brincando na praia",
        imagem: "https://source.unsplash.com/random/600x400/?dog,beach"
    },
    {
        id:5,
        descricao: "Comida deliciosa e colorida",
        imagem: "https://unsplash.com/photos/food"
    },
    {
        id:6,
        descricao: "Montanha majestosa coberta de neve",
        imagem: "https://source.unsplash.com/random/800x600/?mountain,snow"
    }
];


const app = express();
app.use(express.json());

app.listen(3000, () => {

    console.log("Listening on port 3000...");
});


app.get("/api", (req, res) => {


    res.status(200).send("Boas Vindas a imersão de Node.js");
  

});


async function getTodosPosts(){

    const db  = conexao.db("imersao-instabytes");
    const colecao  = db.collection("posts");

    return colecao.find().toArray();

}


app.get("/posts", async(req, res) => {


    const posts = await getTodosPosts();
    res.status(200).json(posts);


});


app.get("/postsOld", (req, res) => {

    //res.status(200).send("Boas Vindas a imersão de Node.js");
    res.status(200).json(posts);


});

function buscarPostPorID(id){

    return posts.findIndex((post) => {
        return post.id == Number(id)
    })
}

app.get("/postsOld/:id", (req, res) => {

    const index = buscarPostPorID(req.params.id);
    res.status(200).json(posts[index]);

    });