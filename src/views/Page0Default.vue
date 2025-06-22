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
    margin-bottom 20px

  ul
    padding-left 20px

  .form
    form()
</style>

<template>
  <div class="root-page">
    <header>Этот сервис поможет расчитать дельта-робота</header>
    <p>
      Он может учитывать (но почти все параметры необязательны):
      <ul>
        <li>Размеры рабочей зоны</li>
        <li>Габариты</li>
        <li>Характерные траектории</li>
        <li>Материалы и сечения звеньев</li>
        <li>Грузоподъемность</li>
      </ul>
    </p>

    <div class="form">
      <button @click="submit">Начать</button>
    </div>
  </div>
</template>

<script lang="ts">
import {StepsNames} from "~/constants";

export default {
  components: {},
  data() {
    return {
    };
  },

  mounted() {},

  methods: {
    submit() {
      this.$store.dispatch('SET_STATE',{step: StepsNames.modification});
      this.$router.push({name: 'modification'});
    }
  },
};
</script>
