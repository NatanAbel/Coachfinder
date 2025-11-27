<template>
  <div class="title-wrapper">
    <slot>
      <h2>{{ title }}</h2>
    </slot>
  </div>
</template>

<script>
export default {
    props:['title'],
}
</script>

<style scoped>
.title-wrapper {
  max-width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
}

h2 {
  width: fit-content;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.135);
  border-radius: 0.7rem;
  opacity: 0.7;
  margin: 0.5rem;
}
</style>
