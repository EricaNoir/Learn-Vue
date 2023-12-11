const app = Vue.createApp({
    data() {
        return { counter: 0 };
    },
    computed: {
        showText() {
            return this.counter < 37
                ? "Not there yet"
                : this.counter === 37
                ? this.counter
                : "Too much!";
        },
    },
    watch: {
        showText() {
            const that = this;
            setTimeout(() => {
                that.counter = 0;
            }, 5000);
        },
    },
    methods: {
        addNumber(value) {
            this.counter += value;
        },
    },
});

app.mount("#events");
