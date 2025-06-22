<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/components.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'
@import '../styles/scrollbars.styl'


.root-header
  .row-inner
    scrollbars-hidden()
    font-large()
    overflow-x auto
    display flex
    gap 7%
    align-items center
    justify-content space-between
    background colorBlockBgEmp1Gradient
    padding 15px 30px
    @media ({mobile})
      padding-left 5px
      padding-right 5px
      gap 5px
    .left-group
      width 120px
      hover-effect()
      img-size(40px)

    .center-group
      display flex
      flex 1
      gap 0
      align-items center
      justify-content space-between
      max-width 800px

      > *
        padding 5px 5px
        background linear-gradient(colorText1, colorText1) 50% 100% / 0 1px no-repeat
        hover-effect()
        trans()

        &.router-link-active
          background-size 100% 1px

    .right-group
      display flex
      flex 1
      gap 20px
      align-items center
      justify-content flex-end
      button
        button()
        font-small()
        padding 10px 7px
</style>

<template>
  <header class="root-header">
    <div class="row-inner">
      <router-link
        :to="{ name: 'default' }"
        class="left-group"
      >
        <img
          class="logo"
          src="/static/icons/robot.svg"
          alt="logo"
        >
      </router-link>
      <div class="center-group">
        <router-link :to="{name: 'default'}">
          Delta robots calculator
        </router-link>
      </div>
      <div class="right-group">
        <button @click="reset" v-if="$store.state.isInCalculating">
          <img src="/static/icons/cross.svg" alt="">
          Начать заново
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import InputSearch from '~/components/InputSearch.vue';

export default {
  components: { InputSearch },

  data() {
    return {
      searchText: '',
    };
  },

  mounted() {},

  methods: {
    async reset() {
      if (! await this.$modals.confirm('Вы уверены?', 'Все текущие результаты будут потеряны')) {
        return;
      }
      await this.$store.dispatch('CLEAR_STATE');
      this.$router.push({name: 'default'});
    }
  },
};
</script>
