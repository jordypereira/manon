<template>
  <section>
    <div class="mx-auto flex flex-wrap justify-around">
      <a
        :href="item.url"
        class="flex flex-col items-center relative"
        v-for="item in items"
        :key="item.url"
        rel="noopener"
        target="_blank"
      >
        <div v-if="item.type === 'original'" class="original-kitty" id="star-five"></div>
        <BasePicture
          class="flex items-center justify-center m-4 shadow-cyber-rotate-hover md:w-32 md:h-32 lg:w-48 lg:h-48"
          :imageUrl="item.url"
        ></BasePicture>
      </a>
    </div>
  </section>
</template>

<script>
import BasePicture from "./BasePicture.vue";

export default {
  props: {
    items: {
      type: Array
    }
  },
  components: {
    BasePicture
  }
};
</script>

<style></style>
