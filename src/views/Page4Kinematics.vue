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
    <section v-if="loading">
      <header>Рассчитываем длины звеньев...</header>
      <CircleLoading/>
      <div>Прогресс {{ infoIteration }} / {{ infoMaxIterations }}</div>
    </section>
    <section v-else class="form">
      <header>Расчитаны длины звеньев:</header>
      <br>
      <div>Кинематическая модель робота в крайнем положении, с наибольшими габаритными размерами:</div>
      <img src="/static/images/mock/kinematicsSolving.png" alt="">

      <br>

      <div>Сторона базы F: {{ $state.sizes.F }} мм</div>
      <div>Сторона нижней платформы E: {{ $state.sizes.E }} мм</div>
      <div>Длина рычага Lf: {{ $state.sizes.Lf }} мм</div>
      <div>Длина плеча Le: {{ $state.sizes.Le }} мм</div>

      <br>

      <div>Диаметр рабочей зоны: {{ $state.workingAreaDiameter }} мм</div>
      <div>Высота рабочей зоны: {{ $state.workingAreaHeight }} мм</div>
      <div>Максимальный габаритный диаметр робота: {{ $state.robotDiameter }} мм</div>

      <router-link :to="{name: 'specialization'}" class="button">Назад</router-link>
      <button @click="submit">Далее</button>
    </section>
  </div>
</template>

<script lang="ts">
import InputComponent from "~/components/InputComponent.vue";
import {StepsNames} from "~/constants";
import {getMaxSizeDiameter, getWorkingAreaParams, solveKinematics} from "~/utils/kinematicsSolving";
import CircleLoading from "~/components/loaders/CircleLoading.vue";


export default {
  components: {CircleLoading, InputComponent},
  data() {
    return {
      infoIteration: 0,
      infoMaxIterations: 0,

      loading: false,
    };
  },

  async mounted() {
    this.loading = true;
    const solving = await solveKinematics(
      this.$state.minWorkingAreaDiameter || 1,
      this.$state.minWorkingAreaHeight || 1,
      this.$state.maxRobotDiameter,
      (i, maxI) => {
        this.infoIteration = i;
        this.infoMaxIterations = maxI;
      }
    );
    this.loading = false;

    if (!solving) {
      this.$popups.error('Решения не найдено', 'Попробуйте изменить параметры и запустить расчет заново');
      this.$router.push({name: 'specialization'});
      return;
    }
    const F = Math.round(solving.F);
    const E = Math.round(solving.E);
    const Lf = Math.round(solving.Le);
    const Le = Math.round(solving.Lf);

    this.$state.sizes.F = F;
    this.$state.sizes.E = E;
    this.$state.sizes.Lf = Lf;
    this.$state.sizes.Le = Le;

    let targetDtoH = undefined;
    if (this.$state.minWorkingAreaDiameter && this.$state.minWorkingAreaHeight) {
      targetDtoH = this.$state.minWorkingAreaDiameter / this.$state.minWorkingAreaHeight;
    }
    const {diameter, height, minZ, maxZ} = getWorkingAreaParams(F, E, Lf, Le, targetDtoH);
    console.log("WORKING AREA", {diameter, height, minZ, maxZ});
    this.$state.workingAreaDiameter = Math.round(diameter);
    this.$state.workingAreaHeight = Math.round(height);

    const robotDiameter = getMaxSizeDiameter(F, E, Lf, Le, diameter, minZ, maxZ);
    console.log("MAX SIZE", robotDiameter);
    this.$state.robotDiameter = Math.round(robotDiameter);

    this.$store.dispatch('SET_STATE',{step: StepsNames.kinematics});
  },

  methods: {
    submit() {
      this.$store.dispatch('SET_STATE',{});
      this.$router.push({name: 'trajectories'});
    }
  },
};
</script>
