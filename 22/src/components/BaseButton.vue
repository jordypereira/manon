<template functional>
  <button
    class="bg-pink text-white shadow-cyber-rotate-hover py-6 px-8 cursor-pointer"
    :class="[props.contentClasses, data.class, data.staticClass]"
    v-on="listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    contentClasses: {
      type: [String, Object]
    }
  }
};
</script>
