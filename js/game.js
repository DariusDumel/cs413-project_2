
const app = new PIXI.Application({
    width: 900,
    height: 600,
    backgroundColor: 0xff69b4,
});

document.getElementById("gameport").appendChild(app.view);


createStartScene();

//Start Screen

function createStartScene()
{

    const startScence = new PIXI.Container();
    const startSceneBackground = new PIXI.Sprite.from("assets/startBackground.png");
    startScence.addChild(startSceneBackground);
    
    const startButton = new PIXI.Sprite.from("assets/startButton.png");
    startButton.anchor.set(.5);
    startButton.y = 350;
    startButton.x = 450
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on('pointerdown', createGameScene)
    startScence.addChild(startButton);
    
    const creditsButton = new PIXI.Sprite.from("assets/creditsButton.png");
    creditsButton.anchor.set(.5);
    creditsButton.y = 500;
    creditsButton.x = 450;
    creditsButton.interactive = true;
    creditsButton.buttonMode = true;
    creditsButton.on('pointerdown', createCreditsScene);
    startScence.addChild(creditsButton);
    
    app.stage.addChild(startScence);
}


// Credits Screen


const creditScene = new PIXI.Container();
const creditsSceneBackground = new PIXI.Sprite.from("assets/creditsBackground.png");

function createCreditsScene(){

    app.stage.removeChildren();
    
    creditScene.addChild(creditsSceneBackground);

    const backButton = new PIXI.Sprite.from("assets/backButton.png");
    backButton.anchor.set(0.5);
    backButton.y = 550;
    backButton.x = 150;
    backButton.interactive = true;
    backButton.buttonMode = true;
    backButton.on('pointerdown', createStartScene);
    creditScene.addChild(backButton);

    app.stage.addChild(creditScene);

}
// Instruction Screen
// End Screen

// Game Screen 


const gameScene = new PIXI.Container();
const backgroundTexture = new PIXI.Texture.from("assets/pizza.png");

var toppingTextureValues = [
    "assets/pepperoni.png",
    "assets/pineapple.png",
    "assets/black_olives.png",
    "assets/love.png",
    "assets/fish.png"
];


function createGameScene(event){

    app.stage.removeChildren();

    createBackground();
    createToppings();
}


function createBackground(){
    
    var background = new PIXI.Sprite(backgroundTexture);
    gameScene.addChild(background);
    app.stage.addChild(gameScene);
}

function createToppings(){

    for(i = 0; i < toppingTextureValues.length; i++)
    {
        var toppingTexture = new PIXI.Texture.from(toppingTextureValues[i]);

        for(j = 0; j < 6; j++)
        {
            var topping = new PIXI.Sprite(toppingTexture);
        
            topping.anchor.set(0.5);
            topping.x = 100 + i*175;
            topping.y = 520;
        
            topping.interactive = true;
            topping.buttonMode = true;
        
            
            topping
                .on('pointerdown', onDragStart)
                .on('pointerup', onDragEnd)
                .on('pointerupoutside', onDragEnd)
                .on('pointermove', onDragMove);
        
        
            app.stage.addChild(topping);
            
        }
        
    }
}

function onDragStart(event){
    redrawSprite(this);
    this.data = event.data;
    this.dragging = true;
}

function redrawSprite(sprite)
{
    var parent = sprite.parent;
    parent.removeChild(sprite);
    parent.addChild(sprite);
};

function onDragEnd(){
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