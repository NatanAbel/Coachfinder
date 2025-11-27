<template>
    <base-card class="filters-card">
  <h2 class="filters-title">Find Your Coach</h2>

  <div class="filters-group">
    <label class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter">
      <span>Frontend</span>
    </label>

    <label class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter">
      <span>Backend</span>
    </label>

    <label class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter">
      <span>Career</span>
    </label>
  </div>
</base-card>
</template>

<script>

export default ({
    emits:['coach-filter'],
    data() {
        return{
            filters:{
                frontend: true,
                backend: true,
                career: true,
            }
        }
    },
    methods:{
        setFilter(event){
            const inputId = event.target.id
            const isActive = event.target.checked
            
            const updatedFilters = {
                ...this.filters,
                [inputId] : isActive
            }
            this.filters = updatedFilters

            this.$emit('coach-filter', updatedFilters)
        }
    }
})
</script>

<style scoped>

 .filters-card {
  padding: clamp(1rem, 3vw, 1.75rem);
}

.filters-title {
  margin-bottom: 1rem;
  font-size: clamp(1.3rem, 4vw, 1.8rem);
  text-align: center;
  font-weight: 700;
}

.filters-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  justify-content: center;
}

/* Custom checkboxes */
.filter-option {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.75rem;
  border-radius: 1rem;
  background-color: rgba(0,0,0,0.06);
  transition: background-color 0.2s ease, transform 0.1s;
}

.filter-option input {
  accent-color: #6a00c8; /* purple brand checkbox */
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.filter-option span {
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  cursor: pointer;
}

/* Active visual state when checked */
.filter-option input:checked + span {
  font-weight: 600;
  color: #4a008a;
}

/* Mobile refinements */
@media (max-width: 480px) {
  .filters-group {
    justify-content: start;
  }
}

</style>