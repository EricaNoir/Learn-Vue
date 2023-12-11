function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            isPlayerWin: false,
            isMonsterWin: false,
            round: 0,
            log: [],
        };
    },
    methods: {
        addLog(who, action, amount) {
            this.log.unshift({
                actionBy: who,
                actionType: action,
                actionValue: amount,
            });
        },
        playerAttack() {
            const dmg = getRandom(5, 12);
            this.monsterHealth -= dmg;
            this.monsterAttack();
            this.round += 1;
            this.addLog("Player", "attacked", dmg);
        },
        monsterAttack() {
            const dmg = getRandom(8, 15);
            this.playerHealth -= dmg;
            this.addLog("Monster", "attacked", dmg);
        },
        playerSpecialAttack() {
            const dmg = getRandom(10, 25);
            this.monsterHealth -= dmg;
            this.monsterAttack();
            this.round += 1;
            this.addLog("Player", "attacked", dmg);
        },
        playerHeal() {
            const heal = getRandom(1, 5);
            const realHeal =
                this.playerHealth + heal < 100 ? heal : 100 - this.playerHealth;
            this.playerHealth = this.playerHealth + realHeal;
            this.round += 1;
            this.addLog("Player", "healed", realHeal);
        },
        surrender() {
            this.isMonsterWin = true;
        },
        reset() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.isPlayerWin = false;
            this.isMonsterWin = false;
            this.round = 0;
            this.log = [];
        },
        logContent(l, i) {
            const curRound = Math.floor(i / 2 + 1);
            return `Round ${curRound}: ${l}`;
        },
    },
    computed: {
        monsterBarStyle() {
            return {
                width: this.monsterHealth > 0 ? this.monsterHealth + "%" : 0,
            };
        },
        playerBarStyle() {
            return {
                width: this.playerHealth > 0 ? this.playerHealth + "%" : 0,
            };
        },
        canUseSpecialAttack() {
            return this.round % 3 !== 0;
        },
        winOrNot() {
            return this.isMonsterWin || this.isPlayerWin;
        },
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.isPlayerWin = true;
                this.isMonsterWin = true;
            } else if (value <= 0) {
                this.isMonsterWin = true;
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.isMonsterWin = true;
                this.isPlayerWin = true;
            } else if (value <= 0) {
                this.isPlayerWin = true;
            }
        },
    },
});

app.mount("#game");
