
<template>
  <ConsultaActor :id="$route.params.id"/>
</template>

<script>
// @ is an alias to /src
import ConsultaActor from '@/components/ConsultaActor.vue'
export default {
  name: 'Consulta',
  components: {
    ConsultaActor
  }
}
</script>