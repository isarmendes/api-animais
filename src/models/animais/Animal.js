import {v4 as uuidv4} from 'uuid';

 export class Animais{
    constructor(nome, tipo, idade, cor, imagem, vacinado ){
        this.id = uuidv4();
        this.nome = nome;
        this.tipo = tipo;
        this.idade = idade;
        this.cor = cor;
        this.imagem = imagem;
        this.vacinado = vacinado;
    }
 }