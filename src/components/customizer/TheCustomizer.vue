<script>
export default {
  name: 'TheCustomizer',
  data () {
    return {
      theme: localStorage.getItem('theme') || 'light',
      font: localStorage.getItem('font') || 'medium'
    }
  },
  methods: {
    handleChange (value, key) {
      this[key] = value
      // local storage is to keep the theme after page reloads
      localStorage.setItem(key, value)
      // attribute change is for immediate css change
      document.documentElement.setAttribute(key, value)
      // global event to make reactive changes to the dom (change logo)
      this.emitter.emit(key, value)
    },

  }
}

</script>

<template>
  <div class="customizer--section">
    <div class="customizer--label"><label>Select theme</label></div>
    <a-select
      :value="theme"
      style="width: 120px"
      @change="(value) => handleChange(value, 'theme')"
    >
      <a-select-option value="light">Light</a-select-option>
      <a-select-option value="dark">Dark</a-select-option>
    </a-select>
  </div>

  <a-divider />

  <div class="customizer--section">
    <div class="customizer--label"><label>Select font-size</label></div>
    <a-select
      :value="font"
      style="width: 120px"
      @change="(value) => handleChange(value, 'font')"
    >
      <a-select-option value="small">Small</a-select-option>
      <a-select-option value="medium">Medium</a-select-option>
      <a-select-option value="large">Large</a-select-option>
      <a-select-option value="extra-large">Extra Large</a-select-option>
    </a-select>
  </div>
</template>

<style scoped>
.customizer--section {
  margin-bottom: 1rem;
}

.customizer--label {
  margin-bottom: 0.5rem;
}
</style>
