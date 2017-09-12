<template>
  <v-layout column>
    <v-flex class="panel">
      <div class="white elevation-2">
        <v-toolbar dense flat dark class="blue">
          <v-toolbar-title>{{ title }} </v-toolbar-title>
        </v-toolbar>
        <div style="padding: 10px">
          <slot>
            No slot provided
          </slot>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script>
