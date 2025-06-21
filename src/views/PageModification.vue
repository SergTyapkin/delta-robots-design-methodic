<style scoped lang="stylus">
@import '../styles/constants.styl'
@import '../styles/components.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'
@import '../styles/scrollbars.styl'

.root-page
  padding 20px
  header
    font-large()

  .cards-container
    cards-container()
</style>

<template>
  <div class="root-page">
    <header>Выберите модификацию дельта-робота</header>
    <div class="cards-container">

      <article class="card" @click="selectModification(Modifications.default)">
        <header>Классический</header>
        <img src="/static/images/modificationDefault.png" alt="">
      </article>

      <article class="card" @click="selectModification(Modifications.rotating)">
        <header>С поворотом схвата</header>
        <img src="/static/images/modificationRotating.png" alt="">
      </article>

      <article class="card disabled" @click="selectModification(Modifications.linear)">
        <header>С линейными приводами</header>
        <img src="/static/images/modificationLinear.png" alt="">
      </article>

    </div>
  </div>
</template>

<script lang="ts">
import {Modification, Modifications} from "~/constants";

export default {
  components: {},

  data() {
    return {
      Modifications,
    };
  },

  mounted() {
    window.onbeforeunload = () => true;
  },

  methods: {
    selectModification(mod: Modification) {
      this.$store.dispatch('SET_STATE', {modification: mod});
      this.$router.push({name: 'connections'});
    }
  },
};
</script>
