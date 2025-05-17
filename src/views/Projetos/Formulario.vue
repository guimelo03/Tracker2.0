<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjet"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String
    }
  },
  setup(props) {

    const router = useRouter()

    const store = useStore();
    const { notificar } = useNotificador();

    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find((proj) => proj.id == props.id)
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const salvar = () => {
      if (props.id) {
        store.commit(ALTERAR_PROJETO, {
          id: props.id,
          nome: nomeDoProjeto.value
        })
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComSucesso());
      }
    }

    const lidarComSucesso = () => {
      nomeDoProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        'Excelente!', 
        'O projeto foi cadastrado com sucesso!'
      );
      router.push('/projetos')
    }

    return {
      nomeDoProjeto,
      salvar
    }
  }
})
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