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
    <header>Формулы вычисления компенсации упругих деформаций</header>
    <div class="form">
      <header>Нажмите кнопку ниже, чтобы скачать файлы с формулами компенсаций упругих деформаций для вашей управляющей программы</header>
      <br>
      <div class="info">В случае нагруженного движения в звеньях робота возникают упругие деформации и звенья робота прогибаются под действием веса груза. Эти деформации необходимо компенсировать с помощью управляющего ПО.</div>
      <br>
      <button>Скачать файлы</button>
      <br>
      <div>Это был последний этап расчетов. Спасибо за использование программы!</div>
    </div>
  </div>
</template>

<script lang="ts">
import InputComponent from "~/components/InputComponent.vue";

export default {
  components: {InputComponent},
  data() {
    return {
    };
  },

  mounted() {
  },

  methods: {
  },
};
</script>
