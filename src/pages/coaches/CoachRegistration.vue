<template>
  <base-dialog :show="!!error" title="Error saving" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @add-coach="addCoach"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'

export default {
  data() {
    return {
      error: null
    }
  },
  components: {
    CoachForm
  },
  methods: {
    async addCoach(data) {
      try {
        await this.$store.dispatch('coaches/addCoach', data)
        await this.$router.replace('/coaches')
      } catch (error) {
        this.error = error || 'Something went wrong'
      }
    },
    handleError() {
      this.error = null
    }
  }
};
</script>
