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

  .form
    form()
    font-small()
    header
      font-large()
    img
      img-size(200px)

    svg
      img-size(400px)
      background white
</style>

<template>
  <div class="root-page">
    <header>Результаты расчета</header>
    <div class="form">
      <div>Все результаты можно увидеть во вкладке слева</div>

      <router-link :to="{name: 'deformations'}" class="button">Назад</router-link>
      <button @click="submit">Начать заново</button>
    </div>
  </div>
</template>

<script lang="ts">
import InputComponent from "~/components/InputComponent.vue";
import {StepsNames} from "~/constants";

export default {
  components: {InputComponent},
  data() {
    return {
    };
  },

  mounted() {
    this.$store.dispatch('SET_STATE',{step: StepsNames.results});
  },

  methods: {
    submit() {
      this.$router.push({name: 'default'});
    }
  },
};
</script>
