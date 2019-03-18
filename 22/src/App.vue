<template>
  <div class="min-h-screen min-w-screen bg-cyber bg-scroll relative">
    <div class="container mx-auto text-center pt-8">
      <h1 class="text-shadow font-bold">Manon turns 22</h1>
      <h2 class="text-shadow">Celebrate by donating a kitty</h2>
      <div class="flex justify-between my-4 px-2 w-full max-h-64">
        <div class="w-24 md:w-32 h-auto">
          <img
            src="./assets/cyber-manon.png"
            alt="Cyber Girl"
            class="flip-x"
            :class="{'celebrate-walk': celebrate}"
          >
        </div>
        <div class="w-24 md:w-32 h-auto">
          <img
            src="./assets/cyber-manon.png"
            alt="Cyber Girl"
            :class="{'celebrate-walk-reverse': celebrate}"
          >
        </div>
      </div>
      <BaseButton @click="openModal()"
            :contentClasses="{'shadow-cyber-rotate': celebrate}">Donate a kitty</BaseButton>
      <ZoomCenterTransition>
        <BaseModal
          v-if="showModal"
          @click.self="closeModal()"
          content-classes="mx-auto flex flex-wrap justify-around gradient-dotted"
          :top="getDocTop()"
        >
          <!-- <h3 class="text-shadow">Upload your kitty and make Manon proud!</h3>
          <form @submit="uploadKitty()" enctype="multipart/form-data">
            <input type="file" name="kitty" id="kitty">
          </form> -->
          <BasePicture
            @click="selectedKitty(item.id, item.url)"
            v-for="item in selectImages"
            :key="item.id"
            content-classes="flex items-center justify-center m-4 cursor-pointer shadow-cyber-rotate-hover"
            :imageUrl="item.url"
          ></BasePicture>
        </BaseModal>
      </ZoomCenterTransition>
      <h2 class="my-8 text-shadow">Kitty Leaderbord</h2>
      <div class="mx-auto flex flex-wrap justify-around">
        <div class="flex flex-col items-center" v-for="item in donatedImages" :key="item.url">
          <h3 class="text-shadow">{{ item.score }}</h3>
          <BasePicture
            content-classes="flex items-center justify-center m-4 shadow-cyber"
            :imageUrl="item.url"
          ></BasePicture>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { db } from "./main";
import { ZoomCenterTransition } from "vue2-transitions";
import axios from "axios";
import BaseButton from "./components/BaseButton.vue";
import BaseModal from "./components/BaseModal.vue";
import BasePicture from "./components/BasePicture.vue";
import randomSound from './assets/js/randomCatSound';

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
      catApi: process.env.VUE_APP_CAT_API_KEY,
      showModal: false,
      selectAmount: 6,
      selectImages: [],
      donatedImages: [],
      celebrate: false
    };
  },

  async created() {
    this.selectImages = await this.loadImages();
    this.preloadImages();
  },

  firestore() {
    return {
      donatedImages: db.collection("kitties").orderBy("score", "desc").limit(10)
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
    openModal() {
      this.showModal = true;
      this.stopCelebration();
    },
    preloadImages() {
      this.selectImages.forEach(img => {
        const image = new Image();
        image.src = img.url;
      });
    },
    async closeModal() {
      this.showModal = false;
      try {
        this.selectImages = await this.loadImages();
        this.preloadImages();
      } catch (err) {
        this.showModal = false;
        console.log(err);
      }
    },
    selectedKitty(id, url) {
      this.playCelebration();
      this.closeModal();
      const kittyInDB = this.donatedImages.find(kitty => kitty.url === url);
      if (kittyInDB !== undefined) {
        db.collection("kitties")
          .doc(id)
          .update({ score: kittyInDB.score + 1 });
      } else {
        db.collection("kitties")
          .doc(id)
          .set({ url, score: 1 });
      }
    },
    getDocTop() {
      return Math.abs(document.body.getBoundingClientRect().top) + "px";
    },
    async playCelebration() {
      this.celebrate = true;
      const sound = await randomSound();
      sound.play();
      this.celebrateTimeout = setTimeout(() => {
        this.celebrate = false;
      }, 2000);
    },
    stopCelebration() {
      this.celebrate = false;
      clearTimeout(this.celebrateTimeout);
    },
    // async uploadKitty() {
    //   try {
    //     axios.defaults.headers.common["x-api-key"] = this.catApi;
    //     const response = await axios.post(
    //       "https://api.thecatapi.com/v1/images/search",
    //       { params: { limit: this.selectAmount, size: "thumb", category_ids: [5, 2, 1, 15] } }
    //     );

    //     return response.data;
    //   } catch (err) {
    //     console.log(err);
    //     return err;
    //   }
    // },
  }
});
</script>
