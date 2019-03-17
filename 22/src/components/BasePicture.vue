<template functional>
  <div class="w-24 h-24 bg-pink" :class="props.contentClasses" v-on="listeners">
    <slot>
      <img :src="props.imageUrl" alt="Cat Image" class="max-w-full max-h-full" />
    </slot>
    
  </div>
</template>

<script>
export default {
  name: "BasePicture",
  props: {
    contentClasses: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  }
};
</script>
