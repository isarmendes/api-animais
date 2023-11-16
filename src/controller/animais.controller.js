import { Animais } from "../models/animais/Animal.js";
import { AnimaisList} from "../models/animais/AnimiasList.js";

const list = new AnimaisList();


export const buscarTodosAnimais = (req,res) =>{
    const animais  = list.getAllAnimais();

    const animalzinhos = list.getAllAnimais();
    
    const contadorPorTipo = {};

    animalzinhos.forEach((animal) => {
        if (!contadorPorTipo[animal.tipo]) {
            contadorPorTipo[animal.tipo] = 1;
        } else {
            contadorPorTipo[animal.tipo]++;
        }
    });
    return res.status(200).send({message: "Todos animais via controller!", status: "Ok!", data: animais, contadorPorTipo: contadorPorTipo, contadorTotal: animais.length 
    });

    // if(!animais.length){
    //     return res.status(404).send({
    //         message:"Nenhum animal foi cadastrado",
    //         status:"Not Foud"
    //     })

    // }
    // return res.status(200).send({
    //     message:"Todos animais via controller",
    //     status:"ok", contador: `${animais.length}`,
    //     data: animais
    // })
};

export const buscarAnimaisId =(req, res)=>{
    const{id} = req.params;

    const animal =list.getAnimaisById(id);
     if(!animal) {
        return res.status(404).send({
            message: "Animal não encontrado",
            origem:"Controller"
        });
     }
     return res.status(200).send({
    message:`Animais com Id ${id}`, origem:"Controller"
     });
};

export const criarAnimal = (req, res)=>{

    const isURLValid = (url)=>{
        if(url.match(/\.(jpeg|jpg|gif|png)$/) != null){
            return true
        }
        return false
    }
    const {nome, tipo, idade, cor, imagem, vacinado} = req.body;

    if(!nome || !tipo || !idade || !cor || !imagem ){
        return res.status(400).send({
            message:"Dados inválidos",
            origem:"Controller"
        })
    }
    if(nome.length <3 || nome.length > 50){
        return res.status(400).send({
            message:"Nome inválido digite entre 3 e 50 caracteres",
            origem:"Controller"
        })

    }

    if(!Number.isInteger(Number(idade)) || idade < 0){
        return res.status(400).send({message:"Idade inválida digite uma idade que seja maior que 0",origem:"Controller"})
    }
    if (cor.length >=20){
        return res.status(400).send({message:"Cor inválida digite uma cor que seja menor que 20",origem:"Controller"})

    }
    if(tipo.length >=30){
        return res.status(400).send({message:"Tipo inválido digite um tipo que seja menor que 30",origem:"Controller"})
        

    }
    if(typeof vacinado != 'boolean'){
        return res.status(400).send({message: "Vacinado inválido! O valor deve ser verdadeiro ou falso!", origem:"Controller!"});
    }

    if(isURLValid(imagem) === false) {
        return res.status(400).send({ message: "URL da imagem é inválida!", origem:"Controller!" });
    }
   
    
    const animal = new Animais(nome, tipo, idade, cor, imagem, vacinado);
    list.createAnimal(animal);
    return res.status(201).send({
        message:"Animal criado com sucesso",
        origem:"Controller",
        data: animal
    });
};

export const atualizarAnimal = (req, res)=>{
    const{id} = req.params;
    const {nome, tipo, idade, cor, imagem, vacinado} = req.body;
    if(!nome || !tipo || !idade || !cor || !imagem || !vacinado){
        return res.status(400).send({
            message:"Dados inválidos",
            origem:"Controller"
        })
    }
    const animal = list.updateAnimal(id, nome, tipo, idade, cor, imagem, vacinado);
    if(!animal){
        return res.status(404).send({
            message:"Animal não encontrado",
            origem:"Controller"
        })
    }
    return res.status(200).send({
        message: `Atualizar animal ${id}`,
        origem:"Controller"
     
    });
};

export const deletarAnimal = (req, res)=>{
    const {id} = req.params;
    const animal =list.getAnimaisById(id);
    if(!animal){
        return res.status(404).send({
            message:"Animal não encontrado",
            origem:"Controller"
        })
    }
    list.removeAnimal(id);
    return res.status(200).send({
        message:`Animal deletado ${id}`,
        origem:"Controller"
    });
};

