import { createStore, Store, useStore as vuexUseStore } from "vuex";

import { NOTIFICAR } from "./tipo-mutacoes";
import type { INotificacao } from "@/interfaces/INotificacao";
import type { InjectionKey } from "vue";
import { type EstadoProjeto, projeto } from "./modulos/projeto";



export interface Estado {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    // tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        }
    },
    mutations: {
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    modules: {
        projeto
        //tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}