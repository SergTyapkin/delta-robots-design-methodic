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
    <header>Выберите тип используемых соединений</header>
    <div class="cards-container">

      <article class="card" @click="selectModification(ConnectionTypes.bearings)">
        <header>Подшипники</header>
        <img src="/static/images/bearings.png" alt="">
      </article>

      <article class="card" @click="selectModification(ConnectionTypes.balls)">
        <header>Шарниры</header>
        <img src="/static/images/balls.png" alt="">
      </article>
    </div>

    <router-link :to="{name: 'modification'}" class="button">Назад</router-link>
  </div>
</template>

<script lang="ts">
import {ConnectionTypes, ConnectionType, StepsNames} from "~/constants";

export default {
  components: {},

  data() {
    return {
      ConnectionTypes,
    };
  },

  mounted() {},

  methods: {
    selectModification(conn: ConnectionType) {
      this.$store.dispatch('SET_STATE', {connectionsType: conn, step: StepsNames.specialization});
      this.$router.push({name: 'specialization'});
    }
  },
};
</script>
