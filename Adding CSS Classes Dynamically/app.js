const app = Vue.createApp({
    data() {
        return {
            boxASelected: false,
            boxBSelected: false,
            boxCSelected: false,
        };
    },
    methods: {
        toggleBox(index) {
            index === 0
                ? (this.boxASelected = !this.boxASelected)
                : index === 1
                ? (this.boxBSelected = !this.boxBSelected)
                : index === 2
                ? (this.boxCSelected = !this.boxCSelected)
                : null;
        },
    },
});

app.mount("#styling");
