<template>
    <section>FILTER</section>
    <section>
        <div class="controls">
            <button>Refresh</button>
            <RouterLink to="register">Register as Coach</RouterLink>
        </div>
        <ul :if="hasCoaches">
            <li v-for="coach in filteredCoaches" :key="coach.id">
                {{ coach.firstName }}
            </li>
        </ul>

    </section>
</template>

<script>
export default {
    computed: {
        filteredCoaches() {
            return this.$store.getters["coaches/coaches"];
        },
        hasCoaches() {
            return this.$store.getters["coaches/hasCoaches"];
        },
    },
};
</script>
