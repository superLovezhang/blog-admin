<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <PanelGroup/>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
