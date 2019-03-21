<template>
  <div
    class="min-h-screen min-w-screen bg-cyber bg-scroll relative"
    :class="{ pyro: celebrate }"
  >
    <div class="before"></div>
    <div class="after"></div>
    <div class="container mx-auto text-center pt-8">
      <h1
        class="text-shadow font-bold text-white"
        :class="{ 'celebrate-rotate': celebrate }"
      >
        Manon turns 22
      </h1>
      <h2 class="text-shadow mt-4 text-white" :class="{ 'celebrate-rotate': celebrate }">
        Celebrate by donating a kitty
      </h2>
      <div class="flex justify-around my-4 px-2 w-full max-h-64">
        <div class="w-12 md:w-20 h-auto">
          <picture>
            <source
              srcset="https://res.cloudinary.com/perjor/image/upload/v1553210648/cyber-manon.webp"
              type="image/webp"
              class="flip-x"
              :class="{ 'celebrate-walk': celebrate }"
            />
            <source
              srcset="https://res.cloudinary.com/perjor/image/upload/v1553210648/cyber-manon.png"
              type="image/png"
              class="flip-x"
              :class="{ 'celebrate-walk': celebrate }"
            />
            <img
              src="./assets/images/cyber-manon.png"
              alt="Cyber Girl"
              class="flip-x"
              :class="{ 'celebrate-walk': celebrate }"
            />
          </picture>
        </div>
        <BaseButton
          @click="openModal()"
          class="self-center mx-4"
          :class="{ 'shadow-cyber-rotate': celebrate }"
          >Donate a kitty</BaseButton
        >
        <div class="w-12 md:w-20 h-auto">
          <picture>
            <source
              srcset="https://res.cloudinary.com/perjor/image/upload/v1553210648/cyber-manon.webp"
              type="image/webp"
              :class="{ 'celebrate-walk': celebrate }"
            />
            <source
              srcset="https://res.cloudinary.com/perjor/image/upload/v1553210648/cyber-manon.png"
              type="image/png"
              :class="{ 'celebrate-walk': celebrate }"
            />
            <img
              src="./assets/images/cyber-manon.png"
              alt="Cyber Girl"
              :class="{ 'celebrate-walk-reverse': celebrate }"
            />
          </picture>
        </div>
      </div>
      <ZoomCenterTransition>
        <BaseModal
          v-if="showModal"
          @click.self="closeModal()"
          class="py-4 mx-auto flex flex-col items-center gradient-dotted"
          :top="getDocTop()"
        >
          <h3 class="text-shadow mx-2">
            Upload your kitty and make Manon proud!
          </h3>
          <form @submit="uploadKitty()" enctype="multipart/form-data">
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />
          </form>
          <BaseButton
            class="my-4"
            @click="pickFile"
            :class="{ 'shadow-cyber-rotate': uploading }"
            >{{
              uploading ? "Bringing kitty to Manon.." : "Choose a kitty"
            }}</BaseButton
          >
          <p v-if="error_message" class="text-shadow shadow-cyber-rotate my-4">
            {{ error_message }}
          </p>

          <template v-if="!uploading">
            <h3 class="mt-8 text-shadow">Or choose a random kitty</h3>
            <div class="flex flex-wrap justify-around">
              <template v-for="item in selectImages">
                <BasePicture
                  v-if="item.url"
                  @click="addKitty(item.id, item.url)"
                  :key="item.id"
                  class="flex items-center justify-center m-4 cursor-pointer shadow-cyber-rotate-hover"
                  :imageUrl="item.url"
                ></BasePicture>
              </template>
            </div>
          </template>
        </BaseModal>
      </ZoomCenterTransition>
      <DonatedWall :items="donatedImages" />
      <div
        v-if="celebrate && lastSelectedKittyUrl"
        class="absolute pin h-screen w-screen flex justify-center items-center celebrate-growAndRotate"
      >
        <BasePicture
          class="flex items-center justify-center shadow-cyber-rotate-hover"
          :imageUrl="lastSelectedKittyUrl"
        ></BasePicture>
      </div>
      <TheFooter class="text-shadow"></TheFooter>
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
import DonatedWall from "./components/DonatedWall.vue";
import TheFooter from "./components/TheFooter.vue";
import randomSound from "./assets/js/randomCatSound";

export default Vue.extend({
  name: "app",
  components: {
    BaseButton,
    BaseModal,
    BasePicture,
    ZoomCenterTransition,
    DonatedWall,
    TheFooter
  },
  data() {
    return {
      catApi: process.env.VUE_APP_CAT_API_KEY,
      showModal: false,
      selectAmount: 6,
      selectImages: [],
      donatedImages: [],
      celebrate: false,
      celebrationTime: 4000,
      image_name: "",
      image_file: "",
      image_url: "",
      uploading: false,
      uploaded_image: {},
      error_message: null,
      lastSelectedKittyUrl: ""
    };
  },

  async created() {
    this.selectImages = await this.loadImages();
    this.preloadImages();
  },

  firestore() {
    return {
      donatedImages: db.collection("kitties").orderBy("created", "desc")
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
      this.error_message = "";
    },
    addKitty(id, url) {
      this.$ga.event("Donations", "Any Kitty", url);
      this.playCelebration();
      this.closeModal();
      const kittyInDB = this.donatedImages.find(kitty => kitty.url === url);
      if (kittyInDB === undefined) {
        const timestamp = new Date();
        db.collection("kitties")
          .doc(id)
          .set({ url, created: timestamp });
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
      }, this.celebrationTime);
    },
    stopCelebration() {
      this.celebrate = false;
      clearTimeout(this.celebrateTimeout);
      this.uploaded_image = {};
      this.lastSelectedKittyUrl = "";
    },
    preloadLastKitty(url) {
      this.lastSelectedKittyUrl = url;
      const image = new Image();
      image.src = url;
    },
    pickFile() {
      this.error_message = null;
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.image_name = files[0].name;
        if (this.image_name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.preloadLastKitty(fr.result);
          this.image_url = fr.result;
          this.image_file = files[0];
          this.uploadFile();
        });
      } else {
        this.image_name = "";
        this.image_file = "";
        this.image_url = "";
      }
    },
    async uploadFile() {
      this.uploading = true;
      let formData = new FormData();
      formData.append("file", this.image_file);

      try {
        axios.defaults.headers.common["x-api-key"] = this.catApi;
        let response = await axios.post(
          "https://api.thecatapi.com/v1/images/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.uploaded_image = response.data;
        this.uploading = false;
        this.image_file = null;
        this.addKitty(response.data.id, response.data.url);
        this.$ga.event("Upload", "Custom Kitty", response.data.url);
      } catch (error) {
        this.error_message = error.response.data.message;
        this.uploading = false;
        this.image_file = null;
        this.stopCelebration();
      }
    },
    track() {
      this.$ga.page('/');
    },
  }
});
</script>
