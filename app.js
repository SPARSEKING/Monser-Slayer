const app = new Vue({
    data() {
      return {
        monsterHealth: 100,
        userHealth: 100,
        counter: 0,
        userDamage: 0,
        monsterDamage: 0,
        arrayDamageMonster: [],
        arrayDamageUser: [],
        arrayHeal: [],
        disableSpecialAttack: true,
        message: '',
        changeControlButtons: true,
        buttonNewGame: false
      }
    },
    watch: {
      counter(newValue, _oldValue) {
        if(newValue % 3 === 0) {
          this.disableSpecialAttack = false;
        }else {
          this.disableSpecialAttack = true;
        }
      },
      userHealth(newValue, oldValue) {
        if(newValue < 8) {
          this.userHealth = 0;
          this.changeControlButtons = false;
          this.monsterVictory();
        }
      }
    },
    computed: {
      userVictory() {
        return (
          this.buttonNewGame = true,
          this.message = 'You won!'
        )
      },
      monsterVictory() {
        return (
          this.buttonNewGame = true,
          this.message = 'You lost!'
        )
      },
      draw() {
        this.buttonNewGame = true;
        this.message = "It's a draw!"
      }
    },
    methods: {
      clickAttack(number) {
        switch(number) {
          case 1:
            this.userDamage = this.getRndInteger(5, 12);
            this.monsterHealth = this.monsterHealth - this.userDamage;
            this.arrayDamageUser.push(this.userDamage)
            this.monsterDamage = this.getRndInteger(8, 15)
            this.userHealth = this.userHealth - this.monsterDamage;
            this.arrayDamageMonster.push(this.monsterDamage);
            this.counter++;
            if(this.monsterHealth < 5) {
              this.monsterHealth = 0;
              this.changeControlButtons = false;
              this.userVictory();
            } else if(this.monsterHealth < 5 || this.userHealth < 8) {
              this.changeControlButtons = false;
              this.draw();
            }
          break;
          
          case 2:
              this.userDamage = this.getRndInteger(10, 25);
              this.monsterHealth = this.monsterHealth - this.userDamage;
              this.arrayDamageUser.push(this.userDamage);
              this.monsterDamage = this.getRndInteger(8, 15)
              this.userHealth = this.userHealth - this.monsterDamage;
              this.arrayDamageMonster.push(this.monsterDamage);
              this.counter++;

            if(this.monsterHealth < 10) {
              this.monsterHealth = 0;
              this.changeControlButtons = false;
              this.userVictory();
            } else if(this.monsterHealth < 10 || this.userHealth < 8) {
              this.changeControlButtons = false;
              this.draw();
            }
          break;
          
          case 3:
            let userHeal = this.getRndInteger(8, 20);
            this.userHealth = this.userHealth + userHeal;
            this.arrayHeal.push(userHeal);
            this.monsterDamage = this.getRndInteger(8, 15)
            this.userHealth = this.userHealth - this.monsterDamage;
            this.arrayDamageMonster.push(this.monsterDamage)
            this.counter++;
          break;

          case 4:
            this.changeControlButtons = false;
            this.monsterVictory();
        }
      },
      startNewGame() {
        this.buttonNewGame = false;
        this.changeControlButtons = true;
        this.monsterHealth = 100;
        this.userHealth = 100;
        this.arrayDamageMonster = [];
        this.arrayDamageUser = [];
        this.arrayHeal = [];
      },
      getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      },
    }
  },
);
  
app.$mount('#game');