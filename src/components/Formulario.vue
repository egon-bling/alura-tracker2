<template>
    <div class="box formulario">
        <div class="columns"> <!-- columns no plural -->
            <div 
                class="column is-5" 
                role="form" 
                aria-label="Formulário para criação de uma nova tarefa"
            ><!-- column no singular -->
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao"
                />
            </div><!-- column no singular -->
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option
                            :value="projeto.id"
                            v-for="projeto in projetos"
                            :key="projeto.id"
                        >
                        {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <MeuTemporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import MeuTemporizador from './MeuTemporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
    name: 'MeuFormulário',
    emits:['aoSalvarTarefa'],
    components: {
        MeuTemporizador
    },
    //foi pro setup (Composition API)
/*     data () {
        return {
            descricao: '',
            idProjeto: ''
        }
    }, */

    setup (props, {emit}) {
        const store = useStore(key)

        const descricao = ref('')
        const idProjeto = ref('')

        const projetos = computed(() => store.state.projeto.projetos)


    const finalizarTarefa = (tempoDecorrido: number) : void => {
            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)
            })
            descricao.value = ''
        }

        return {
            descricao,
            idProjeto,
            projetos,
            finalizarTarefa
        }
    }
});
</script>
<style>
    .formulario {
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }
</style>