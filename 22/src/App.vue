<template>
  <div class="min-h-screen min-w-screen bg-cyber bg-scroll relative">
    <div class="container mx-auto text-center pt-8">
      <h1 class="text-shadow font-bold">Manon turns 22</h1>
      <h2 class="text-shadow">Celebrate by donating a kitty</h2>
      <div class="flex justify-between my-4 px-2 w-full max-h-64">
        <div class="w-24 md:w-32 h-auto">
          <img src="./assets/cyber-manon.png" alt="Cyber Girl" class="flip-x">
        </div>
        <div class="w-24 md:w-32 h-auto">
          <img src="./assets/cyber-manon.png" alt="Cyber Girl">
        </div>
      </div>
      <BaseButton @click="selectKitty()">Donate a kitty</BaseButton>
      <ZoomCenterTransition>
        <BaseModal
          v-if="showModal"
          @click="showModal = !showModal"
          content-classes="mx-auto flex flex-wrap justify-around"
        >
          <BasePicture
            @click="selectedKitty(item.url)"
            v-for="item in selectImages"
            :key="item.id"
            content-classes="flex items-center justify-center m-4 cursor-pointer shadow-cyber-rotate"
          >
            <img :src="item.url" alt="Cat Image" class="max-w-full max-h-full">
          </BasePicture>
        </BaseModal>
      </ZoomCenterTransition>
      <h2 class="my-4 text-shadow">Kitty Leaderbord</h2>
      <div class="mx-auto flex flex-wrap justify-around">
        <div 
          class="flex flex-col items-center"
          v-for="item in Object.keys(donatedImages)"
          :key="item"
        >
          <h3 class="text-shadow">{{ donatedImages[item] }}</h3>
          <BasePicture
            content-classes="flex items-center justify-center m-4 shadow-cyber"
          >
            <img :src="item" alt="Cat Image" class="max-w-full max-h-full">
          </BasePicture>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { ZoomCenterTransition } from "vue2-transitions";
import axios from "axios";
import BaseButton from "./components/BaseButton.vue";
import BaseModal from "./components/BaseModal.vue";
import BasePicture from "./components/BasePicture.vue";

export default Vue.extend({
  name: "app",
  components: {
    BaseButton,
    BaseModal,
    BasePicture,
    ZoomCenterTransition
  },
  data() {
    return {
      showModal: false,
      catApi: process.env.CAT_API,
      selectAmount: 6,
      selectImages: [],
      donatedImages: {}
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
      this.showModal = true;
      try {
        this.selectImages = await this.loadImages();
      } catch (err) {
        this.showModal = false;
        console.log(err);
      }
    },
    selectedKitty(url) {
      this.showModal = false;
      if (Object.keys(this.donatedImages).includes(url)) {
        this.donatedImages[url] = this.donatedImages[url] + 1;
      } else {
        this.donatedImages[url] = 1;
      }
    }
  }
});
</script>
