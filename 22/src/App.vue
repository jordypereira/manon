<template>
  <div class="min-h-screen min-w-screen bg-cyber bg-scroll relative">
    <div class="container mx-auto text-center pt-8">
      <h1 class="text-shadow font-bold">Manon turns 22</h1>
      <h2 class="text-shadow">Celebrate by donating a kitty</h2>
      <div class="flex justify-between my-4 px-2">
        <img src="./assets/cyber-girl.png" alt="Cyber Girl">
        <img src="./assets/cyber-girl.png" alt="Cyber Girl">
      </div>
      <BaseButton @click="selectKitty()">Donate a kitty</BaseButton>
      <BaseModal
        v-if="toggleModal"
        @click="toggleModal = !toggleModal"
        content-classes="mx-auto flex flex-wrap justify-around"
      >
        <BasePicture v-for="item in selectAmount" :key="item" class="m-4"></BasePicture>
      </BaseModal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import BaseButton from "./components/BaseButton.vue";
import BaseModal from "./components/BaseModal.vue";
import BasePicture from "./components/BasePicture.vue";

export default Vue.extend({
  name: "app",
  components: {
    BaseButton,
    BaseModal,
    BasePicture
  },
  data() {
    return {
      toggleModal: false,
      catApi: process.env.CAT_API,
      selectAmount: 6
    };
  },

  methods: {
    async loadImages() {
      try {
        axios.defaults.headers.common["x-api-key"] = this.catApi;
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search",
          { params: { limit: this.selectAmount, size: "thumb" } }
        );

        return response.data;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    async selectKitty() {
      this.toggleModal = true;
      try {
        const images = await this.loadImages;
        console.log(images);
      } catch (err) {
        console.log(err);
      }
    }
  }
});
</script>

<style lang="less">
</style>
