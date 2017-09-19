<template>
  <div class="form">
    <panel title="Log in to your Account">
      <v-form v-model="valid" ref="form">
        <v-text-field
          label="Email"
          v-model="user.email"
          :rules="emailRules"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="user.password"
          :rules="passwordRules"
          type="password"
          required
        ></v-text-field>
        <div class="form-group">
          <v-btn dark class="blue" @click="login">Log In</v-btn>
          <v-btn dark class="orange darken-4" @click="reset">Clear</v-btn>
        </div>
        <p>Don't have an account? <router-link to="register"> Sign Up </router-link> </p>
        <p class="blue--text"> {{ message }} <p>
        <p
          v-for="(error, index) in serverErrors"
          :key="index"
          class="red--text">
          {{ error }}
        </p>
      </v-form>
    </panel>
  </div>
</template>

<script>
  /* eslint-disable no-useless-escape */

  import Authentication from '@/services/Authentication'

  export default {
    data () {
      return {
        user: {
          email: '',
          password: ''
        },
        serverErrors: [],
        message: '',
        valid: false,
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => v && v.length >= 8 || 'Password must be at least 8 characters'
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      login () {
        this.valid = this.$refs.form.validate()
        if (!this.valid) {
          this.message = ''
          return
        }
        Authentication.login({
          email: this.user.email,
          password: this.user.password
        }).then(response => {
          this.message = response.data.message
          this.serverErrors = []
          this.$refs.form.reset()
          // Dispatch action to store user and token
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          // Redirect to songs page
          this.$router.push('songs')
        }).catch(error => {
          this.serverErrors = error.response.data.errors
          this.message = ''
        })
      },
      reset () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>

</style>
