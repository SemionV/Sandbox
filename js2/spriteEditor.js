require(['context', 'engine', 'resources', 'scene', 'components', 'render', 'primitives', 'tileTerrain', 'input'],
    function(context, dori, resources, scenes, components, render, primitives, tileTerrain, input){

    let canvas = document.getElementById('canvas');
    let canvasContext = canvas.getContext('2d');

    var resourceManager = new resources.ResourceManager();
    resourceManager.loadImages({
        "terrain.grass": "img/1-grass-1.png",
        "terrain.hole": "img/hole.png",
        "objects.chair": "img/2-chair1.png",
        "warrior_spritesheet1": "img/warrior/warrior_spritesheet1.png",
        "warrior_spritesheet2": "img/warrior/warrior_spritesheet2.png",
        "terrain.grass2": "img/grass.png",
        "terrain.grass3": "img/grass2.png",
        "terrain.grass4": "img/grass32.png",
        "pine-none04.png": "img/pine-none04.png"
    }).then(() =>{
        let engine = new dori.Engine(new dori.EngineConfig(100, false));
        context.engine = engine;

        //engine.heart = () => {};
        window.engine = engine;

        let scene = new scenes.SceneManager();

        let camera = new scenes.Entity();
        let viewport = new render.Viewport(canvas.width, canvas.height);
        let renderer = new render.Canvas2DIsometricRenderer(canvasContext, viewport);
        camera.addComponent(new components.CameraComponent(renderer));
        var matrix = primitives.Matrix3D.translate(100, 100, -100);
        camera.addComponent(new components.PositionComponent(matrix));
        var cameraDirection = new primitives.Point3D(-1, -1, 1);
        camera.addComponent(new components.DirectionComponent(cameraDirection));
        camera.addComponent(new components.RotateCameraComponent());

        let terrain = new scenes.Entity();
        const tileWidth = 32;
        const tileHeight = 32;
        var imageGrass = resourceManager.getImage('terrain.grass4');
        var imageHole = resourceManager.getImage('terrain.hole');
        terrain.addComponent(new tileTerrain.OneDimensionTileTerrain(
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 2, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 10, tileWidth, tileHeight,
            new Map([
                [1, new tileTerrain.TileType(new primitives.Image(imageGrass, tileWidth, tileHeight / 2))],
                [2, new tileTerrain.TileType()]
            ])));
        terrain.addComponent(new tileTerrain.OneDimensionTileTerrainDrawer(cameraDirection));
        scene.addEntity('terrain', terrain);

        let cameraFocus = new scenes.Entity();
        cameraFocus.addComponent(new components.PositionComponent());
        cameraFocus.addComponent(new components.DirectionComponent());
        cameraFocus.addComponent(new components.KeyboardControllerComponent(cameraDirection));
        cameraFocus.addComponent(new components.MovementComponent(100));
        cameraFocus.addComponent(new components.PointDrawer());
        cameraFocus.addChild(camera);
        scene.addEntity('cameraFocus', cameraFocus);

        let center = new scenes.Entity();
        center.addComponent(new components.PositionComponent());
        center.addComponent(new components.PointDrawer());
        scene.addEntity('center', center);

        let imagePine = resourceManager.getImage('pine-none04.png');
        var pineSprite = new primitives.Image(imagePine, 158.07999999999663, 223.99999999999665);
        let pine = new scenes.Entity();
        var positionComponent = new components.PositionComponent();
        primitives.Matrix3D.translate(-74.23999999999982, 144.63999999999834, 0, positionComponent.transformation)
        pine.addComponent(positionComponent);
        pine.addComponent(new components.SpriteComponent(pineSprite));
        pine.addComponent(new components.SpriteDrawer());
        scene.addEntity('pine', pine);

        pine = new scenes.Entity();
        var positionComponent = new components.PositionComponent();
        primitives.Matrix3D.translate(-139.83999999999844, 115.51999999999896, 0, positionComponent.transformation)
        pine.addComponent(positionComponent);
        pine.addComponent(new components.SpriteComponent(pineSprite));;
        pine.addComponent(new components.SpriteDrawer());
        scene.addEntity('pine2', pine);

        pine = new scenes.Entity();
        var positionComponent = new components.PositionComponent();
        primitives.Matrix3D.translate(-50, 50, 0, positionComponent.transformation)
        pine.addComponent(positionComponent);
        pine.addComponent(new components.SpriteComponent(pineSprite));
        pine.addComponent(new components.SpriteDrawer());
        scene.addEntity('pine3', pine);

        pine = new scenes.Entity();
        var positionComponent = new components.PositionComponent();
        primitives.Matrix3D.translate(84.47999999999962, 338.5599999999942, 0, positionComponent.transformation)
        pine.addComponent(positionComponent);
        pine.addComponent(new components.SpriteComponent(pineSprite));;
        pine.addComponent(new components.SpriteDrawer());
        scene.addEntity('pine4', pine);

        let chair = new scenes.Entity();
        chair.addComponent( new components.PositionComponent());
        chair.addComponent(new components.DirectionComponent());
        //scene.addEntity('chair', chair);

        let chairPoint = new scenes.Entity();
        chairPoint.addComponent( new components.PositionComponent());
        chairPoint.addComponent(new components.PointDrawer());
        chair.addChild(chairPoint);

        let chairView = new scenes.Entity();
        let imageChair = resourceManager.getImage('objects.chair');
        chairView.addComponent(new components.SpriteComponent(new primitives.Image(imageChair, imageChair.width / 2 + 6, imageChair.height / 2 + 26)));
        chairView.addComponent(new components.BoundingBoxComponent(new primitives.Box(28, 26, 46)));
        chairView.addComponent(new components.BoundingBoxBackDrawer());
        chairView.addComponent(new components.SpriteDrawer(true));
        chairView.addComponent(new components.BoundingBoxFrontDrawer());
        chair.addChild(chairView);

        scene.addEventHandler(dori.FpsUpdatedEvent, (e)=>{
            document.getElementById('FPS').innerText = e.fps;
        });

        engine.setActiveScene(scene);
        engine.run();
    });
});
