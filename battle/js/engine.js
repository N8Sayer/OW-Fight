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
        spaceCount;

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
    ctx.font = "25px 'Press Start 2P'";

    // Start button
    var button = document.getElementById("start");
    var hero,
        enemy;
    // Waiting for button click to read hero/enemy data
    button.addEventListener('click', function(evt) {
      var heroName = document.getElementById('hero').value,
          enemyName = document.getElementById('enemy').value;

      hero = new window[heroName];
      enemy = new window[enemyName];
      console.log(enemy);
      hero.type = 'hero';
      hero.sprite = hero.heroImage;
      hero.lives = 1;
      enemy.type = 'enemy';
      enemy.sprite = enemy.enemyImage;
      enemy.lives = 1;

      /* Go ahead and load all of the images we know we're going to need to
      * draw our game level. Then set init as the callback method, so that when
      * all of these images are properly loaded our game will start.
      */
      Resources.load([
         'images/background.png',
         'images/background-selection-menu.png',
         'images/empty-lootbox.png',
         'images/full-lootbox.png',
         'images/selection-arrow.png',
         hero.sprite,
         enemy.sprite
      ]);

      document.getElementById('container').style.display = 'none';

      Resources.onReady(init);
    });

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

        win.requestAnimationFrame(main);
    }

    function handleInput(key) {
      switch (key) {
        case 'left':
          if (this.x - 101 >= 3) {
            this.x -= 101;
          }
          break;
        case 'up':
          if (this.y == 63) {
            this.y = 415;
            this.wins++;
          }
          else {
            this.y -= 88;
          }
          break;
        case 'right':
          if (this.x + 101 <= 407) {
            this.x += 101;
          }
          break;
        case 'down':
          if (this.y + 88 <= 415) {
            this.y += 88;
          }
          break;
        case 'space':
          spaceCount++;
          if (spaceCount > 1) {

          }
          else {
            renderSelectionScreen();
            renderChars();
            renderHealth();
            renderNames();
            renderCursor(600,500);
          }
          break;
      }
    }
    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
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
      hero.render(hero.type);
      enemy.render(enemy.type);
    }

    function renderNames() {
      ctx.fillText(hero.name, 402, 330);
      ctx.fillText(enemy.name, 70, 45);
    }

    function renderCursor(x,y) {
      var cursorImage = new Image();
      cursorImage.src = 'images/selection-arrow.png';

      var cursor = function () {
        this.x = x;
        this.y = y;
        cursor.sprite = cursorImage;
      };
      ctx.drawImage(cursorImage, cursor.x, cursor.y);
    }

    function renderHealth() {
      hero.totalHealth = hero.hp.health + hero.hp.armor + hero.hp.shields;
      enemy.totalHealth = enemy.hp.health + enemy.hp.armor + enemy.hp.shields;
      ctx.fillText(hero.totalHealth, 450, 377);
      ctx.fillText(enemy.totalHealth, 150, 95);
    }

    function renderBackground() {
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

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        //noop
    }

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
