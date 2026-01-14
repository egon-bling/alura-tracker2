<template>
    <MeuBox>
        <div class="columns">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'Sem projeto' }}
            </div>
            <div class="column">
                <MeuCronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
        </div>
    </MeuBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import MeuCronometro from './MeuCronometro.vue';
import ITarefa from '@/interfaces/ITarefa';
import MeuBox from './MeuBox.vue';

export default defineComponent({
    name: 'MinhaTarefa',
    components: {
        MeuCronometro,
        MeuBox
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    computed: {
        tempoGasto () : string {
      return new Date(this.tarefa.duracaoEmSegundos * 1000)
        .toISOString()
        .substr(11, 8)
        }
    }
});
</script>