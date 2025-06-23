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
</style>

<template>
  <div class="root-page">
    <header>Особенности специализации робота</header>
    <div class="form">
      Минимальный диаметр рабочей зоны <div class="info">Не обзательно</div>
      <InputComponent v-model="$state.minWorkingAreaDiameter" type="number" placeholder="мм."/>
      Минимальная высота рабочей зоны <div class="info">Не обязательно</div>
      <InputComponent v-model="$state.minWorkingAreaHeight" type="number" placeholder="мм."/>
      Ограничение на максимальный диаметр робота <div class="info">Не обязательно</div>
      <InputComponent v-model="$state.maxRobotDiameter" type="number" placeholder="мм."/>

      Работа с пищевой продукцией
      <Checkbox v-model="$state.isFoodWork"/>

      Влагозащита
      <Checkbox v-model="$state.isWaterProof"/>

      <router-link :to="{name: 'connections'}" class="button">Назад</router-link>
      <button @click="submit">Далее</button>
    </div>
  </div>
</template>

<script lang="ts">
import InputComponent from "~/components/InputComponent.vue";
import Checkbox from "~/components/Checkbox.vue";
import {StepsNames} from "~/constants";

export default {
  components: {Checkbox, InputComponent},

  data() {
    return {
    };
  },

  mounted() {
    this.$state.isFoodWork = false;
    this.$state.isWaterProof = false;
    this.$store.dispatch('SET_STATE',{step: StepsNames.specialization});
  },

  methods: {
    submit() {
      if (!this.$state.minWorkingAreaDiameter && !this.$state.minWorkingAreaHeight && !this.$state.maxRobotDiameter) {
        this.$popups.error('Не заполнено ни одно поле', 'Заполните хотя бы одно');
        return;
      }

      this.$store.dispatch('SET_STATE',{});
      this.$router.push({name: 'kinematics'});
    }
  },
};
</script>
