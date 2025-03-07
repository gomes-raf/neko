//Adiciona configurações que transformam o jogo.
const config = {
    type: Phaser.AUTO,
    width: 900, //Largura da tela
    height: 600, //Altura da tela
//Define informações sobre a física do jogo
    physics: {
        default: 'arcade', //Tipo de física
        arcade: {
            gravity: { y: 500 }, //Intensidade
            debug: false //Ativa visibilidade da Hitbox
        }
    },
    //Introduz as cenas ao jogo
    scene: [TelaInicial, TelaBotões, TelaControles, Neko]
};

//Importa algumas informações do Phaser
const game = new Phaser.Game(config);

 
