var Character = function() {
  this.lives = 4;
};

Character.prototype.update = function(dt) {};

Character.prototype.render = function(type) {
  if (type === "hero") {
    ctx.drawImage(Resources.get(this.sprite), 0, 0, 600, 340, -105, 95, 600, 340);
  }
  else if (type === "enemy") {
    ctx.drawImage(Resources.get(this.sprite), 400, -100, 450, 450);
  }
};

var Genji = function () {
  Character.call();
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
        healing: 0,
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
        healing: 0,
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
        healing: 0,
        falloff: false,
        ammoPer: 1,
        ammo: 1,
        headshot: true,
        unloadTime: 2,
        cooldown: 8
      };
  this.ability2 = {
        name: 'Swift Strike',
        type: 'projectile',
        damageMin: 50,
        damageMax: 50,
        burst: 0,
        healing: 0,
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
        healing: 0,
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
  Character.call();
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
        healing: 0,
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
        healing: 0,
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
        healing: 0,
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
        healing: 0,
        falloff: true,
        falloffMin: 0,
        falloffMax: 6,
        ammoPer: 1,
        ammo: 1,
        headshot: false,
        unloadTime: 0.5,
        cooldown: 8
      };
  this.ultimate = {
        name: 'Deadeye',
        type: 'hitscan',
        damageMin: 0,
        damageMax: 1500,
        burst: 0,
        healing: 0,
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
