<template>
  <base-dialog :show="!!error" title="Error fetching" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section v-if="isLoading">
    <base-spinner></base-spinner>
  </section>
  <section v-else>
    <base-card>
    <header>
      <h3>Received Requests</h3>
    </header>
    <ul v-if="hasRequests">
      <request-item
        v-for="request in receivedRequests"
        :key="request.id"
        :email="request.userEmail"
        :message="request.userMessage"
      ></request-item>
    </ul>
    <p v-else>You haven't received any request yet!</p>
  </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue'

export default {
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  components: {
    RequestItem
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests']
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests']
    }
  },
  methods: {
    async getRequests() {
      const coachId = this.$store.getters['userId']
      
      this.isLoading = true
      try {
        await this.$store.dispatch('requests/getRequests', coachId)
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
    this.getRequests()
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3, p {
  text-align: center;
}
</style>
