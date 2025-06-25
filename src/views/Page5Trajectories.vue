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
    svg
      width 100%
      max-width 600px
      height 200px
</style>

<template>
  <div class="root-page">
    <header>Динамический расчет по характерной траектории</header>
    <div class="form">
      <InputComponent v-model.number="tTotal" title="Время движения"/>
      <br>
      <div class="info">Зависимости вводятся без = и других лишних символов. Доступны только переменные t и tTotal. Для математических функций используйте модуль Math. Например Math.cos(Math.PI / 3)</div>
      <InputComponent v-model="xByT" title="Зависимость x(t)"/>
      <InputComponent v-model="yByT" title="Зависимость y(t)"/>
      <InputComponent v-model="zByT" title="Зависимость z(t)"/>
      <div class="info">Z должно быть &lt; 0 (вниз, по направлению под базу)</div>

      <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`${svgMinX} ${svgMinY} ${svgMaxX - svgMinX} ${svgMaxY - svgMinY}`">
        <line x1="0" :y1="svgMinY" x2="0" :y2="svgMaxY" stroke="blue" :stroke-width="(svgMaxY-svgMinY) / 100"/>
        <line :x1="svgMinX" :y1="svgMinY" :x2="svgMaxX" :y2="svgMinY" stroke="green" :stroke-width="(svgMaxY - svgMinY) / 100"/>
        <line :x1="- (svgMaxY - svgMinY) * Math.cos(X_AXIS_IZOMETRIC_ANGLE)" :y1="svgMinY + (svgMaxY - svgMinY) * Math.sin(X_AXIS_IZOMETRIC_ANGLE)" :x2="(svgMaxY - svgMinY) * Math.cos(X_AXIS_IZOMETRIC_ANGLE)" :y2="svgMinY - (svgMaxY - svgMinY) * Math.sin(X_AXIS_IZOMETRIC_ANGLE)" stroke="red" :stroke-width="(svgMaxY-svgMinY) / 100"/>

        <circle v-for="point in svgPoints" :cx="point.x" :cy="svgMinY + svgMaxY - point.y" :r="(svgMaxY-svgMinY) / 80" fill="white"></circle>
      </svg>

      <br>

      <div>Максимальная скорость: {{ Math.round(maxTauCalcResult.maxSpeed * 100) / 100 }} мм/с</div>
      <div class="info">В точке t={{ Math.round(maxTauCalcResult.maxSpeedTime * 100) / 100 }} с</div>
      <div>Максимальное ускорение: {{ Math.round(maxTauCalcResult.maxAcceleration * 100) / 100 }} мм/с^2</div>
      <div class="info">В точке t={{ Math.round(maxTauCalcResult.maxAccelerationTime * 100) / 100 }} с</div>
      <br>
      <div>Максимальная угловая скорость: {{ Math.round(maxTauCalcResult.maxAngleSpeed * 100) / 100 }} °/с</div>
      <div class="info">В точке t={{ Math.round(maxTauCalcResult.maxAngleSpeedTime * 100) / 100 }} с</div>
      <div>Максимальное угловое ускорение: {{ Math.round(maxTauCalcResult.maxAngleAcceleration * 100) / 100 }} °/с^2</div>
      <div class="info">В точке t={{ Math.round(maxTauCalcResult.maxAngleAccelerationTime * 100) / 100 }} с</div>
      <br>
      <div>Максимальный момент при весе рычага 1кг: {{ Math.round(maxTauCalcResult.maxJerk * 100) / 100 }} Н*м</div>
      <div class="info">В точке t={{ Math.round(maxTauCalcResult.maxJerkTime * 100) / 100 }} с</div>

      <div v-if="!isAngleOptimized">
        <button @click="optimizeAngle">Оптимизировать угол</button>
      </div>
      <div v-else>
        <br>
        <div>Оптимизированный угол поворота вокруг оси Z: {{ Math.round(optimizedAngle * 10) / 10 }} °</div>
        <div>Значение макс. момента при этом уменьшается до: {{ Math.round(optimizedMaxJerk * 100) / 100 }} Н*м</div>
        <button @click="submit">Далее</button>
      </div>

      <router-link :to="{name: 'kinematics'}" class="button">Назад</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import InputComponent from "~/components/InputComponent.vue";
import CircleLoading from "~/components/loaders/CircleLoading.vue";
import {StepsNames} from "~/constants";
import {calcMaxJerk} from "~/utils/dynamics";
import {minimize_Powell} from "~/utils/optimization";

const X_AXIS_IZOMETRIC_ANGLE = 25 / 180 * Math.PI;

export default {
  components: {CircleLoading, InputComponent},
  data() {
    return {
      svgMaxX: 0,
      svgMaxY: 0,
      svgMinX: 0,
      svgMinY: 0,

      // // Spiral on sphere
      // xByT: `${Math.round(this.$state.workingAreaDiameter! / 3)} * Math.cos(t / tTotal * Math.PI * 6) * Math.sin(t / tTotal * Math.PI)`,
      // yByT: `${Math.round(this.$state.workingAreaDiameter! / 3)} * Math.sin(t / tTotal * Math.PI * 6) * Math.sin(t / tTotal * Math.PI)`,
      // zByT: `${-Math.round(this.$state.workingAreaHeight!)} - ${Math.round(this.$state.workingAreaHeight! / 3 * 2)} * t / tTotal`,
      // tTotal: 2,

      // Grab, move and put
      xByT: '0',
      yByT: `${-Math.round(this.$state.workingAreaDiameter! / 3)} + ${Math.round(this.$state.workingAreaDiameter! / 3 * 2)} * t / tTotal`,
      zByT: `${-Math.round(this.$state.workingAreaHeight! / 3 * 5)} + ${Math.round(this.$state.workingAreaHeight! / 5)} * (1 - (t / tTotal * 2 - 1)**10)`,
      tTotal: 2,

      maxTauCalcResult: {} as ReturnType<typeof calcMaxJerk>,

      isAngleOptimized: false,
      optimizedAngle: NaN,
      optimizedMaxJerk: NaN,

      // TODO: учесть соотношение веса материалов
      Mlf: 1e-15,
      Mle: this.$state.sizes.Le! / this.$state.sizes.Lf! * 1e-15 * 0.3,
      Me: (this.$state.sizes.E! / this.$state.sizes.Lf!) ** 2 * 1e-15 * 0.2,

      X_AXIS_IZOMETRIC_ANGLE,
    };
  },

  computed: {
    tArr() {
      if (!this.tTotal) {
        return [];
      }

      const T_SMOOTHING_FOO = (t: number) => 3 * t**2 - 2 * t**3; // Bezier curve from 0 to 1
      const STEPS = 500;
      const dTFlat = 1 / STEPS;
      const res: number[] = [];
      for (let tProgress = 0; tProgress < 1; tProgress += dTFlat) {
        res.push(T_SMOOTHING_FOO(tProgress) * this.tTotal);
      }
      return res;
    },

    points(): {x: number, y: number, z: number}[] {
      try {
        // @ts-expect-error
        const tTotal = this.tTotal;
        // @ts-expect-error
        const points = this.tArr.map((t) => ({
          // t and tTotal can be used into eval()
          x: eval(this.xByT),
          y: eval(this.yByT),
          z: eval(this.zByT),
        }));
        this.isAngleOptimized = false;
        this.calcMaxJerk(points);
        return points;
      } catch (err) {
        console.error(err);
        return [];
      }
    },


    svgPoints(): {x: number, y: number}[] {
      this.svgMinX = Infinity;
      this.svgMaxX = -Infinity;
      this.svgMinY = Infinity;
      this.svgMaxY = -Infinity;
      return this.points.map(({x, y, z}) => {
        // Get point projection
        const xScreen = y + x * Math.cos(X_AXIS_IZOMETRIC_ANGLE) / 2;
        const yScreen = z + x * Math.sin(X_AXIS_IZOMETRIC_ANGLE);
        this.svgMinX = Math.min(this.svgMinX, xScreen);
        this.svgMaxX = Math.max(this.svgMaxX, xScreen);
        this.svgMinY = Math.min(this.svgMinY, yScreen);
        this.svgMaxY = Math.max(this.svgMaxY, yScreen);
        return {
          x: xScreen,
          y: yScreen,
        };
      });
    }
  },

  async mounted() {
    this.$store.dispatch('SET_STATE',{step: StepsNames.trajectories});
  },

  methods: {
    calcMaxJerk(points: {x: number, y: number, z: number}[]) {
      if (!points.length)  {
        return;
      }

      this.maxTauCalcResult = calcMaxJerk(
        points,
        this.tArr,
        this.$state.sizes.F!,
        this.$state.sizes.E!,
        this.$state.sizes.Lf!,
        this.$state.sizes.Le!,
        this.Mlf,
        this.Mle,
        this.Me,
      );
    },

    optimizeAngle() {
      const optimized = minimize_Powell((phi: number) => {
        const res = calcMaxJerk(
          this.points,
          this.tArr,
          this.$state.sizes.F!,
          this.$state.sizes.E!,
          this.$state.sizes.Lf!,
          this.$state.sizes.Le!,
          this.Mlf,
          this.Mle,
          this.Me,
          phi,
        );
        console.log(phi, res.maxJerk, res)
        return Math.abs(res.maxJerk);
      }, [1]);

      console.log(optimized)
      // @ts-expect-error
      this.optimizedAngle = optimized.argument[0] / Math.PI * 180;
      // @ts-expect-error
      this.optimizedMaxJerk = optimized.fncvalue;
      this.isAngleOptimized = true;
    },

    submit() {
      if (!isFinite(this.maxTauCalcResult.maxAngleSpeed) || !isFinite(this.maxTauCalcResult.maxAngleAcceleration)) {
        return;
      }
      this.$store.dispatch('SET_STATE',{
        maxAngleSpeed: Math.round(this.maxTauCalcResult.maxAngleSpeed * 100) / 100,
        maxAngleAcceleration: Math.round(this.maxTauCalcResult.maxAngleAcceleration * 100) / 100,
        optimizedZAngle: Math.round(this.optimizedAngle * 10) / 10,
        pointsTrajectory: this.points,
        pointsTimes: this.tArr,
      });
      this.$router.push({name: 'crossSections'});
    }
  },
};
</script>
