var cursor = {
  screen: 'selection',
  x: 391,
  y: 487
};

var Character = function() {
  this.lives = 1,
  this.update = function(dt) {},
  this.renderHero = function(name) {
    switch (name) {
      case 'Genji':
        ctx.drawImage(Resources.get(this.sprite), 0, 0, 600, 340, -115, 95, 600, 340);
        break;
      case 'McCree':
        ctx.drawImage(Resources.get(this.sprite), 0, 0, 600, 350, -45, 163, 480, 272);
        break;
      case 'Pharah':
        ctx.drawImage(Resources.get(this.sprite), 0, 0, 600, 350, -65, 163, 480, 272);
        break;
      case 'Reaper':
        ctx.drawImage(Resources.get(this.sprite), 0, 0, 600, 340, -67, 129, 540, 306);
        break;
      case 'Soldier76':
        ctx.drawImage(Resources.get(this.sprite), 0, 0, 600, 340, -97, 129, 540, 306);
        break;
      case 'Sombra':
        ctx.drawImage(Resources.get(this.sprite), 0, 0, 600, 340, -77, 129, 540, 306);
        break;
      default:
        ctx.drawImage(Resources.get(this.sprite), 0, 0, 600, 340, -105, 95, 600, 340);
        break;
    }
  },
  this.renderEnemy = function(name) {
    switch(name) {
      case 'McCree':
        ctx.drawImage(Resources.get(this.sprite), 400, -80, 405, 405);
        break;
      case 'Pharah':
        ctx.drawImage(Resources.get(this.sprite), 415, -80, 405, 405);
        break;
      case 'Reaper':
        ctx.drawImage(Resources.get(this.sprite), 410, -80, 405, 405);
        break;
      case 'Soldier76':
        ctx.drawImage(Resources.get(this.sprite), 415, -80, 405, 405);
        break;
      case 'Sombra':
        ctx.drawImage(Resources.get(this.sprite), 415, -80, 405, 405);
        break;
      case 'Tracer':
        ctx.drawImage(Resources.get(this.sprite), 375, -100, 450, 450);
        break;
      default:
        ctx.drawImage(Resources.get(this.sprite), 400, -100, 450, 450);
        break;
    }
  }
};

var Genji = function () {
  Character.call(this);
  this.name = 'Genji';
  this.heroImage = 'images/genji-pixel-hero.png';
  this.enemyImage = 'images/genji-pixel-enemy.png';
  this.class = 'Offense';
  this.hp = {
        health: 200,
        shields: 0,
        armor: 0
      };
  this.primary = {
        name: 'Shuriken',
        type: 'projectile',
        damageMin: 28,
        damageMax: 28,
        burst: 3,
        falloff: false,
        ammoPer: 3,
        ammo: 24,
        headshot: true,
        unloadTime: 8,
        cooldown: 1
      };
  this.secondary = {
        name: 'Fan of Blades',
        type: 'projectile',
        damageMin: 28,
        damageMax: 28,
        burst: 3,
        falloff: false,
        ammoPer: 3,
        ammo: 24,
        headshot: true,
        unloadTime: 8,
        cooldown: 1
      };
  this.ability1 = {
        name: 'Deflect',
        type: 'none',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: false,
        ammoPer: 1,
        ammo: 1,
        headshot: true,
        unloadTime: 2,
        cooldown: 8,
        note: 'Genji\'s Deflect will reflect back enemy attacks in the direction he is facing.'
      };
  this.ability2 = {
        name: 'Swift Strike',
        type: 'projectile',
        damageMin: 50,
        damageMax: 50,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 14,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 0.4,
        cooldown: 8,
        note: "Swift Strike's cooldown is reset each time Genji defeats an enemy."
      };
  this.ultimate = {
        name: 'Dragonblade',
        type: 'slashing projectile',
        damageMin: 120,
        damageMax: 120,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 5,
        ammoPer: 1,
        headshot: false,
        unloadTime: 7,
        cooldown: "1500 hp"
      };
};

Genji.prototype = Object.create(Character.prototype);
Genji.prototype.constructor = Genji;

var McCree = function () {
  Character.call(this);
  this.name = 'McCree';
  this.heroImage = 'images/mccree-pixel-hero.png';
  this.enemyImage = 'images/mccree-pixel-enemy.png';
  this.class = 'Offense';
  this.hp = {
        health: 200,
        shields: 0,
        armor: 0
      };
  this.primary = {
        name: 'Peacekeeper',
        type: 'hitscan',
        damageMin: 20,
        damageMax: 70,
        burst: 0,
        falloff: true,
        falloffMin: 22,
        falloffMax: 45,
        ammoPer: 1,
        ammo: 6,
        headshot: true,
        unloadTime: 3,
        cooldown: 1.5
      };
  this.secondary = {
        name: 'Fan the Hammer',
        type: 'hitscan',
        damageMin: 22,
        damageMax: 45,
        burst: 0,
        falloff: true,
        falloffMin: 18,
        falloffMax: 30,
        ammoPer: 1,
        ammo: 6,
        headshot: false,
        unloadTime: 0.67,
        cooldown: 1.5,
        note: "Fan the Hammer will fire as many shots are left in McCree's Peacekeeper"
      };
  this.ability1 = {
        name: 'Flashbang',
        type: 'projectile',
        damageMin: 25,
        damageMax: 25,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 5,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 0.5,
        cooldown: 10
      };
  this.ability2 = {
        name: 'Combat Roll',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 6,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 0.5,
        cooldown: 8,
        note: 'Combat Roll resets the cooldown on Fan the Hammer'
      };
  this.ultimate = {
        name: 'Deadeye',
        type: 'hitscan',
        damageMin: 0,
        damageMax: 1500,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 100,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 6.8,
        cooldown: "1500 hp"
      };
};

McCree.prototype = Object.create(Character.prototype);
McCree.prototype.constructor = McCree;

var Pharah = function () {
  Character.call(this);
  this.name = 'Pharah';
  this.heroImage = 'images/pharah-pixel-hero.png';
  this.enemyImage = 'images/pharah-pixel-enemy.png';
  this.class = 'Offense';
  this.hp = {
        health: 200,
        shields: 0,
        armor: 0
      };
  this.primary = {
        name: 'Rocket Launcher',
        type: 'projectile',
        damageMin: 30,
        damageMax: 120,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 3,
        ammoPer: 1,
        ammo: 6,
        headshot: false,
        unloadTime: 5.45,
        cooldown: 1
      };
  this.secondary = {
        name: 'Hover',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: false,
        ammoPer: 0,
        ammo: 0,
        headshot: false,
        unloadTime: 2,
        cooldown: 2
      };
  this.ability1 = {
        name: 'Concussive Blast',
        type: 'projectile',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 8,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 0.5,
        cooldown: 12
      };
  this.ability2 = {
        name: 'Jump Jet',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 14,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 1,
        cooldown: 10,
      };
  this.ultimate = {
        name: 'Barrage',
        type: 'projectile',
        damageMin: 40,
        damageMax: 40,
        burst: 90,
        falloff: true,
        falloffMin: 0,
        falloffMax: 70,
        ammoPer: 1,
        ammo: 90,
        headshot: false,
        unloadTime: 3,
        cooldown: "1850 hp"
      };
};

Pharah.prototype = Object.create(Character.prototype);
Pharah.prototype.constructor = Pharah;

var Reaper = function () {
  Character.call(this);
  this.name = 'Reaper';
  this.heroImage = 'images/reaper-pixel-hero.png';
  this.enemyImage = 'images/reaper-pixel-enemy.png';
  this.class = 'Offense';
  this.hp = {
        health: 250,
        shields: 0,
        armor: 0
      };
  this.primary = {
        name: 'Hellfire Shotguns',
        type: 'hitscan',
        damageMin: 40,
        damageMax: 140,
        burst: 0,
        falloff: true,
        falloffMin: 11,
        falloffMax: 20,
        ammoPer: 1,
        ammo: 8,
        headshot: true,
        unloadTime: 4,
        cooldown: 1.5
      };
  this.secondary = {
        name: '',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: false,
        ammoPer: 0,
        ammo: 0,
        headshot: false,
        unloadTime: 0,
        cooldown: 0
      };
  this.ability1 = {
        name: 'Shadow Step',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 35,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 2.5,
        cooldown: 10
      };
  this.ability2 = {
        name: 'Wraith Form',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: false,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 3,
        cooldown: 8,
        note: 'Reaper cannot take damage or be affected by CC while in Wraith Form. He also fully refills his ammo when using Wraith Form.'
      };
  this.ultimate = {
        name: 'Death Blossom',
        type: 'hitscan',
        damageMin: 170,
        damageMax: 170,
        burst: 3,
        falloff: true,
        falloffMin: 0,
        falloffMax: 8,
        ammoPer: 1,
        ammo: 3,
        headshot: false,
        unloadTime: 3,
        cooldown: "1850 hp"
      };
};

Reaper.prototype = Object.create(Character.prototype);
Reaper.prototype.constructor = Reaper;

var Soldier76 = function () {
  Character.call(this);
  this.name = 'Soldier76';
  this.heroImage = 'images/soldier76-pixel-hero.png';
  this.enemyImage = 'images/soldier76-pixel-enemy.png';
  this.class = 'Offense';
  this.hp = {
        health: 200,
        shields: 0,
        armor: 0
      };
  this.primary = {
        name: 'Heavy Pulse Rifle',
        type: 'hitscan',
        damageMin: 6,
        damageMax: 19,
        burst: 0,
        falloff: true,
        falloffMin: 30,
        falloffMax: 55,
        ammoPer: 1,
        ammo: 25,
        headshot: true,
        unloadTime: 2.84,
        cooldown: 1.5
      };
  this.secondary = {
        name: 'Helix Rockets',
        type: 'projectile',
        damageMin: 80,
        damageMax: 120,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 2,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 0.5,
        cooldown: 8
      };
  this.ability1 = {
        name: 'Biotic Field',
        type: 'projectile',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        healingMin: 40,
        healingMax: 200,
        falloff: true,
        falloffMin: 0,
        falloffMax: 5,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 5,
        cooldown: 15
      };
  this.ability2 = {
        name: 'Sprint',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        healing: 0,
        falloff: false,
        ammoPer: 0,
        ammo: 1,
        headshot: false,
        unloadTime: 0,
        cooldown: 0,
        note: 'Soldier:76 can sprint an indefinite amount of time.'
      };
  this.ultimate = {
        name: 'Tactical Visor',
        type: 'hitscan',
        damageMin: 20,
        damageMax: 20,
        burst: 0,
        falloff: false,
        ammoPer: 1,
        ammo: 50,
        headshot: false,
        unloadTime: 7.4,
        cooldown: "2075 hp"
      };
};

Soldier76.prototype = Object.create(Character.prototype);
Soldier76.prototype.constructor = Soldier76;

var Sombra = function () {
  Character.call(this);
  this.name = 'Sombra';
  this.heroImage = 'images/sombra-pixel-hero.png';
  this.enemyImage = 'images/sombra-pixel-enemy.png';
  this.class = 'Offense';
  this.hp = {
        health: 200,
        shields: 0,
        armor: 0
      };
  this.primary = {
        name: 'Machine Pistol',
        type: 'hitscan',
        damageMin: 2.4,
        damageMax: 8,
        burst: 0,
        healing: 0,
        falloff: true,
        falloffMin: 15,
        falloffMax: 25,
        ammoPer: 1,
        ammo: 60,
        headshot: true,
        unloadTime: 3,
        cooldown: 1.5
      };
  this.secondary = {
        name: 'Hack',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 15,
        ammoPer: 0,
        ammo: 0,
        headshot: false,
        unloadTime: 0.8,
        cooldown: 8,
        notes: 'Durations - Abilities: 6 seconds, Health Bar/Ultimate Status reveal: 20 seconds, Health Pack: 60 seconds, Turrets: 10 seconds'
      };
  this.ability1 = {
        name: 'Translocator',
        type: 'projectile',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: false,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 15,
        cooldown: 4
      };
  this.ability2 = {
        name: 'Thermoptic Camo',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: false,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 6.7,
        cooldown: 6,
        notes: 'Sombra becomes invisible for up to 6 seconds unless she attacks, uses an ability, or is damaged.She moves at 8.8 m/sec while camouflaged.'
      };
  this.ultimate = {
        name: 'EMP',
        type: 'sphere',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 15,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 0,
        cooldown: "1250 hp",
        notes: 'Sombra discharges electromagnetic energy in a sphere, destroying enemy barriers and shields and hacking all opponents caught in the blast for 6 seconds.'
      };
};

Sombra.prototype = Object.create(Character.prototype);
Sombra.prototype.constructor = Sombra;

var Tracer = function () {
  Character.call(this);
  this.name = 'Tracer';
  this.heroImage = 'images/tracer-pixel-hero.png';
  this.enemyImage = 'images/tracer-pixel-enemy.png';
  this.class = 'Offense';
  this.hp = {
        health: 150,
        shields: 0,
        armor: 0
      };
  this.primary = {
        name: 'Pulse Pistols',
        type: 'hitscan',
        damageMin: 3,
        damageMax: 12,
        burst: 2,
        falloff: true,
        falloffMin: 11,
        falloffMax: 30,
        ammoPer: 1,
        ammo: 20,
        headshot: true,
        unloadTime: 1,
        cooldown: 1
      };
  this.secondary = {
        name: '',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: false,
        ammoPer: 0,
        ammo: 0,
        headshot: false,
        unloadTime: 0,
        cooldown: 0
      };
  this.ability1 = {
        name: 'Recall',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        healing: 50,
        falloff: true,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 1.25,
        cooldown: 12,
        notes: 'Tracer\'s Recall ability rewinds her position and health to 3 seconds ago.'
      };
  this.ability2 = {
        name: 'Blink',
        type: '',
        damageMin: 0,
        damageMax: 0,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 7,
        ammoPer: 1,
        ammo: 3,
        headshot: false,
        unloadTime: 0.75,
        cooldown: 3,
        notes: 'Tracer\'s Blink ability moves her 7m in her current direction of travel.'
      };
  this.ultimate = {
        name: 'Pulse Bomb',
        type: 'projectile',
        damageMin: 400,
        damageMax: 400,
        burst: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 3,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 1,
        cooldown: "1125 hp"
      };
};

Tracer.prototype = Object.create(Character.prototype);
Tracer.prototype.constructor = Tracer;
