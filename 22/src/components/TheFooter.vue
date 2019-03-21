<template>
  <footer class="w-full flex justify-center py-3">
    <p class="mx-2 flex justify-center flex-wrap">
      Follow me on
      <a
        v-for="link in links"
        :key="link.id"
        :href="link.url"
        rel="noopener"
        target="_blank"
        class="no-underline hover:text-brand transition-1 px-1"
        :class="`text-${link.color}`"
      >{{ link.name }}</a>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      links: [
        {
          id: 1,
          name: 'Twitter',
          url: 'https://twitter.com/_perjor',
          color: 'blue-light',
        },
        {
          id: 2,
          name: 'Instagram',
          url: 'https://instagram.com/jordy_pereira',
          color: 'pink-light',
        },
        {
          id: 3,
          name: 'Github',
          url: 'https://github.com/perjor',
          color: 'white',
        },
      ],
    };
  },
}
</script>
