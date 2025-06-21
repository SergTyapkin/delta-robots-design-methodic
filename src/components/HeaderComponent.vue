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
        white-space nowrap
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
      justify-content space-between
      .search
        flex 1
      .profile
        hover-effect()


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
        Delta robots calculator
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

  methods: {},
};
</script>
