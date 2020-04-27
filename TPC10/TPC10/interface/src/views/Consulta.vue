<template>
  <ConsultaFilme :id="$route.params.id"/>
</template>

<script>
// @ is an alias to /src
import ConsultaFilme from '@/components/ConsultaFilme.vue'
export default {
  name: 'Consulta',
  components: {
    ConsultaFilme
  }
}
</script>