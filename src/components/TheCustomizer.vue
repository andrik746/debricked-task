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
      // we use global event instead of global state (vuex) because our app is small
      // and this is the only place where we need to pass data like this
    },
  },
};
</script>

<template>
  <div class="customizer">
    <h1>Customizer</h1>
    <h3>You can customise the look of the application here</h3>
    <div class="customizer__section mt-1">
      <div class="customizer__label"><label>Select theme</label></div>
      <a-select
        class="customizer__select"
        :value="theme"
        @change="(value) => handleChange(value, 'theme')"
      >
        <a-select-option value="light">Light</a-select-option>
        <a-select-option value="dark">Dark</a-select-option>
      </a-select>
    </div>

    <div class="customizer__section">
      <div class="customizer__label"><label>Select font-size</label></div>
      <a-select
        class="customizer__select"
        :value="font"
        @change="(value) => handleChange(value, 'font')"
      >
        <a-select-option value="small">Small</a-select-option>
        <a-select-option value="medium">Medium</a-select-option>
        <a-select-option value="large">Large</a-select-option>
        <a-select-option value="extra-large">Extra Large</a-select-option>
      </a-select>
    </div>
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
