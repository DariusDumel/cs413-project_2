
const background = new PIXI.Sprite.from('assets/background.png');
const startScene = new PIXI.Container();
const creditScene = new PIXI.Container();
const gameScene = new PIXI.Container();
const instructionScene = new PIXI.Container();
const endGameScene = new PIXI.Container();
const selectSound = new PIXI.sound.Sound.from("assets/Blip_Select.wav");

//creating app and attaching it to "gameport" div in index
const app = new PIXI.Application({
    width: 900,
    height: 600,
    backgroundColor: 0xff69b4,
});
document.getElementById("gameport").appendChild(app.view);

//loading textures
const toppingTextureValues = [
    "assets/pepperoni.png",
    "assets/pineapple.png",
    "assets/black_olives.png",
    "assets/love.png",
    "assets/fish.png"
];

//using app loader to init spritesheet for wavingman animation
app.loader
.add("assets/wavingman.json") 
.load(storeFrames)
const frames = [];
function storeFrames(){
    for (var i = 1; i <= 5; i+=1){
        frames.push(PIXI.Texture.from('wavingman' + i + '.png'));
    }
}


//ENTRY POINT
createStartScene();

//Start Screen
function createStartScene()
{
    //clearing any other scenes so they are not still rendering
    app.stage.removeChildren();

    //adding background
    const startSceneBackground = new PIXI.Sprite.from("assets/startBackground.png");
    startScene.addChild(startSceneBackground);
    
    //creating and setting button that will send user to the game
    const startButton = new PIXI.Sprite.from("assets/startButton.png");
    startButton.anchor.set(.5);
    startButton.y = 350;
    startButton.x = 450
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on('pointerdown', ()=>{
        selectSound.play() // will play sound everytiime button is clicked
        createGameScene()
    })
    startScene.addChild(startButton);


    //creating and setting button that will send user to credits
    const creditsButton = new PIXI.Sprite.from("assets/creditsButton.png");
    creditsButton.anchor.set(.5);
    creditsButton.y = 500;
    creditsButton.x = 450;
    creditsButton.interactive = true;
    creditsButton.buttonMode = true;
    creditsButton.on('pointerdown', ()=>{
        selectSound.play();
        createCreditsScene();
    });
    startScene.addChild(creditsButton);
    
    //making startscreen visiable
    app.stage.addChild(startScene);
}

// Credits Screen

function createCreditsScene(){
    
    app.stage.removeChildren();

    //setting up background wich includes text for credits scene
    const creditsSceneBackground = new PIXI.Sprite.from("assets/creditsBackground.png");
    creditScene.addChild(creditsSceneBackground);

    //setting up back button that will return user to start screen
    const backButton = new PIXI.Sprite.from("assets/backButton.png");
    backButton.anchor.set(0.5);
    backButton.y = 550;
    backButton.x = 150;
    backButton.interactive = true;
    backButton.buttonMode = true;
    backButton.on('pointerdown', ()=>{
        selectSound.play();
        createStartScene()
    });
    creditScene.addChild(backButton);

    //creating little animation of a guy wavng hello
    const wavingMan = new PIXI.AnimatedSprite(frames);
    wavingMan.anchor.set(0.5)
    wavingMan.y = 475;
    wavingMan.x = 700;
    wavingMan.scale.set(1.3)
    wavingMan.animationSpeed = 0.15;
    wavingMan.play();
    creditScene.addChild(wavingMan);

    //setting credit scene visible to user
    app.stage.addChild(creditScene);
}

// Instruction Screen
function createInstructionScene(){

    const instructionBackgound = new PIXI.Sprite.from("assets/instructionBackground.png");

    instructionScene.addChild(instructionBackgound);

    const backButton = new PIXI.Sprite.from("assets/backButton.png");
    backButton.anchor.set(0.5);
    backButton.y = 550;
    backButton.x = 150;
    backButton.interactive = true;
    backButton.buttonMode = true;
    backButton.on('pointerdown', ()=>{
        selectSound.play()
        app.stage.removeChild(instructionScene)    
    });
    instructionScene.addChild(backButton);

    app.stage.addChild(instructionScene)
}


// Game Screen 
function createGameScene(event){
    

    //adding background
    
    gameScene.addChild(background);
    
    //creating and setting Pizza Sprite
    var pizza = new PIXI.Sprite.from('assets/pizza.png');
    pizza.anchor.set(.5);
    pizza.x = 900/2
    pizza.y = 600/2 - 50
    pizza.scale.set(.85);
    gameScene.addChild(pizza);
    
    
    //Creating and setting Topping Sprites
    for (i = 0; i < toppingTextureValues.length; i++) {
        var toppingTexture = new PIXI.Texture.from(toppingTextureValues[i]);
        
        for (j = 0; j < 6; j++) {
            var topping = new PIXI.Sprite(toppingTexture);

            topping.anchor.set(0.5);
            topping.x = 100 + i * 175;
            topping.y = 520;

            topping.interactive = true;
            topping.buttonMode = true;
            

            topping
                .on('pointerdown', onDragStart)
                .on('pointerup', onDragEnd)
                .on('pointerupoutside', onDragEnd)
                .on('pointermove', onDragMove);

            gameScene.addChild(topping);

        }
        
    }
    
    //Creating help button that will open the instructions scene
    var helpButton = new PIXI.Sprite.from('assets/help.png');
    helpButton
    .on('pointerdown', ()=>{
        selectSound.play()
        createInstructionScene()
    })
        .interactive = true
        .butonMode = true;
    helpButton.scale.set(.8);
    helpButton.x = 840;
    gameScene.addChild(helpButton);
    
    //Creating and Setting Done Button that will close gamescene and bring up the end scene
    var doneButton = new PIXI.Sprite.from('assets/doneButton.png');
    doneButton.interactive = true;
    doneButton.buttonMode = true;
    doneButton.x = 10;
    doneButton.on('pointerdown', ()=>{
        selectSound.play();
        createEndScene();
    })

    gameScene.addChild(doneButton);
    

    //adding tween transition into gamescene
    gameScene.x = -1000;
    createjs.Tween.get(gameScene.position).to({x: 0}, 1000, createjs.Ease.bounceOut).call(handle =>
         app.stage.removeChild(startScene)); 
    
    app.stage.addChild(gameScene);
}

// End Screen

function createEndScene(){

    app.stage.removeChildren();

    
    //adding background
    endGameScene.addChild(background);

    //adding EndGame text
    var endText = new PIXI.Sprite.from('assets/endText.png');
    endText.anchor.set(0.5);
    endText.x = 450;
    endText.y = 300;
    endGameScene.addChild(endText);

    //createing and setting homebutton that will send back startScene
    var homeButton = new PIXI.Sprite.from('assets/homeButton.png');
    homeButton.interactive = true;
    homeButton.button = true;
    homeButton.y = 500;
    homeButton.on('pointerdown', ()=>{
        selectSound.play();
        createStartScene();
    });
    endGameScene.addChild(homeButton);


    app.stage.addChild(endGameScene);
}

//listener functions for toppings sprites
function onDragStart(event){
    this.data = event.data;
    this.dragging = true;
    redrawSprite(this);
}

// redraws sprites so when selected they go to the "top layer" of the screen
function redrawSprite(sprite)
{
    var parent = sprite.parent;
    parent.removeChild(sprite);
    parent.addChild(sprite);
};

function onDragEnd(){
    selectSound.play();
    this.dragging = false;
    this.data = null;
}

function onDragMove(){
    if(this.dragging){
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}