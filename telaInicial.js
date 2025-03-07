//Define a classe e seu nome
class TelaInicial extends Phaser.Scene{
    constructor(){
        super({key: 'TelaInicial'});
    }

//Adiciona a imagem que sera usada no jogo
preload (){
    this.load.image('tela','assets/Tela de inicio gato.png')
};

//Carrega a imagem adicionada em preload
create (){

    //Define que o botão é interativo e o relaciona a 'tela'
    this.welcome = this.add.image(450, 300, 'tela').setScale(0.6).setInteractive();
    //Se clicar no botão a cena "TelaBotões" é chamada
    this.welcome.on("pointerdown", () => {
        this.scene.start('TelaBotões');
    });
    
    //Adiciona o texto, configurando algumas informações como tamanho da fonte, posição, conteúdo, cor, estilo, borda, etc. 
    this.text = this.add.text(320, 560, 'Clique para começar', {
            color: "#87CEEB",
            fontSize: 25,
            fontStyle: "bold",
            stroke: "#FFFF",
            strokeThickness: 2
        })
    }

update (){
    } 
};