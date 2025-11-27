<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link
    v-else
    :to="disable ? '' : to"
    :class="[mode, { disable }]"
    @click.prevent="!disable ? '' : disable"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
button,
a {
  width: 35%;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #4F46E5;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #4338ca;
  color: white;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.disable {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.outline.controls-btn{
  width: 5rem;
}
.controls-btn{
  max-width: 9rem;
}

.card-btn,.flat{
  max-width: 100%;
  margin: .3rem;
  text-align: center;
}

.delete-btn{
  background-color: red;
}

.dropdown-link,
  .dropdown-btn {
    width: 100%;
    text-align: start;
    padding: 0.75rem 0.5rem;
    margin-right: 0rem;
    border-radius: 0.3rem;
    background: #fff;
    color: black;
    border:none;
  }

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #dfdbe2;
  color:black;
}

@media (max-width: 480px) {

a:hover,
button:hover,
.flat:hover,
.outline:hover{
background: transparent;
color: black;
}
}
@media (max-width: 640px) {
  button,
  a {
    width: 45%;
  }
  .card-btn, .flat{
  width: 12rem;
}
}
</style>
