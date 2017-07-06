/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime,
        spaceCount = false,
        hero = {},
        enemy = {};

    WebFontConfig = {
      custom: { families: ['Press Start 2P'],
                urls: ['https://fonts.gstatic.com/s/pressstart2p/v5/8Lg6LX8-ntOHUQnvQ0E7o08SWvhA5BcWCS8xVZDIH7E.woff2']},
      active: function() {
        /* code to execute once all font families are loaded */
        console.log("Fonts Loaded!");
      }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();

    canvas.width = 800;
    canvas.height = 640;
    doc.body.appendChild(canvas);

    function loading() {
      // var logo = new Image();
      // logo.src = "images/overwatch.png";
      // ctx.drawImage(logo,0,0);

      ctx.fillStyle = 'white';
      ctx.textAlign = "center";
      ctx.font = "25px 'Press Start 2P'";
      ctx.fillText('Select your hero:',252,60);
      ctx.fillText("Select your enemy:",252,160);
      ctx.fillText("Press Start to begin the game",252,260);

      // Start button
      var button = document.getElementById("start");

      // Waiting for button click to read hero/enemy data
      button.addEventListener('click', function(evt) {
        var heroName = document.getElementById('hero').value,
            enemyName = document.getElementById('enemy').value;

        hero = new window[heroName];
        enemy = new window[enemyName];
        hero.type = 'hero';
        hero.sprite = hero.heroImage;
        enemy.type = 'enemy';
        enemy.sprite = enemy.enemyImage;

        Resources.load([
          hero.sprite,
          enemy.sprite
        ]);

        document.getElementById('container').style.display = 'none';
        /* Go ahead and load all of the images we know we're going to need to
        * draw our game level. Then set init as the callback method, so that when
        * all of these images are properly loaded our game will start.
        */
        Resources.onReady(init);
      });
    }

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
      //  update(dt);
      //  render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */



        win.requestAnimationFrame(main);
    }

    function handleInput(key) {
      var oldX = cursor.x;
      var oldY = cursor.y;
      switch (key) {
        case 'left':
          if (cursor.x - 185 >= 391) {
            cursor.x -= 185;
          }
          break;
        case 'up':
          if (cursor.y -70 >= 487) {
            cursor.y -= 70;
          }
          break;
        case 'right':
          if (cursor.x + 185 <= 576) {
            cursor.x += 185;
          }
          break;
        case 'down':
          if (cursor.y + 70 <= 557) {
            cursor.y += 70;
          }
          break;
        case 'space':
          if (spaceCount == false) {
            renderSelectionScreen();
            renderChars();
            renderHealth();
            ctx.font = '24px "Press Start 2P"';
            renderNames();
            renderCursor();
            return false;
          }
          spaceCount = true;
          break;
      }
      clearCursor(oldX,oldY);
      renderCursor();
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
      document.addEventListener('keydown', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            32: 'space'
        };
        handleInput(allowedKeys[e.keyCode]);
      });
      lastTime = Date.now();
      renderBackground();
      renderLives(hero.lives,enemy.lives);
      renderChars();
      renderNames();
      main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
      hero.update();
      enemy.update(dt);
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function renderChars() {
      hero.renderHero(hero.name);
      enemy.renderEnemy(enemy.name);
    }

    function renderNames() {
      ctx.fillText(hero.name, 402, 330);
      ctx.fillText(enemy.name, 70, 45);
    }

    function renderCursor() {
      ctx.drawImage(Resources.get('images/selection-arrow.png'), cursor.x, cursor.y, 20, 30);
    }

    function clearCursor(x,y) {
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(x, y, 20, 30);
    }

    function renderHealth() {
      ctx.font = '16px "Press Start 2P"';
      hero.totalHealth = hero.hp.health + hero.hp.armor + hero.hp.shields;
      enemy.totalHealth = enemy.hp.health + enemy.hp.armor + enemy.hp.shields;

      var heroHealthBar = 308 * (hero.hp.health / hero.totalHealth),
          heroArmorBar = 308 * (hero.hp.armor / hero.totalHealth),
          heroShieldsBar = 308 * (hero.hp.shields / hero.totalHealth),
          enemyHealthBar = 308 * (enemy.hp.health / enemy.totalHealth),
          enemyArmorBar = 308 * (enemy.hp.armor / enemy.totalHealth),
          enemyShieldsBar = 308 * (enemy.hp.shields / enemy.totalHealth);

      hero.remainingHealth = hero.totalHealth;
      enemy.remainingHealth = enemy.totalHealth;
      ctx.fillText("HP:" + hero.remainingHealth + "/" + hero.totalHealth, 415, 400);
      ctx.fillText("HP:" + enemy.remainingHealth + "/" + enemy.totalHealth, 80, 115);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(415,360,310,15);
      ctx.strokeRect(80,75,310,15);

      if (heroHealthBar > 0) {
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(416, 361, heroHealthBar, 13);
      }
      if (heroArmorBar > 0) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(416 + heroHealthBar, 361, heroArmorBar, 13);
      }
      if (heroShieldsBar > 0) {
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(416 + heroHealthBar + heroArmorBar, 361, heroShieldsBar, 13);
      }
      if (enemyHealthBar > 0) {
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(81, 76, enemyHealthBar, 13);
      }
      if (enemyArmorBar > 0) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(81 + enemyHealthBar, 76, enemyArmorBar, 13);
      }
      if (enemyShieldsBar > 0) {
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(81 + enemyHealthBar + enemyArmorBar, 76, enemyShieldsBar, 13);
      }

      ctx.fillStyle = 'black';
    }

    function renderBackground() {
      ctx.fillStyle = 'black';
      ctx.textAlign = 'left';
      ctx.font = "24px 'Press Start 2P'";
      var background = new Image();
      background.src = "images/background.png";
      ctx.drawImage(background,0,0);
      ctx.fillText("A wild " + enemy.name + " appeared!",40,500);
      ctx.fillText("Press \'Space\' to start battle",40,590);
    }

    function renderSelectionScreen() {
      var selection = new Image();
      selection.src = "images/background-selection-menu.png";
      ctx.drawImage(selection,0,0);

      ctx.fillText('FIGHT', 425, 515);
      ctx.fillText('SWITCH', 610, 515);
      ctx.fillText('IDK', 425, 585);
      ctx.fillText('QUIT', 610, 585);
    }

    function renderLives(heroLives,enemyLives) {
      var empty = new Image(),
          full = new Image();
      empty.src = 'images/empty-lootbox.png';
      full.src = 'images/full-lootbox.png';

      for (var x=0; x < 6; x++) {
        if (x < enemyLives) {
          ctx.drawImage(full, 325 - (40 * x), 75);
        }
        else if (x >= enemyLives) {
          ctx.drawImage(empty, 325 - (40 * x), 75);
        }

        if (x < heroLives) {
          ctx.drawImage(full, 645 - (40 * x), 357);
        }
        else if (x >= heroLives) {
          ctx.drawImage(empty, 645 - (40 * x), 357);
        }
      }
    }

    Resources.load([
       'images/background.png',
       'images/ow-logo.png',
       'images/background-selection-menu.png',
       'images/empty-lootbox.png',
       'images/full-lootbox.png',
       'images/selection-arrow.png'
    ]);
    Resources.onReady(loading);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
