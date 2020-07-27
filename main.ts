namespace SpriteKind {
    export const Tower = SpriteKind.create()
    export const superTower = SpriteKind.create()
}
sprites.onDestroyed(SpriteKind.Tower, function (sprite) {
    cloneSprite(sprite)
    makeFrogProjectile(sprite)
})
function cloneSprite (sprite: Sprite) {
    newSprite = sprites.create(sprite.image, sprite.kind())
    newSprite.x = sprite.x
    newSprite.y = sprite.y
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (canBuild) {
        buldTower()
    }
})
function buldTower () {
    if (5 <= info.score()) {
        frog = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . 4 8 4 8 . . . . . . . . . . 
            . f 1 4 4 4 8 4 8 . . . . . . . 
            4 1 1 4 4 4 4 4 4 4 8 . . . . . 
            4 4 4 4 4 4 4 4 4 4 4 8 . . . . 
            . 4 4 4 4 4 4 4 4 4 4 4 4 8 4 . 
            . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
            . . . 4 4 4 4 4 4 4 4 4 4 4 . . 
            . . . . 4 4 4 4 4 4 4 4 4 4 . . 
            . . . . . 4 8 4 8 8 8 4 4 4 8 8 
            . . . 8 8 4 8 8 8 8 8 8 8 4 4 4 
            . . 8 4 8 8 8 8 8 8 8 8 8 4 . . 
            . . 4 8 8 8 8 8 8 4 4 4 . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Tower)
        tiles.placeOnTile(frog, buildLocation)
        info.changeScoreBy(-5)
        towerNumber += 1
    }
}
sprites.onCreated(SpriteKind.Tower, function (sprite) {
    sprite.lifespan = 1000
})
function seePath () {
    for (let value of path) {
        tiles.setTileAt(value, myTiles.tile11)
    }
}
function makeFrogProjectile (frog: Sprite) {
    projectile = sprites.createProjectileFromSprite(img`
        9 9 9 9 1 9 9 1 1 
        . . . . . . . 1 9 
        `, frog, 1, 1)
    if (frog.tileKindAt(TileDirection.Left, myTiles.tile14)) {
        projectile.vx = -50
    } else if (frog.tileKindAt(TileDirection.Right, myTiles.tile14)) {
        projectile.vx = 50
    } else if (frog.tileKindAt(TileDirection.Top, myTiles.tile14)) {
        projectile.vy = -50
    } else if (frog.tileKindAt(TileDirection.Bottom, myTiles.tile14)) {
        projectile.vy = 50
    }
}
scene.onOverlapTile(SpriteKind.Enemy, myTiles.tile1, function (sprite, location) {
    sprite.destroy()
    info.changeLifeBy(-1)
    game.splash("A enemy got into your base.")
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy()
    info.changeScoreBy(1)
    enemyCount += 1
})
let wasp: Sprite = null
let projectile: Sprite = null
let towerNumber = 0
let buildLocation: tiles.Location = null
let frog: Sprite = null
let canBuild = false
let newSprite: Sprite = null
let nothing = 0
let path: tiles.Location[] = []
scene.setBackgroundColor(6)
tiles.setTilemap(tiles.createTilemap(hex`1000100002020202020202020202020202020202020105050505050502020505050505020205050505020505040205050503050202020204040205050402050505050502020202020202050504020205050505020202050505050505040202050505050202020505050505050202020505050502020405050202020202020202020502020204050504020202020202020405040202040505040202020202020202050202020405050202020202020202020505020204050502020202020202020205050202020505050202040402040402050502020205050505050505050505050505020202050505050505050505050505050202020202020202020202020202020202`, img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 . . . . . . . 2 2 . . . . . 2 
    2 . . . . 2 . . . 2 . . . . . 2 
    2 2 2 . . 2 . . . 2 . . . . . 2 
    2 2 2 2 2 2 . . . 2 2 . . . . 2 
    2 2 . . . . . . . 2 2 . . . . 2 
    2 2 . . . . . . 2 2 2 . . . . 2 
    2 . . . 2 2 2 2 2 2 2 2 2 . 2 2 
    2 . . . . 2 2 2 2 2 2 2 . . . 2 
    2 . . . . 2 2 2 2 2 2 2 2 . 2 2 
    2 . . . 2 2 2 2 2 2 2 2 2 . . 2 
    2 . . . 2 2 2 2 2 2 2 2 2 . . 2 
    2 2 . . . 2 2 . . 2 . . 2 . . 2 
    2 2 . . . . . . . . . . . . . 2 
    2 2 . . . . . . . . . . . . . 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, [myTiles.tile2,myTiles.tile1,myTiles.tile9,myTiles.tile10,myTiles.tile12,myTiles.tile14], TileScale.Sixteen))
let cursor = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . 8 8 8 8 8 8 8 8 8 8 . . . 
    . . . 8 . . . . . . . . 8 . . . 
    . . . 8 . . . . . . . . 8 . . . 
    . . . 8 . . . . . . . . 8 . . . 
    . . . 8 . . . . . . . . 8 . . . 
    . . . 8 . . . . . . . . 8 . . . 
    . . . 8 . . . . . . . . 8 . . . 
    . . . 8 . . . . . . . . 8 . . . 
    . . . 8 . . . . . . . . 8 . . . 
    . . . 8 8 8 8 8 8 8 8 8 8 . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(cursor)
cursor.setFlag(SpriteFlag.Ghost, true)
scene.cameraFollowSprite(cursor)
let baseLocation = tiles.getTilesByType(myTiles.tile1)[0]
let spawnerLocation = tiles.getTilesByType(myTiles.tile10)[0]
path = scene.aStar(spawnerLocation, baseLocation)
info.changeLifeBy(1)
info.setScore(20)
let time = 0
let enemyCount = nothing
game.onUpdate(function () {
    if (cursor.tileKindAt(TileDirection.Center, myTiles.tile12)) {
        canBuild = true
        cursor.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . 4 8 4 8 . . . . . . . . . . 
            . f 1 4 4 4 8 4 8 . . . . . . . 
            4 1 1 4 4 4 4 4 4 4 8 . . . . . 
            4 4 4 4 4 4 4 4 4 4 4 8 . . . . 
            . 4 4 4 4 4 4 4 4 4 4 4 4 8 4 . 
            . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
            . . . 4 4 4 4 4 4 4 4 4 4 4 . . 
            . . . . 4 4 4 4 4 4 4 4 4 4 . . 
            . . . . . 4 8 4 8 8 8 4 4 4 8 8 
            . . . 8 8 4 8 8 8 8 8 8 8 4 4 4 
            . . 8 4 8 8 8 8 8 8 8 8 8 4 . . 
            . . 4 8 8 8 8 8 8 4 4 4 . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        buildLocation = tiles.locationOfSprite(cursor)
    } else {
        cursor.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 8 8 8 8 8 8 8 8 8 8 . . . 
            . . . 8 . . . . . . . . 8 . . . 
            . . . 8 . . . . . . . . 8 . . . 
            . . . 8 . . . . . . . . 8 . . . 
            . . . 8 . . . . . . . . 8 . . . 
            . . . 8 . . . . . . . . 8 . . . 
            . . . 8 . . . . . . . . 8 . . . 
            . . . 8 . . . . . . . . 8 . . . 
            . . . 8 . . . . . . . . 8 . . . 
            . . . 8 8 8 8 8 8 8 8 8 8 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        canBuild = false
    }
})
game.onUpdateInterval(1000, function () {
    wasp = sprites.create(img`
        . . f f . . . . . . . . . . . . 
        . 5 5 f f . . . f . f . . . . . 
        f f 5 5 f f . f 1 1 . f . . . . 
        f 5 5 f f f f . 1 f f . . . . . 
        f f f f 5 5 5 f . f 1 1 f . . . 
        . . . f 5 5 f 5 f f 1 1 . . . . 
        . . . f 5 f 5 5 5 f . f f . . . 
        . . . f f 5 5 5 f 5 f . . . . . 
        . . . . f 5 5 f 5 5 f f . . . . 
        . . . . . f f f 5 f 5 f f . . . 
        . . . . . . f f 5 f 5 f f . . . 
        . . . . . . . . f f 5 f f . . . 
        . . . . . . . . . f f f f . . . 
        . . . . . . . . . . . . f . . . 
        . . . . . . . . . . . . f . . . 
        . . . . . . . . . . . f . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(wasp, myTiles.tile10)
    wasp.setVelocity(-10, 50)
    scene.followPath(wasp, path)
})
game.onUpdateInterval(1000, function () {
    time += 1
})
