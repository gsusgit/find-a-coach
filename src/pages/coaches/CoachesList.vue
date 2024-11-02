<template>
  <div>
    <base-dialog :show="!!error" title="Error fetching" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section v-if="isLoading">
      <base-spinner></base-spinner>
    </section>
    <div v-else>
      <section>
        <coach-filter @update-coaches-list="updateCoachesList"></coach-filter>
      </section>
      <section>
        <base-card>
          <div class="controls">
            <base-button mode="outline" @click="loadCoaches(true)"
              >Refresh</base-button
            >
            <base-button v-if="!isCoach" link to="/register"
              >Register as Coach</base-button
            >
          </div>
          <ul v-if="hasCoaches">
            <coach-item
              v-for="coach in filteredCoaches"
              :key="coach.id"
              :id="coach.id"
              :first-name="coach.firstName"
              :last-name="coach.lastName"
              :rate="coach.hourlyRate"
              :areas="coach.areas"
            >
            </coach-item>
          </ul>
          <h3 v-else>No coaches found</h3>
        </base-card>
      </section>
    </div>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'

export default {
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        careers: true
      },
      isLoading: false,
      error: null
    }
  },
  components: {
    CoachItem,
    CoachFilter
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches']
      return coaches.filter((coach) =>
        coach.areas.some((area) => this.activeFilters[area] === true)
      )
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches']
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    }
  },
  methods: {
    updateCoachesList(updatedFilters) {
      this.activeFilters = updatedFilters
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceUpdate: refresh
        })
      } catch (error) {
        this.error = error.message || 'Something went wrong'
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
    }
  },
  created() {
    this.loadCoaches()
  }
}
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
