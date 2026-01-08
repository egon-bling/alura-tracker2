<template>
   <Formulario @aoSalvarTarefa="salvarTarefa" />
   <div class="lista">
        <MeuBox v-if="listaEstaVazia">
            Nenhuma tarefa registrada.
        </MeuBox>
        <MinhaTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue'
import MinhaTarefa from '../components/MinhaTarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import MeuBox from '../components/MeuBox.vue';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    MinhaTarefa,
    MeuBox
  },
data () {
  return {
    tarefas: [] as ITarefa[]
  }
},
computed: {
  listaEstaVazia () : boolean {
    return this.tarefas.length === 0
  }
},
methods:  {
  salvarTarefa (tarefa: ITarefa) {
    this.tarefas.push(tarefa)
  }
}
});
</script>
