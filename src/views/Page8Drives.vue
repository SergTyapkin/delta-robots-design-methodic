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
</style>

<template>
  <div class="root-page">
    <header>Подбор двигателя</header>
    <div class="form">
      <img src="/static/images/mock/drive.png" alt="">

      <header>Параметры необходимых приводов:</header>
      <div>Номинальный момент: {{ $state.maxJerk }} Н/м</div>
      <div>В случае, если перегрузок не ожидается, на максимальный момент можно не ориентироваться.</div>
      <br>
      <div>Скорость вращения: {{ $state.maxAngleSpeed }} °/сек = {{ $state.maxAngleSpeed / 60 }} об/мин</div>
      <br>
      <div v-if="$state.isWaterProof">Стандарт влаго- и пылезащиты: IP65–IP69K</div>
      <br>
      <div v-if="$state.isFoodWork">
        <div>Стандарт влаго- и пылезащиты: IP65–IP69K</div>
        <div>Корпус из нержавеющей стали или алюминия с противокоррозионным покрытием</div>
        <div>Пищевые смазки, сертифицированные по стандартам NSF H1</div>
      </div>

      <router-link :to="{name: 'materials'}" class="button">Назад</router-link>
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
    };
  },

  mounted() {
    this.$store.dispatch('SET_STATE',{step: StepsNames.drives});
  },

  methods: {
    submit() {
      this.$router.push({name: 'deformations'});
    }
  },
};
</script>
