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

  .button
    button()
    width fit-content
</style>

<template>
  <div class="root-page">
    <header>Выберите тип сечения звеньев</header>
    <div class="cards-container">

      <article class="card" @click="selectModification(CrossSectionTypes.circleHollow)">
        <header>Трубки (рекомендуется)</header>
        <img src="/static/images/pipe.png" alt="">
      </article>

      <article class="card" @click="selectModification(CrossSectionTypes.circle)">
        <header>Круглые стержни</header>
        <img src="/static/images/circle.png" alt="">
      </article>

      <article class="card" @click="selectModification(CrossSectionTypes.rectangleHollow)">
        <header>Прямоугольные полые стержни</header>
        <img src="/static/images/rectangleHollow.png" alt="">
      </article>

      <article class="card" @click="selectModification(CrossSectionTypes.rectangle)">
        <header>Прямоугольные стержни</header>
        <img src="/static/images/rectangle.png" alt="">
      </article>
    </div>

    <router-link :to="{name: 'trajectories'}" class="button">Назад</router-link>
  </div>
</template>

<script lang="ts">
import {CrossSectionTypes, CrossSectionType, StepsNames} from "~/constants";

export default {
  components: {},

  data() {
    return {
      CrossSectionTypes,
    };
  },

  mounted() {
    this.$store.dispatch('SET_STATE',{step: StepsNames.crossSections});
  },

  methods: {
    selectModification(conn: CrossSectionType) {
      this.$store.dispatch('SET_STATE', {crossSectionsType: conn});
      this.$router.push({name: 'materials'});
    }
  },
};
</script>
