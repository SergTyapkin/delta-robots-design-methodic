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
    <header>Рассчет характерных траекторий</header>
    <div class="form">
      <InputComponent v-model="xByT" title="Зависимость x(t)"/>
      <InputComponent v-model="yByT" title="Зависимость y(t)"/>
      <InputComponent v-model="zByT" title="Зависимость z(t)"/>
      <br>
      <InputComponent v-model.number="tTotal" title="Время движения"/>
      <button @click="calc">Расчитать</button>

      <router-link :to="{name: 'specialization'}" class="button">Назад</router-link>
      <button @click="submit">Далее</button>
    </div>
  </div>
</template>

<script lang="ts">
import InputComponent from "~/components/InputComponent.vue";
import CircleLoading from "~/components/loaders/CircleLoading.vue";

export default {
  components: {CircleLoading, InputComponent},
  data() {
    return {
      xByT: '',
      yByT: '',
      zByT: '',
      tTotal: 0,
    };
  },

  async mounted() {
  },

  methods: {
    calc() {
      if (!this.xByT || !this.yByT || !this.zByT || !this.tTotal)  {
        this.$popups.error('Не заполнено поле', 'Заполните все поля');
        return;
      }


    },


    submit() {
      this.$store.dispatch('SET_STATE',{});
      this.$router.push({name: 'crossSections'});
    }
  },
};
</script>
