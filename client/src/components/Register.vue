<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <input type="email" placeholder="Email" name="email" v-model="email">
      </div>
      <div class="form-group">
        <input type="password" placeholder="Password" name="password" v-model="password">
      </div>
      <div class="form-group">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
  import Authentication from '@/services/Authentication'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async register () {
        const response = await Authentication.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      }
    }
  }
</script>

