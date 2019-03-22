<template functional>
  <div
    class="absolute bg-pink-50 pin h-screen w-screen flex justify-center items-center z-50"
    :style="{ top: props.top }"
    @click.self="listeners.click"
  >
    <div
      class="bg-white opacity-100 shadow-cyber w-4/5"
      :class="[props.contentClasses, data.class, data.staticClass]"
    >
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
    },
    top: {
      type: String,
      default: "0px"
    }
  }
};
</script>
