<template>
    <section>
        <CoachFilter @change-filter="setFilters"></CoachFilter>
    </section>

    <section>
        <BaseCard>
            <div class="controls">
                <BaseButton mode="outline">Refresh</BaseButton>
                <BaseButton link to="register" v-if="!isCoach">
                    Register as Coach
                </BaseButton>
            </div>
            <ul v-if="hasCoaches">
                <CoachItem
                    v-for="coach in filteredCoaches"
                    :key="coach.id"
                    :id="coach.id"
                    :firstName="coach.firstName"
                    :lastName="coach.lastName"
                    :rate="coach.hourlyRate"
                    :areas="coach.areas"
                ></CoachItem>
            </ul>
            <h3 v-else>NO COACHES FOUND.</h3>
        </BaseCard>
    </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
    components: {
        CoachItem,
        CoachFilter,
    },
    data() {
        return {
            activeFilters: {
                frondend: true,
                backend: true,
                career: true,
            },
        };
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters["coaches/coaches"];
            return coaches.filter((coach) => {
                if (
                    this.activeFilters.frontend &&
                    coach.areas.includes("frontend")
                ) {
                    return true;
                }
                if (
                    this.activeFilters.backend &&
                    coach.areas.includes("backend")
                ) {
                    return true;
                }
                if (
                    this.activeFilters.career &&
                    coach.areas.includes("career")
                ) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
            return this.$store.getters["coaches/hasCoaches"];
        },
        isCoach() {
            return this.$store.getters["coaches/isCoach"];
        },
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
    },
};
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>
