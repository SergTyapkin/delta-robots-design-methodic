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
    img
      img-size(300px)
      margin 0 auto
</style>

<template>
  <div class="root-page">
    <header>Расчитаны длины звеньев:</header>
    <div class="form">
      <div>Кинематическая модель робота в крайнем положении, с наибольшими габаритными размерами:</div>
      <img src="/static/images/mock/kinematicsSolving.png" alt="">

      <br>

      <div>Сторона базы F: {{ $state.sizes.F }} мм</div>
      <div>Сторона нижней платформы E: {{ $state.sizes.E }} мм</div>
      <div>Длина рычага Lf: {{ $state.sizes.Lf }} мм</div>
      <div>Длина плеча Le: {{ $state.sizes.Le }} мм</div>

      <br>

      <div>Диаметр рабочей зоны: {{ workingAreaDiameter }} мм</div>
      <div>Высота рабочей зоны: {{ workingAreaHeight }} мм</div>
      <div>Максимальный габаритный диаметр робота: {{ maxRobotDiameter }} мм</div>

      <br>

      Требуемая максимальная грузоподьёмность <span class="info">Обязательно</span>
      <InputComponent v-model="$state.maxLoadMass" placeholder="кг"/>

      <router-link :to="{name: 'specialization'}" class="button">Назад</router-link>
      <button @click="submit">Далее</button>
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
      maxRobotDiameter: 309 * 2,
      workingAreaDiameter: 508,
      workingAreaHeight: 931,
    };
  },

  mounted() {
    this.$state.sizes.F = 237;
    this.$state.sizes.E = 86;
    this.$state.sizes.Lf = 163;
    this.$state.sizes.Le = 291;

    this.$state.maxAngleSpeed = 32.83;
    this.$state.maxAngleAcceleration = 0.29;
  },

  methods: {
    submit() {
      if (!this.$state.maxLoadMass) {
        this.$popups.error('Не заполнено поле', 'Заполните массу');
        return;
      }

      this.$store.dispatch('SET_STATE', {step: StepsNames.crossSections});
      this.$router.push({name: 'crossSections'});
    }
  },
};
</script>
