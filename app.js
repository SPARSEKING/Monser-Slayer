const app = new Vue({
    data() {
      return {
        monsterHealth: 100,
        userHealth: 100,
        counter: 0,
        logMessages: [],
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
      userHealth(newValue) {
        if(newValue < 8) {
          this.userHealth = 0;
          this.changeControlButtons = false;
          this.monsterVictory();
        }
      }
    },
    computed: {
      monsterHealthComputed() {
        if( this.monsterHealth > 0 ) {
          return this.monsterHealth
        } else {
          return 0
        }
      },
      userHealthComputed() {
        if( this.userHealth > 0 ) {
          return this.userHealth
        } else {
          return 0
        }
      }
    },
    methods: {
      addLogMessage(who, what, value) {
        this.logMessages.unshift({
          actionBy: who,
          actionType: what,
          actionValue: value
        })
      },
      userAttack() {
        this.getMonsterDamage(5, 12);
        this.getUserDamage();
        if(this.monsterHealth === 0) {
          this.changeControlButtons = false;
          if(this.userHealth === 0) {
            this.draw();
          }
          this.userVictory();
        }
      },
      userSpecialAttack() {
        this.getMonsterDamage(10, 25);
        this.getUserDamage();
        if(this.monsterHealth === 0) {
          this.changeControlButtons = false;
          if(this.userHealth === 0) {
            this.draw();
          }
          this.userVictory();
        } 
      },
      userHeal() {
        const userHeal = this.getRndInteger(8, 20);
        this.userHealth += userHeal;
        this.getUserDamage();
        this.counter++;
        this.addLogMessage('User', 'heals himself for', userHeal);
      },
      surrender() {
        this.changeControlButtons = false;
        this.monsterVictory();
      },
      startNewGame() {
        this.buttonNewGame = false;
        this.changeControlButtons = true;
        this.monsterHealth = 100;
        this.userHealth = 100;
        this.counter = 0;
      },
      getUserDamage(){
        const monsterDamage = this.getRndInteger(8, 15)
        this.userHealth -= monsterDamage;
        this.counter++;
        this.addLogMessage('Monster', 'attacks and deals', monsterDamage);
      },
      getMonsterDamage(mini, maxi) {
        const userDamage = this.getRndInteger(mini, maxi);
        this.monsterHealth -= userDamage;
        this.counter++;
        this.addLogMessage('User', 'attacks and deals', userDamage);
      },
      getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      },
      userVictory() {
        this.buttonNewGame = true,
        this.message = 'You won!'
      },
      monsterVictory() {
        this.buttonNewGame = true,
        this.message = 'You lost!'
      },
      draw() {
        this.buttonNewGame = true;
        this.message = "It's a draw!"
      }
    }
  },
);
  
app.$mount('#game');