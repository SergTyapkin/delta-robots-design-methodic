<style lang="stylus" scoped>
@import 'styles/constants.styl'
@import 'styles/components.styl'
@import 'styles/buttons.styl'
@import 'styles/fonts.styl'
@import 'styles/utils.styl'
@import 'styles/animations.styl'
@import 'styles/scrollbars.styl'

.outer-wrapper
  display flex
  flex 1

  .results-info
    position relative
    padding 20px
    background colorBlockBg
    display grid
    grid-gap 15px
    grid-template-columns auto auto
    grid-template-rows repeat(auto-fill, 1fr)
    border-right 1px solid colorBorder
    color colorText4
    max-width 300px
    font-small()
    trans()
    .button-close
      position absolute
      left 100%
      top 100px
      padding 5px
      padding-left 0
      background colorBlockBg
      border 1px solid colorBorder
      border-left none
      border-radius 0 7px 7px 0
      cursor pointer
      pointer-events all
      z-index 999
      img
        img-size(30px)
        transform rotate(90deg)
        trans()
    &.closed
      pointer-events none
      background transparent
      color transparent
      border-color transparent
      max-width 0
      padding-left 0
      padding-right 0
      .button-close
        img
          transform rotate(-90deg)


  .wrapper
    position relative
    padding-left 20px
    flex 1
    width 100%
    min-height 100%
    barHeight = 6px
    circleHeight = 12px
    .progressbar
      width 100%
      height barHeight
      border-radius 9999px
      border 1px solid mix(colorBorder, transparent)
      margin-top 10px
      position relative
      background linear-gradient(90deg, colorSuccess 50%, colorBlockBg 53%)
      background-size 200% 100%
      background-position-x 'calc(100% - (100% - %s) * var(--progress))' % (circleHeight)
      transition all 0.3s ease-out
      .step
        position absolute
        top (- (circleHeight - barHeight) / 2)
        left 'calc((100% - %s) / var(--count) * var(--number))' % (circleHeight)
        width circleHeight
        height circleHeight
        border-radius 9999px
        border inherit
        background colorBlockBg
        transition all 0.3s ease-out
        &.filled
          border-color transparent
          background colorSuccess
</style>

<style lang="stylus">
.outer-wrapper
  .wrapper
    > *
      position absolute

@keyframes scale-out
  from
    transform scale(1)
    opacity 1

  to
    transform scale(0.95)
    opacity 0


@keyframes scale-in
  0%
    transform scale(1.05)
    opacity 0

  25%
    transform scale(1.05)
    opacity 0

  100%
    transform scale(1)
    opacity 1


.scale-in-enter-active
  overflow hidden
  animation scale-in 0.2s ease

.scale-in-leave-active
  overflow hidden
  animation scale-out 0.2s ease


.opacity-enter-active
  animation opacity 0.15s

.opacity-leave-active
  animation opacity 0.15s reverse forwards


@keyframes opacity
  0%
    opacity 0

  100%
    opacity 1
</style>

<template>
  <HeaderComponent class="header"/>

  <div class="outer-wrapper">
    <div class="results-info" v-if="global?.$state" :class="{closed: isInfoClosed}">
      <button class="button-close" @click="() => isInfoClosed = !isInfoClosed"><img src="/static/icons/chevron-down.svg" alt=""></button>

      <div>Модификация</div>
      <div>
        <div v-if="$state.modification">{{ $state.modification }}</div>
      </div>
      <div>Тип соединений</div>
      <div>
        <div v-if="$state.connectionsType">{{ $state.connectionsType }}</div>
      </div>
      <div>Диаметр рабочей зоны</div>
      <div>
        <div v-if="$state.workingAreaDiameter">{{ $state.workingAreaDiameter }} мм</div>
      </div>
      <div>Высота рабочей зоны</div>
      <div>
        <div v-if="$state.workingAreaHeight">{{ $state.workingAreaHeight }} мм</div>
      </div>
      <div>Макс. диаметр робота</div>
      <div>
        <div v-if="$state.robotDiameter">{{ $state.robotDiameter }} мм</div>
      </div>
      <div>Пищевое производство</div>
      <div>
        <div v-if="$state.isFoodWork !== undefined">{{ $state.isFoodWork }}</div>
      </div>
      <div>Влагозащита</div>
      <div>
        <div v-if="$state.isWaterProof !== undefined">{{ $state.isWaterProof }}</div>
      </div>
      <div>Сторона базы</div>
      <div>
        <div v-if="$state.sizes.F">{{ $state.sizes.F }} мм</div>
      </div>
      <div>Стороны нижней платформы</div>
      <div>
        <div v-if="$state.sizes.E">{{ $state.sizes.E }} мм</div>
      </div>
      <div>Длина рычага</div>
      <div>
        <div v-if="$state.sizes.Lf">{{ $state.sizes.Lf }} мм</div>
      </div>
      <div>Длина плеча(штанги)</div>
      <div>
        <div v-if="$state.sizes.Le">{{ $state.sizes.Le }} мм</div>
      </div>
      <div>Макс. грузоподъемность</div>
      <div>
        <div v-if="$state.maxLoadMass">{{ $state.maxLoadMass }} кг</div>
      </div>
      <div>Оптимальный угол установки</div>
      <div>
        <div v-if="$state.optimizedZAngle">{{ $state.optimizedZAngle }}°</div>
      </div>
      <div>Материал звеньев</div>
      <div>
        <div v-if="$state.materialType">{{ $state.materialType }}</div>
      </div>
      <div>Тип сечения звеньев</div>
      <div>
        <div v-if="$state.crossSectionsType">{{ $state.crossSectionsType }}</div>
      </div>
      <div>Площадь сечения звеньев</div>
      <div>
        <div v-if="$state.crossSectionsSquare">{{ $state.crossSectionsSquare }} мм^2</div>
      </div>
      <div>Макс. момент</div>
      <div>
        <div v-if="$state.maxJerk">{{ $state.maxJerk }} Н*м</div>
      </div>
      <div>Макс. угл. скорость</div>
      <div>
        <div v-if="$state.maxAngleSpeed">{{ $state.maxAngleSpeed }} °/сек = {{ Math.round($state.maxAngleSpeed * 60 / 360) }} об/мин</div>
      </div>
      <div>Макс. угл. ускорение</div>
      <div>
        <div v-if="$state.maxAngleAcceleration">{{ $state.maxAngleAjcceleration }} °/сек^2</div>
      </div>
      <div>Компенсация деформаций X</div>
      <div>
        <div v-if="$state.elasticDeformationsExprs.x">{{ $state.elasticDeformationsExprs.x }} мм</div>
      </div>
      <div>Компенсация деформаций Y</div>
      <div>
        <div v-if="$state.elasticDeformationsExprs.y">{{ $state.elasticDeformationsExprs.y }} мм</div>
      </div>
      <div>Компенсация деформаций Z</div>
      <div>
        <div v-if="$state.elasticDeformationsExprs.z">{{ $state.elasticDeformationsExprs.z }} мм</div>
      </div>
    </div>

    <div class="wrapper">
      <section v-if="$state?.step" class="progressbar" :style="{'--progress': StepsValues[$state.step] / maxStepsCount, '--count': maxStepsCount}">
        <div class="step" v-for="i in maxStepsCount + 1" :class="{filled: StepsValues[$state.step] >= i-1}" :style="{'--number': i - 1}"/>
      </section>

      <router-view #default="{ Component }">
        <transition name="scale-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
  </div>

  <Popups ref="popups"/>
  <Modals ref="modals"/>
</template>

<script lang="ts">
import {getCurrentInstance} from 'vue';
import {Modals, Popups} from '@sergtyapkin/modals-popups';
import API from '~/utils/API';
import {saveAllAssetsByServiceWorker} from '~/utils/utils';
import HeaderComponent from '~/components/HeaderComponent.vue';
import FooterComponent from '~/components/FooterComponent.vue';
import {StepsNames} from "~/constants";

function removeAllHoverStyles() {
  try {
    // prevent exception on browsers not supporting DOM styleSheets properly
    for (var si in document.styleSheets) {
      var styleSheet = document.styleSheets[si];
      if (!styleSheet.rules) continue;

      for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
        if (!styleSheet.rules[ri].selectorText) continue;

        if (styleSheet.rules[ri].selectorText.match(':hover')) {
          styleSheet.deleteRule(ri);
        }
      }
    }
  } catch (err) {
    console.log('Error while removing hover styles:', err);
  }
}

export default {
  components: {HeaderComponent, FooterComponent, Modals, Popups},

  data() {
    return {
      transitionName: '',
      global: undefined as undefined | Record<string, any>,
      isInfoClosed: false,

      StepsValues: {
        modification: 0,
        connections: 1,
        specialization: 2,
        kinematics: 3,
        trajectories: 4,
        crossSections: 5,
        materials: 6,
        drives: 7,
        deformations: 8,
        results: 9,
      },
      maxStepsCount: 9,
    };
  },

  async mounted() {
    this.global = getCurrentInstance()!.appContext.config.globalProperties;

    this.global.$state = this.$store.state.state;
    this.global.$modals = this.$refs.modals;
    this.global.$popups = this.$refs.popups;
    this.global.$app = this;
    this.global.$api = new API(`/api`);
    this.global.$log = (...data: any[]) => console.log(...data);
    this.global.$request = async <APIFoo extends (...args: any) => any, Fallback>(
      context: { loading: boolean },
      apiRequest: APIFoo,
      args: Parameters<APIFoo>,
      errorText: string,
      callback?: (data: Awaited<ReturnType<APIFoo>>['data'], status: number) => any,
      toFallbackValue?: Fallback,
    ) => {
      context.loading = true;
      try {
        const {status, ok, data} = await apiRequest(...args);
        context.loading = false;
        if (!ok) {
          this.$popups.error(`Ошибка ${status}`, errorText);
          if (toFallbackValue) {
            return toFallbackValue;
          }
          throw new Error(`Ошибка ${status} при запросе на API. ${errorText}`);
        }
        callback?.(data, status);
        return data;
      } catch (err) {
        context.loading = false;
        console.error('Error while executing $request:', err);
      }
    };

    this.checkMobileScreen();
    window.addEventListener('resize', this.checkMobileScreen);

    saveAllAssetsByServiceWorker(({current, total, progress}) => {
      console.log(`Saved resource by SW: ${current}. Progress: ${progress}/${total}`);
    });

    // ------ LOAD STATE
    await this.$store.dispatch('LOAD_STATE');
    switch (this.$state.step) {
      case StepsNames.default:
        this.$router.push({name: 'default'});
        break;
      case StepsNames.modification:
        this.$router.push({name: 'modification'});
        break;
      case StepsNames.connections:
        this.$router.push({name: 'connections'});
        break;
      case StepsNames.kinematics:
        this.$router.push({name: 'kinematics'});
        break;
      case StepsNames.trajectories:
        this.$router.push({name: 'trajectories'});
        break;
      case StepsNames.materials:
        this.$router.push({name: 'materials'});
        break;
      case StepsNames.specialization:
        this.$router.push({name: 'specialization'});
        break;
      case StepsNames.crossSections:
        this.$router.push({name: 'crossSections'});
        break;
      case StepsNames.drives:
        this.$router.push({name: 'drives'});
        break;
    }
  },

  unmounted() {
    window.removeEventListener('resize', this.checkMobileScreen);
  },

  methods: {
    checkMobileScreen() {
      if (window.innerWidth <= 700) {
        this.global!.$isMobile = true;
        removeAllHoverStyles();
        return;
      }
      this.global!.$isMobile = false;
    },

    update() {
      this.$forceUpdate();
    }
  },

  watch: {
    $route(to, from) {
      this.transitionName = 'scale-in';

      console.log(from.path, 'TO', to.path);
    },
  },
};
</script>
