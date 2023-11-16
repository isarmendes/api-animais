export class AnimaisList {
    constructor() {
        this.animais = [];
    }
    getAllAnimais(){
        return this.animais;
    }
    getAnimaisById(id){
            return this.animais.find((animal) => animal.id === id);
        }
    createAnimal(animal){
        this.animais.push(animal);
    }
    updateAnimal(id,nome, tipo, idade, cor, imagem, vacinado){
        const animais = this.getAnimaisById(id);
        if(!animais){
            return null;
        }
        animais.nome = nome;
        animais.tipo = tipo;
        animais.idade = idade;
        animais.cor = cor;
        animais.imagem = imagem;
        animais.vacinado = vacinado;

        return animais;

    }
    removeAnimal(animalId){
        this.animais = this.animais.filter((animal) => animal.id !== animalId);
        
    }
}