<script>
export default {
  name: "TheCustomizer",
  data() {
    return {
      theme: localStorage.getItem("theme") || "light",
      font: localStorage.getItem("font") || "medium",
    };
  },
  methods: {
    handleChange(value, key) {
      this[key] = value;
      // local storage is to keep the theme after page reloads
      localStorage.setItem(key, value);
      // attribute change is for immediate css change
      document.documentElement.setAttribute(key, value);
      // global event to make reactive changes to the dom (change logo)
      this.emitter.emit(key, value);
    },
  },
};
</script>

<template>
  <div class="customizer">
    <h1 data-testid="customizer-header">Customizer</h1>
    <h3 data-testid="customizer-label">You can customise a look of the application here</h3>
    <div class="customizer__section mt-1">
      <div class="customizer__label" data-testid="theme-label"><label>Select theme</label></div>
      <a-select
        class="customizer__select"
        data-testid="theme-select"
        :value="theme"
        @change="(value) => handleChange(value, 'theme')"
      >
        <a-select-option value="light">Light</a-select-option>
        <a-select-option value="dark">Dark</a-select-option>
      </a-select>
    </div>

    <div class="customizer__section">
      <div class="customizer__label"  data-testid="font-label"><label>Select font-size</label></div>
      <a-select
        class="customizer__select"
        data-testid="font-select"
        :value="font"
        @change="(value) => handleChange(value, 'font')"
      >
        <a-select-option value="small">Small</a-select-option>
        <a-select-option value="medium">Medium</a-select-option>
        <a-select-option value="large">Large</a-select-option>
        <a-select-option value="extra-large">Extra Large</a-select-option>
      </a-select>
    </div>

    <!-- todo: we could customize font-family, layout, table columns, etc... -->
  </div>
</template>

<style scoped>
.customizer__section {
  margin-bottom: 1rem;
}

.customizer__label {
  margin-bottom: 0.25rem;
}

.customizer__select {
  width: 12rem;
}
</style>
