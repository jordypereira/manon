<template>
  <div class="min-h-screen min-w-screen gradient-dotted bg-cyber relative">
    <div class="container mx-auto text-center pt-8">
      <h1 class="text-shadow font-bold">Manon turns 22</h1>
      <h2 class="text-shadow">Celebrate by donating a kitty</h2>
      <div class="flex justify-between mt-4 px-2">
        <img src="./assets/cyber-girl.png" alt="Cyber Girl">
        <img src="./assets/cyber-girl.png" alt="Cyber Girl">
      </div>
      <BaseButton @click="toggleModal = !toggleModal" class="mt-4">Donate a kitty</BaseButton>  
      <BaseModal v-if="toggleModal" @click="toggleModal = !toggleModal" content-classes="mx-auto flex flex-wrap justify-around">
        <BasePicture v-for="item in 6" :key="item" class="m-4"></BasePicture>
      </BaseModal>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseButton from './components/BaseButton.vue';
import BaseModal from './components/BaseModal.vue';
import BasePicture from './components/BasePicture.vue';

export default Vue.extend({
  name: 'app',
  components: {
    BaseButton,
    BaseModal,
    BasePicture,
  },
  data() { 
    return {
      toggleModal: false,
  }
  }
});
</script>

<style lang="less">
</style>
