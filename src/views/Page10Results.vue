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
      <div>Результаты слева</div>

      <router-link :to="{name: 'deformations'}" class="button">Назад</router-link>
      <button @click="submit">Начать заново</button>

      <input v-model.number="min"/>
      <input v-model.number="max"/>
      <input v-model="expr"/>
      <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`${min} ${min} ${max} ${max}`" fill="black">
        <circle v-for="point in points" :cx="point.x" :cy="max - point.y" :r="(max-min) / 100"></circle>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import InputComponent from "~/components/InputComponent.vue";
import {StepsNames} from "~/constants";
import {gradientMin} from "~/utils/optimizations";

export default {
  components: {InputComponent},
  data() {
    return {
      min: 0,
      max: 10,
      expr: '',
    };
  },
  computed: {
    points() {
      const min = this.min;
      const max = this.max;
      const steps = 200;
      const stepVal = (max - min) / steps;
      const res = [];
      try {
        for (let x = min; x < max; x += stepVal) {
          const val = eval(this.expr);
          res.push({
            x: x,
            y: val,
          });
        }
      } catch (err) {
        console.error(err);
      }
      return res;
    }
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
