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
    <header>
      Для вас были расчитаны пары "материал + момент на двигателе".
      <br>
      Выберите подходящую пару:
    </header>

    <div class="cards-container">

      <article v-for="pair in pairs" class="card" @click="submit(pair.material, pair.square, pair.moment)">
        <header>Материал: {{ pair.material }}</header>
        <header>Площадь сечения звеньев: {{ pair.square }} мм^2</header>
        <header>Номинальный момент на моторах: {{ pair.moment }} Н/м</header>
      </article>

    </div>

    <router-link :to="{name: 'crossSections'}" class="button">Назад</router-link>
  </div>
</template>

<script lang="ts">
import InputComponent from "~/components/InputComponent.vue";
import {StepsNames} from "~/constants";

export default {
  components: {InputComponent},
  data() {
    return {
      pairs: [
        {
          moment: 2.06,
          square: 10.39,
          material: 'Алюминий А5',
        },
        {
          moment: 5.31,
          square: 13.32,
          material: 'Сталь 40Х',
        },
        {
          moment: 5.55,
          square: 20.86,
          material: 'Сталь ст1',
        },
      ],
    };
  },

  mounted() {
    this.$store.dispatch('SET_STATE',{step: StepsNames.materials});
  },

  methods: {
    submit(material: string, square: number, moment: number) {
      this.$store.dispatch('SET_STATE', {materialType: material, crossSectionsSquare: square, maxJerk: moment});
      this.$router.push({name: 'drives'});
    }
  },
};
</script>
