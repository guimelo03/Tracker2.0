<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                <span class="icon is-small">
                <i class="fas fa-trash"></i>
                </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { OBTER_PROJETOS } from "@/store/tipo-acoes";
import { EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "Lista",
  methods: {
    excluir(id: string) {
        this.store.commit(EXCLUIR_PROJETO, id)
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_PROJETOS)
    
    return {
      projetos: computed(() => store.state.projeto.projetos),
      store
    }
  }
});
</script>

<style scoped>
.input {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
  border: 1px solid var(--borda-input);
}

.button {
  background-color: var(--bg-botao);
  color: var(--cor-botao);
  border: none;
}

.table {
  background-color: var(--bg-tabela);
  color: var(--cor-tabela);
}

th, td {
  color: var(--cor-tabela);
}
.title,
.label,
.table th, .table td {
  color: var(--texto-primario);
}
</style>