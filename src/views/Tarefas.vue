<template>
    <Formulario @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <Box v-if="semTarefas">
            Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
        </Box>
        <div class="field">
          <p class="control has-icons-left">
            <input type="text" class="input" placeholder="Digite para filtrar" v-model="filtro" />
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
        </div>
        <Tarefa v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" @aoTarefaClicada="selecionarTarefa"/>
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
          <div class="modal-background">
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Modal title</p>
                <button class="delete" aria-label="close"></button>
              </header>
              <section class="modal-card-body">
                <div class="field">
                  <label for="descricaoDaTarefa" class="label"> Descrição </label>
                  <input
                    type="text"
                    class="input"
                    v-model="tarefaSelecionada.descricao"
                    id="descricaoDaTarefa"
                  />
                </div>
              </section>
              <footer class="modal-card-foot">
                <button @click="alterarTarefa" class="button is-success">Salvar alteração</button>
                <button @click="fecharModal" class="button">Cancelar</button>
              </footer>
            </div>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/tipo-acoes";
import type ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  methods: {
    salvarTarefa (tarefa: ITarefa) : void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal())
    }
  },
  computed: {
    semTarefas () :boolean {
      return this.tarefas.length == 0
    }
  },
  setup() {

    const filtro = ref('')

    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

  //   const tarefas = computed(() => store.state.tarefas.filter(
  //     t => !filtro.value || t.descricao.includes(filtro.value)
  //   )
  // );

  watchEffect(() => {
    store.dispatch(OBTER_TAREFAS, filtro.value)
  })
    
    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro
    }
  }
});
</script>
