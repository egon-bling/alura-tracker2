import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./tipomutacoes";
import INotificacao from "@/interfaces/INotificacao"; //No do professor está { INotificacao }
import { CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { EstadoDoProjeto, projeto } from "./modulo/projeto";

export interface Estado {
    tarefas?: ITarefa[]
    notificacoes?: INotificacao[]
    projeto: EstadoDoProjeto //professor escreveu apenas EstadoProjeto, mas não foi o nome dado (prestar atenção de corrige)
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas?.push(tarefa) //confirmar se tem o "?"
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas?.findIndex(t => t.id == tarefa.id)
            state.tarefas![index!] = tarefa
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes!.push(novaNotificacao) // o "!" é para garantir que não é undefined (mas prof não usou nem aqui, nem em outras partes)

            setTimeout(() => {
                state.notificacoes = state.notificacoes!.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {

            let url = 'tarefas'

            if (filtro) {
                url += '?descricao=' + filtro
            }

            http.get(url)
                .then(response => commit(DEFINIR_TAREFAS, response.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(response => commit(ADICIONA_TAREFA, response.data))
        },
        [ALTERA_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },
    },
    modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}