<template>
  <button class="bg-pink text-white shadow-cyber py-4 px-4 rounded cursor-pointer" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
}
</script>

<style>

</style>
