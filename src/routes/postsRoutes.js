import express from "express";
import multer from "multer";
import { ListarPosts, postarNovoPost, uploadImagem, actualizarNovoPost } from "../controllers/postsCotroller.js";
import cors from "cors";


const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}
// Configura o armazenamento dos arquivos enviados
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo, mantendo o nome original
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ storage: storage });

// Função para definir as rotas da aplicação
const routes = (app) => {

  app.use(express.json()); // Habilita o parser JSON para requisições

  app.use(cors(corsOptions));
  // Rota para listar todos os posts
  app.get("/posts", ListarPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);
    // O parâmetro "imagem" indica o nome do campo do formulário
    // que contém o arquivo a ser enviado

    app.put("/upload/:id", actualizarNovoPost);
};

export default routes;