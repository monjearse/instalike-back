import { getTodosPosts, criarPost, actualizarPost } from "../models/postsModel.js";
import fs from 'fs';
import gerarDescricaoComGemini from "../services/geminisService.js";    

export async function ListarPosts(req, res) {

    const posts = await getTodosPosts(); // Chama a função para buscar os posts
    res.status(200).json(posts); // Retorna os posts em formato JSON
}
export async function postarNovoPost(req, res) {
    const novoPosts = req.body; // Chama a função para recever a requisição
    try{
        const postCriado = await criarPost(novoPosts);
        res.status(200).json(postCriado); // Retorna os posts em formato JSON
    }catch(erro){	
        console.error(erro.message);
        res.status(500).json({"Erro": "Ocorreu um erro ao criar o post"});
       }
}



export async function uploadImagem(req, res) {

    const novoPost = {

        descricao: req.body.descricao,
        imagem: req.file.originalname,
        alt: req.body.alt
    }
    
    try{

        const postCriado = await criarPost(novoPost);
        const imagemActualizada = `uploads/${postCriado.insertedId}.png`;
        
        fs.renameSync(req.file.path, imagemActualizada);
       
        res.status(200).json(postCriado); // Retorna os posts em formato JSON

    }catch(erro){	

        console.error(erro.message);
        res.status(500).json({"Erro": "Ocorreu um erro ao criar o post"});
   
    }

}


export async function actualizarNovoPostOLD(req, res) {
    const id = req.params.id; 
    const urlImagem = `http://localhost:3000/${id}.png`;
        
     try{

        const imageBuffer = fs.readFile(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);

        const post = {

            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }


        const postCriado = await actualizarPost(id, post);
        res.status(200).json(postCriado); // Retorna os posts em formato JSON
    }catch(erro){	
        console.error(erro.message);
        res.status(500).json({"Erro": "Ocorreu um erro ao criar o post"});
       }
}


export async function actualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await actualizarPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro);
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}