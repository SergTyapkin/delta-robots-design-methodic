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
        <header>Номинальный момент на моторах: {{ pair.jerk }} Н/м</header>
      </article>

    </div>

    <router-link :to="{name: 'crossSections'}" class="button">Назад</router-link>
  </div>
</template>

<script lang="ts">
import InputComponent from "~/components/InputComponent.vue";
import {CrossSectionTypes, StepsNames} from "~/constants";
import {calcMaxJerk} from "~/utils/dynamics";
import {Material, Materials} from "~/utils/steels";

export default {
  components: {InputComponent},
  data() {
    return {
      pairs: [
      ],
    };
  },

  mounted() {
    this.$store.dispatch('SET_STATE',{step: StepsNames.materials});
    this.calcMaterials();
  },

  methods: {
    calcMaterials() {
      let minJerk = Infinity;
      let minJerkPair = {};
      let maxJerk = -Infinity;
      let maxJerkPair = {};
      let mediumJerkMinDiff = Infinity;
      let mediumJerkPair = {};
      Materials.forEach(material => {
        const {jerk, square} = this.calcMaterial(material, 1 * this.$state.sizes.Lf! * material.density);
        const pair = {
          jerk: Math.round(jerk * 100) / 100,
          square: Math.round(square * 10000) / 100,
          material: material.name,
        };
        if (jerk < minJerk) {
          minJerk = jerk;
          minJerkPair = pair;
        }
        if (jerk > maxJerk) {
          maxJerk = jerk;
          maxJerkPair = pair;
        }
      });
      Materials.forEach(material => {
        const {jerk, square} = this.calcMaterial(material, 1 * this.$state.sizes.Lf! * material.density);
        const pair = {
          jerk: Math.round(jerk * 100) / 100,
          square: Math.round(square * 10000) / 100,
          material: material.name,
        };
        if (Math.abs((maxJerk + minJerk) / 2 - jerk) < mediumJerkMinDiff) {
          mediumJerkMinDiff = Math.abs((maxJerk + minJerk) / 2 - jerk);
          mediumJerkPair = pair;
        }
      });
      // @ts-expect-error
      if (mediumJerkPair.jerk) {
        this.pairs = [
          // @ts-expect-error
          minJerkPair,
          // @ts-expect-error
          mediumJerkPair,
          // @ts-expect-error
          maxJerkPair,
        ]
      } else {
        this.pairs = [
          // @ts-expect-error
          minJerkPair,
          // @ts-expect-error
          maxJerkPair,
        ]
      }
    },

    calcMaterial(material: Material, Mlf: number, iter = 0): {jerk: number, square: number} {
      const jerk = calcMaxJerk(
        this.$state.pointsTrajectory!,
        this.$state.pointsTimes!,
        this.$state.sizes.F!,
        this.$state.sizes.E!,
        this.$state.sizes.Lf!,
        this.$state.sizes.Le!,
        Mlf,
        Mlf * this.$state.sizes.Le! / this.$state.sizes.Lf! * 0.3,
        Mlf * (this.$state.sizes.E! / this.$state.sizes.Lf!) ** 2 * 0.2,
      ).maxJerk * 1e-18;
      const lfSquare = this.calcSquare(jerk, material.limitTurnover);
      if (iter >= 10) {
        return {
          jerk: jerk,
          square: lfSquare,
        }
      }
      Mlf = lfSquare * this.$state.sizes.Lf! * material.density;
      return this.calcMaterial(material, Mlf, iter + 1);
    },

    calcSquare(jerk: number, limitTurnover: number, d: number = 8) {
      const G = 9.8;
      jerk += this.$state.sizes.Lf! / 1000 * this.$state.maxLoadMass! * G / 3;

      switch (this.$state.crossSectionsType) {
        case (CrossSectionTypes.rectangle): {
          return 6 * jerk / limitTurnover + 0.08;
        }
        case (CrossSectionTypes.rectangleHollow): {
          return 6 * jerk / limitTurnover + 0.083;
        }
        case (CrossSectionTypes.circle): {
          return Math.cbrt(32 * jerk / limitTurnover / Math.PI / (d**2));
        }
        case (CrossSectionTypes.circleHollow): {
          return 2**4 * Math.cbrt(jerk / limitTurnover / Math.PI / (d**4));
        }
      }
      return NaN;
    },

    submit(material: string, square: number, moment: number) {
      this.$store.dispatch('SET_STATE', {materialType: material, crossSectionsSquare: square, maxJerk: moment});
      this.$router.push({name: 'drives'});
    }
  },
};
</script>
