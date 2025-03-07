//Define a classe e seu nome
    class Neko extends Phaser.Scene {
    constructor(){
        super({key: 'Neko'})
    }

//Adiciona imagens que serão usadas no jogo
preload (){
    this.load.image('fundo', 'assets/background.png')
    this.load.image('piso', 'assets/chao.png')
    this.load.spritesheet('player', 'assets/spritesheet neko.png', {frameWidth: 31, frameHeight: 52}) //Spritesheet, define as dimensões de cada frame
    this.load.image('peixe', 'assets/peixe.png')
    this.load.image('plataforma', 'assets/plataforma.png')
    this.load.image('vitoria', 'assets/tela de parabens.png')
    this.load.image('voltar', 'assets/botão home.png')
    this.load.image('adesivo', 'assets/broche.png')
    this.load.spritesheet('passaro', 'assets/passaro.png', {frameWidth: 20, frameHeight: 14})
}

//Carrega as imagens adicionadas em preload
create (){

    //Cria as animações da sprite do personagem
    this.anims.create({
        key: 'left', //Define o nome
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }), //Define os frames
        frameRate: 10, //Quantidade de frame por determinado tempo
        repeat: -1 //Repetição da animação
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'stopLeft',
        frames: [ { key: 'player', frame: 3 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'stopRight',
        frames: [ { key: 'player', frame: 5 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //Adiciona a animação ao pássaro
    this.anims.create({
        key: 'voar',
        frames: this.anims.generateFrameNumbers('passaro', { start: 0, end: 5}),
        frameRate: 20,
        repeat: -1
    })

    //Adiciona as teclas a serem utilizadas
    this.teclado = this.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        D: Phaser.Input.Keyboard.KeyCodes.D,
        S: Phaser.Input.Keyboard.KeyCodes.S
    });

    //Adiciona imagem de fundo
    this.add.image(450, 255, 'fundo').setScale(1.2);

    //Adiciona o chão, definindo suas propriedades quanto à física do jogo
    this.piso = this.physics.add.sprite(410, 629, 'piso').setScale(1.65);
    this.piso.body.setImmovable(true);
    this.piso.body.allowGravity = false;
    
    //Adiciona o personagem e define sua física, sua hitbox, suas colisões, etc.
    this.personagem = this.physics.add.sprite(450, 500, 'player').setScale(1.5);
    this.personagem.setCollideWorldBounds(true);
    this.personagem.setBounce(0.1)
    this.personagem.body.setSize(this.personagem.width * 0.6, this.personagem.height * 1.01);
    this.physics.add.collider(this.personagem, this.piso);

    //Adiciona o passaro e define sua física, hitbox, colisões, etc.
    this.passaro = this.physics.add.sprite(450, 200, 'passaro').setScale(1.5) //Adiciona o sprite do pássaro
    this.passaro.setCollideWorldBounds(true); //Colisão com as bordas do mundo
    this.passaro.body.setSize(this.passaro.width * 0, this.passaro.height * 0.4); //Dimensões da hitbox
    this.physics.add.collider(this.piso, this.passaro); //Colisão do passaro com o chão
    this.physics.add.collider(this.personagem, this.passaro); //Colisão entre personagem e pássaro
    this.passaro.body.allowGravity = false; //Anula a gravidade para o passaro
    this.passaro.anims.play('voar', true); //Ativa a animação 

    //Adiciona o peixe ao jogo e define suas propriedades de física.
    this.peixe = this.physics.add.sprite(150, 0, 'peixe').setScale(1.5);
    this.peixe.setCollideWorldBounds(true);
    this.peixe.setBounce(0.6);
    this.peixe.body.setSize(this.peixe.width * 1, this.peixe.height * 0.7)
    this.physics.add.collider(this.peixe, this.piso);
    
    //Adiciona o placar e a variável "pontuacao"
    var pontuacao = 0;
    this.placar = this.add.text(10, 10, 'Fome:' + pontuacao + "/10", {
        fontSize:'30px', 
        fill:'#87CEEB', 
        fontStyle: 'bold', 
        stroke: "#FFF",
        strokeThickness: 3
    });

    //Define o overlap do personagem e do peixe (se o peixe e o personagem se sobreporem tudo a seguir até que as chaves se fechem acontece)
    this.physics.add.overlap(this.personagem, this.peixe, () => { 
        this.peixe.setVisible(false); //Peixe se torna invisível

        var posicaoX = [400, 550, 830, 650, 250] //Define uma array de posições para o peixe reaparecer (sempre acima de alguma plataforma)
        //Define randomicamente a nova posição no eixo X do peixe dentre as que estão na array
        for(let i = 0; i < posicaoX.length; i++){
            if (Phaser.Math.RND.between(posicaoX.length, 0) === i){
            this.peixe.setPosition(posicaoX[i], 0)
        }
    };

    //Atualiza o placar
    pontuacao +=1;
    this.placar.setText('Fome:' + pontuacao + '/10');
        //Peixe se torna visível novamente
        this.peixe.setVisible(true);

        //Se a pontuação for maior ou igual a 10 a mensagem de vitória aparece.
        if (pontuacao >= 10) {
            this.add.image(450, 300, 'vitoria'); //Imagem
            this.add.image(650, 480, 'adesivo').setScale(0.8); //Adesivo do gato

            //Define o botão como interativo e o relaciona à 'voltar'
            this.voltar = this.add.image(450, 420, 'voltar').setScale(1.5).setInteractive();
            //Se clicar no botão de voltar a cena "TelaBotões" é chamada
            this.voltar.on("pointerdown", () => {
                this.scene.start("TelaBotões");
            })
            
            //Adiciona os textos da mensagem de vitória
            this.mensagem = this.add.text(250, 120, 'Parabéns, você venceu!', { //Conteúdo e posição
                fontSize:'30px', //Tamanho
                fill:'#FFF', //Cor
                fontStyle: 'bold', //Estilo 
                stroke: "#87CEEB", //Borda
                strokeThickness: 1 //Tamanho da borda
            });
            this.mensagem = this.add.text(230, 200, 'Você conseguiu saciar a fome do gato,', {
                fontSize:'20px', 
                fill:'#FFF', 
                fontStyle: 'bold', 
                stroke: "#87CEEB",
                strokeThickness: 1
            });
            this.mensagem = this.add.text(230, 225, 'obrigado por jogar!', {
                fontSize:'20px', 
                fill:'#FFF', 
                fontStyle: 'bold', 
                stroke: "#87CEEB",
                strokeThickness: 1
            });
            this.mensagem = this.add.text(230, 280, 'Arte por: Rafael Gomes', {
                fontSize:'25px', 
                fill:'#FFF', 
                fontStyle: 'bold', 
                stroke: "#87CEEB",
                strokeThickness: 1
            });
            this.mensagem = this.add.text(230, 310, 'Programação por: Rafael Gomes', {
                fontSize:'25px', 
                fill:'#FFF', 
                fontStyle: 'bold', 
                stroke: "#87CEEB",
                strokeThickness: 1
            });
        }
    }); //Fim do overlap
   
    //Define a variável "podePerderPontos" para colocar coldown na perca de pontos
    let podePerderPontos = true; 
    //Se o passaro e o personagem se sobreporem acontece o que está definido dentro das chaves
    this.physics.add.overlap(this.personagem, this.passaro, () => { 
    //Se a pontuação for maior que zero e a variável for verdade a pontuação diminui e o placar atualiza
    if (pontuacao > 0 && podePerderPontos) {
        pontuacao -= 1;
        this.placar.setText('Fome:' + pontuacao + '/10');

    //Aqui a variável é definida como falsa para que possa ser adicionado o coldown da perca de pontos
        podePerderPontos = false; 
        this.time.delayedCall(500, () => {
            podePerderPontos = true;
        });
    }
});

//Aqui as plataforma (plataforma1 a plataforma6) são adicionadas ao jogo e suas propriedades são definidas (gravidade, hitbox, colisões, mobilidade e posição)
    //Plataforma 1
    this.plataforma1 = this.physics.add.sprite(150, 490, 'plataforma') //Atribui "plataforma" ao atributo "this.plataforma1"
    this.plataforma1.setImmovable(true); //Define que é imóvel
    this.plataforma1.body.allowGravity = false; //Anula a gravidade para o objeto
    this.plataforma1.body.setSize(this.plataforma1.width * 0, this.plataforma1.height * 0.4) //Define o tamanho das dimensões da hitbox
    this.plataforma1.body.setOffset(this.plataforma1.width * 0, this.plataforma1.height * 0.1) //Desloca a hitbox
    this.physics.add.collider(this.peixe, this.plataforma1) //Colisão do peixe com o plataforma
    this.physics.add.collider(this.personagem, this.plataforma1) //Colisão do personagem com a plataforma
    this.physics.add.collider(this.passaro, this.plataforma1) //Colisão do pássaro com a plataforma
    //Plataforma 2
    this.plataforma2 = this.physics.add.sprite(400, 390, 'plataforma')
    this.plataforma2.setImmovable(true);
    this.plataforma2.body.allowGravity = false;
    this.plataforma2.body.setSize(this.plataforma2.width * 0, this.plataforma2.height * 0.4)
    this.plataforma2.body.setOffset(this.plataforma2.width * 0, this.plataforma2.height * 0.1)
    this.physics.add.collider(this.peixe, this.plataforma2)
    this.physics.add.collider(this.personagem, this.plataforma2)
    this.physics.add.collider(this.passaro, this.plataforma2)
    //Plataforma 3
    this.plataforma3 = this.physics.add.sprite(550, 470, 'plataforma')
    this.plataforma3.setImmovable(true);
    this.plataforma3.body.allowGravity = false;
    this.plataforma3.body.setSize(this.plataforma3.width * 0, this.plataforma3.height * 0.4)
    this.plataforma3.body.setOffset(this.plataforma3.width * 0, this.plataforma3.height * 0.1)
    this.physics.add.collider(this.peixe, this.plataforma3)
    this.physics.add.collider(this.personagem, this.plataforma3)
    this.physics.add.collider(this.passaro, this.plataforma3)
    //Plataforma 4
    this.plataforma4 = this.physics.add.sprite(830, 370, 'plataforma')
    this.plataforma4.setImmovable(true);
    this.plataforma4.body.allowGravity = false;
    this.plataforma4.body.setSize(this.plataforma4.width * 0, this.plataforma4.height * 0.4)
    this.plataforma4.body.setOffset(this.plataforma4.width * 0, this.plataforma4.height * 0.1)
    this.physics.add.collider(this.peixe, this.plataforma4)
    this.physics.add.collider(this.personagem, this.plataforma4)
    this.physics.add.collider(this.passaro, this.plataforma4)
    //Plataforma 5
    this.plataforma5 = this.physics.add.sprite(650, 252, 'plataforma')
    this.plataforma5.setImmovable(true);
    this.plataforma5.body.allowGravity = false;
    this.plataforma5.body.setSize(this.plataforma5.width * 0, this.plataforma5.height * 0.4)
    this.plataforma5.body.setOffset(this.plataforma5.width * 0, this.plataforma5.height * 0.1)
    this.physics.add.collider(this.peixe, this.plataforma5)
    this.physics.add.collider(this.personagem, this.plataforma5)
    this.physics.add.collider(this.passaro, this.plataforma5)
    //Plataforma 6
    this.plataforma6 = this.physics.add.sprite(250, 252, 'plataforma')
    this.plataforma6.setImmovable(true);
    this.plataforma6.body.allowGravity = false;
    this.plataforma6.body.setSize(this.plataforma6.width * 0, this.plataforma6.height * 0.4)
    this.plataforma6.body.setOffset(this.plataforma6.width * 0, this.plataforma6.height * 0.1)
    this.physics.add.collider(this.peixe, this.plataforma6)
    this.physics.add.collider(this.personagem, this.plataforma6)
    this.physics.add.collider(this.passaro, this.plataforma6)
}

update () {

    //Define a velocidade e a locomoção do passaro (seguindo o personagem)
    let speed = 0.015; 
    this.passaro.x = Phaser.Math.Linear(this.passaro.x, this.personagem.x, speed);
    this.passaro.y = Phaser.Math.Linear(this.passaro.y, this.personagem.y, speed);
    
    //Aqui as mecânicas do jogo são introduzidas
    //Se a telca "A" for pressionada o personagem deve se deslocar para esquerda e a animação deverá iniciar
    if (this.teclado.A.isDown){
        this.personagem.setVelocityX(-200);
        this.personagem.anims.play('left', true);
        this.ultimaDirecao = 'left';
        this.passaro.setFlip(true);
    }
    //Se a tecla "D" for pressionada o personagem deve se deslocar para direita e a animação deverá iniciar
     else if (this.teclado.D.isDown){
        this.personagem.setVelocityX(200);
        this.personagem.anims.play('right', true);
        this.ultimaDirecao = 'right';
        this.passaro.setFlip(false);
    }
    //Se nada for pressionado a velocidade do personagem deve ser 0 e a sua animação deve ser de acordo com a sua última direção
    else{
        this.personagem.setVelocityX(0)     
    if (this.ultimaDirecao === 'left') {
            this.personagem.anims.play('stopLeft', true);
        } else {this.personagem.anims.play('stopRight', true);}
    }
    //Se a tecla "W" for pressionada e o personagem estiver tocando o chão ou alguma outra colisão deverá saltar
    if (this.teclado.W.isDown && this.personagem.body.touching.down){
        this.personagem.setVelocityY(-350)
    };
    //Se a tecla "S" for pressionada o personagem deve se virar para frente
    if (this.teclado.S.isDown){
        this.personagem.anims.play('turn', true);
        this.ultimaDirecao === 'turn';
    };
}
    };

