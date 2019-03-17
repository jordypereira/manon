<template functional>
  <button class="bg-pink text-white shadow-cyber py-6 px-8 rounded cursor-pointer" v-on="listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton"
};
</script>
