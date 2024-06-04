import kaboom from "kaboom";

// Initialize kaboom
kaboom();

// Constants
const floorHeight = 48;
const wallWidth = 10;
const speed = 200;

// Load sprites
loadSprite("player", "sprites/player.png");
loadSprite("enemy", "sprites/enemy.png");
loadSprite("background", "sprites/background.avif");
loadSprite("projectile", "sprites/projectile.png");


// Function to initialize enemies
function createEnemy(position, player) {
    const enemy = add([
        sprite("enemy"),
        pos(position),
        scale(0.5),
        area(),
        body(),
        "enemy",
    ]);
    let enemyDirection = vec2(rand(-1, 1), rand(-1, 1)).unit();
 
    // Oppdater fiende bevegelse
    enemy.onUpdate(() => {
        enemy.move(enemyDirection.scale(100));

        // Sjekk kollisjon med vegger og gulv
        if (enemy.pos.x <= wallWidth || enemy.pos.x >= width() - wallWidth - enemy.width) {
            enemyDirection.x *= -1; // Endre retning horisontalt
        }
        if (enemy.pos.y <= 0 || enemy.pos.y >= height() - floorHeight - enemy.height) {
            enemyDirection.y *= -1; // Endre retning vertikalt
        }
    });

    // Update enemy movement to target player

}

// Function to spawn projectile
function spawnProjectile(player) {
    const projectile = add([
        sprite("projectile"),
        pos(player.pos.add(0, -10)),
        scale(1 / 15),
        area(),
        "projectile",
    ]);

    const dir = mousePos().sub(player.pos).unit();
    projectile.onUpdate(() => {
        projectile.move(dir.scale(400 * 1.5));
    });
}

// Function to spawn fiends at the edges

// Start game scene
scene("game", () => {
    // Background
    add([
        sprite("background"),
        pos(0, 0),
        z(-1),
        scale(width() / 320, height() / 240),
    ]);

    // Player
    const player = add([
        sprite("player"),
        pos(10, 200),
        scale(0.05),
        area(),
        body(),
        "player",
    ]);

    // Create initial enemy
    createEnemy(vec2(120, 90), player);

    // Player movement
    onKeyDown("w", () => { player.move(0, -speed); });
    onKeyDown("a", () => { player.move(-speed, 0); });
    onKeyDown("s", () => { player.move(0, speed); });
    onKeyDown("d", () => { player.move(speed, 0); });
    onKeyPress("space", () => { spawnProjectile(player); });

    // Prevent player from moving outside the screen boundaries
    player.onUpdate(() => {
        const playerWidth = player.width * player.scale.x;
        const playerHeight = player.height * player.scale.y;

        if (player.pos.x < 0) { player.pos.x = 0; }
        if (player.pos.x > width() - playerWidth) { player.pos.x = width() - playerWidth; }
        if (player.pos.y < 0) { player.pos.y = 0; }
        if (player.pos.y > height() - playerHeight) { player.pos.y = height() - playerHeight; }

        const dir = mousePos().sub(player.pos);
        player.angle = dir.angle();
    });

    // Floor and walls
    add([
        rect(width(), floorHeight),
        pos(0, height() - floorHeight),
        area(),
        color(0, 0, 30),
        "wall",
    ]);

    add([
        rect(wallWidth, height()),
        pos(0, 0),
        area(),
        color(0, 0, 30),
        "wall",
    ]);

    add([
        rect(wallWidth, height()),
        pos(width() - wallWidth, 0),
        area(),
        color(0, 0, 30),
        "wall",
    ]);

    // Collision handling between projectile and enemy
    onCollide("projectile", "enemy", (projectile, enemy) => {
        destroy(projectile);
        score++;
        scoreLabel.text = score;

        // Duplicate the enemy
        createEnemy(enemy.pos.add(10, 10), player);
    });

    // Collision handling between player and enemy
    player.onCollide("enemy", () => {
        go("lose", score);
        addKaboom(player.pos);
    });

    // Score system
    let score = 0;
    const scoreLabel = add([
        text(score),
        pos(24, 24),
    ]);

    onUpdate(() => {
        scoreLabel.text = score;
        if (score >= 50) {
            go(score);
        }
    });
});



// Lose scene
scene("lose", (score) => {
    add([
        text("Game Over"),
        pos(width() / 2, height() / 2),
    ]);

    add([
        text(`Score: ${score}`),
        pos(width() / 2, height() / 2 + 48),
    ]);

    onKeyDown("r", () => go("game"));
    onClick(() => go("game"));
});

// Start the game
go("game");
