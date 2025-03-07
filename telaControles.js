//Define a classe e o seu nome
class TelaControles extends Phaser.Scene{
    constructor(){
        super({key: 'TelaControles'});
    }

//Adiciona as imagens que serão usadas no jogo
 preload (){
    this.load.image('telaControles', 'assets/tela controles.png')
}

//Carrega as imagens adicionadas em preload
 create (){

    //Define que o botão é interativo e o relaciona a 'telaControles'.
    this.telaControles = this.add.image(450, 300, 'telaControles').setScale(0.6).setInteractive();
    //Se clicar no botão a cena "TelaBotões" é chamada
    this.telaControles.on("pointerdown", () => {
        this.scene.start('TelaBotões');
    });

    //Adiciona o texto, configurando algumas informações como tamanho da fonte, posição, conteúdo, cor, estilo, borda, etc.
    var text = {content: "Clique para voltar" }
    this.message = this.add.text(
        320, 560,
        text.content, {
            color: "#FFFF",
            fontSize: 25,
            fontStyle: "bold",
            stroke: "#87CEEB",
            strokeThickness: 4
        });

        //Adiciona o texto, configurando algumas informações como tamanho da fonte, posição, conteúdo, cor, estilo, borda, etc.
     var text = {content: "Se alimente dos peixes enquanto foge do pássaro!" }
    this.message = this.add.text(
        170, 135,
        text.content, {
            color: "#FFFF",
            fontSize: 20,
            fontStyle: "bold",
            stroke: "#87CEEB",
            strokeThickness: 2
       });
};

 update ()
{
} 
};