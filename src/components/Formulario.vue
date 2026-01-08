<template>
    <div class="box formulario">
        <div class="columns"> <!-- columns no plural -->
            <div 
                class="column is-8" 
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
            <div class="column">
                <MeuTemporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MeuTemporizador from './MeuTemporizador.vue';

export default defineComponent({
    name: 'MeuFormulário',
    emits:['aoSalvarTarefa'],
    components: {
        MeuTemporizador
    },
    data () {
        return {
            descricao: ''
        }
    },
    methods: {
        finalizarTarefa (tempoDecorrido: number) : void {
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = ''
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