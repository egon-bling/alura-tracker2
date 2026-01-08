<template>
    <section>
        <strong class="display">
            {{ tempoDecorrido }}
        </strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'MeuCronometro',
    props: {
        tempoEmSegundos: {
            type: Number,
            default: 0
        }
    },
    computed: {
        tempoDecorrido(): string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().slice(11, 19) //toISOString mostra data e hora atual em um formato pré-determinado e substr(11,8) limita para mostrar só o tempo (mas usei slice()11,19) pq substr foi depreciado pelo js. E this.tempoEmSegundos * 1000 define que a contagem começa do zero, senão mostraria tempo atual
        }
    },
})
</script>
<style scoped>
    .display {
        color: var(--texto-primario);
    }
</style>