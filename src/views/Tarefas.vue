<template>
   <Formulario @aoSalvarTarefa="salvarTarefa" />
   <div class="lista">
        <MeuBox v-if="listaEstaVazia">
            Nenhuma tarefa registrada.
        </MeuBox>
        <MinhaTarefa 
        v-for="(tarefa, index) in tarefas" 
        :tarefa="tarefa"
        :key="index"
        @aoTarefaClicada="selecionarTarefa"
        
        />
        <div class="modal" :class="{'is-active': tarefaSelecionada}" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button @click="fecharModal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
         <div class="field">
            <label for="descricaoDaTarefa" class="label"> Descrição </label>
            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa" />
          </div>
        </section>
        <footer class="modal-card-foot"><div class="buttons">
            <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
            <button @click="fecharModal" class="button">Cancelar</button></div>
        </footer>
      </div>
    </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue'
import MinhaTarefa from '../components/MinhaTarefa.vue';
import MeuBox from '../components/MeuBox.vue';
import { useStore } from '@/store';
import { 
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA, 
  OBTER_PROJETOS, 
  OBTER_TAREFAS 
} from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';
import { ALTERA_TAREFA } from '@/store/tipomutacoes';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    MinhaTarefa,
    MeuBox
  },  
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) : void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa (tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
      this.fecharModal(); //professor fez assim ".then(() => this.fecharModal());", mas aqui deu erro
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas?.length == 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    };
  },
});
</script>
