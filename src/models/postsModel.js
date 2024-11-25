import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco de dados usando a string de conexão do ambiente

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados
    const colecao = db.collection("posts"); // Seleciona a coleção de posts
    return colecao.find().toArray(); // Retorna um array com todos os documentos da coleção
}



export async function criarPost(novoPost) {

    const db = conexao.db("imersao-instabytes"); 
    const colecao = db.collection("posts"); 
    return colecao.insertOne(novoPost); 
}

export async function actualizarPost(id, novoPost) {

    const db = conexao.db("imersao-instabytes"); 
    const colecao = db.collection("posts"); 
    const objID = ObjectId.createFromHexString(id);

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost}); 
}
