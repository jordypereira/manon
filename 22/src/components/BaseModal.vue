<template functional>
  <div
    class="absolute bg-pink-50 pin h-full w-full flex justify-center items-center"
    @click.self="listeners.click"
  >
    <div class="bg-white opacity-100 shadow-cyber w-4/5 h-3/5" :class="props.contentClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    contentClasses: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
</style>