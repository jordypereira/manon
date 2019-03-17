<template functional> 
  <div class="w-24 h-24 bg-pink" :class="props.contentClasses" v-on="listeners">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BasePicture",
  props: {
    contentClasses: {
      type: String,
      default: ""
    }
  }
};
</script>
