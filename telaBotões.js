//Define a classe e o seu nome
class TelaBotões extends Phaser.Scene{
    constructor(){
        super({key: 'TelaBotões'});
    }

//Adiciona imagens que serão utilizadas na tela
 preload (){
   this.load.image('fundo1', 'assets/tela botões.png')
   this.load.image('começar', 'assets/botão começar.png')
   this.load.image('controles', 'assets/botão controles.png')
   this.load.image('voltar', 'assets/botão home.png')
}

//Carrega as imagens introduzidas em preload
 create (){

    //Adiciona a imagem de fundo e define sua escala
    this.add.image(440, 310, 'fundo1').setScale(0.65)

    //Define que o botão é interativo e o relaciona à 'começar'
    this.botaoComecar = this.add.image(200, 450, 'começar').setScale(0.7).setInteractive();
    //Se clicar no botão a cena "Neko" é chamada
    this.botaoComecar.on("pointerdown", () => {
        this.scene.start('Neko');
    });

    //Define que o botão é interativo e o relaciona à 'controles'
    this.botaoControles = this.add.image(200, 540, 'controles').setScale(0.7).setInteractive();
    //Se clicar no botão a cena "TelaControles" é chamada
    this.botaoControles.on("pointerdown", () => {
        this.scene.start("TelaControles");
    });

    //Define que o botão é interativo e o relaciona à 'voltar'
    this.voltar = this.add.image(35, 35, 'voltar').setScale(1.5).setInteractive();
    //Se clicar no botão a cena "TelaInicial" é chamada
    this.voltar.on("pointerdown", () => {
        this.scene.start("TelaInicial");
    });
}


 update ()
{
} 
};