<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <MeuCronometro :tempoEmSegundos="tempoEmSegundos" />
        <button class="button" @click="iniciar" :disabled="cronometroRodando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" :disabled="!cronometroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MeuCronometro from './MeuCronometro.vue';

export default defineComponent({
    name: 'MeuTemporizador',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        MeuCronometro
    },
    data () {
        return {
            tempoEmSegundos: 0,
            meuCronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar () {
            //começar o cronômetro. setInterval (ñ é do vue, é js) é em milissegungos, então 1 seg = 1000ms
            //A cada 1000ms executa esse código
            this.cronometroRodando = true 
            this.meuCronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000)
        },
        finalizar () {
            this.cronometroRodando = false
            clearInterval(this.meuCronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    }
});
</script>