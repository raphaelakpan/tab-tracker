<template>
  <v-layout column>
    <v-flex class="form">
      <div class="white elevation-2">
        <v-toolbar flat dense class="teal white--text">
          <v-toolbar-title>Create a new Account </v-toolbar-title>
        </v-toolbar>
        <div style="padding: 10px">
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
            <v-text-field
              label="Confirm Password"
              v-model="user.confirmPassword"
              :rules="confirmPasswordRules"
              type="password"
              required
            ></v-text-field>
            <p v-show="user.confirmPassword && confirmedPassword" class="red--text" >
              Passwords do not match!
            </p>
            <div class="form-group">
              <v-btn class="teal white--text" @click="register">Register</v-btn>
              <v-btn class="orange darken-4 white--text" @click="reset">Clear</v-btn>
            </div>
            <p class="teal--text"> {{ message }} <p>
            <p
              v-for="(error, index) in serverErrors"
              :key="index"
              class="red--text">
              {{ error }}
            </p>
          </v-form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  /* eslint-disable no-useless-escape */

  import Authentication from '@/services/Authentication'

  export default {
    $validates: true,
    data () {
      return {
        user: {
          email: '',
          password: '',
          confirmPassword: ''
        },
        serverErrors: [],
        message: '',
        valid: false,
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => v && v.length >= 8 || 'Password must be at least 8 characters'
        ],
        confirmPasswordRules: [
          (v) => !!v || 'Confirm Password is required',
          (v) => v && v.length >= 8 || 'Confirm Password must be at least 8 characters',
          (v) => this.user.password === this.user.confirmPassword || ''
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      register () {
        this.valid = this.$refs.form.validate()
        if (!this.valid) {
          this.message = ''
          return
        }
        Authentication.register({
          email: this.user.email,
          password: this.user.password
        }).then(response => {
          this.message = response.data.message
          this.serverErrors = []
          this.$refs.form.reset()
        }).catch(error => {
          this.serverErrors = error.response.data.errors
          this.message = ''
        })
      },
      reset () {
        this.$refs.form.reset()
      }
    },
    computed: {
      confirmedPassword () {
        return this.user.password !== this.user.confirmPassword
      }
    }
  }
</script>

<style scoped>
  .form {
    margin: 0 auto;
    width: 30%;
  }
</style>
