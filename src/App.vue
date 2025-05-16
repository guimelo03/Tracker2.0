<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro' : modoEscuro}">
    <div class="column is-one-quarter">
      <BarraLateral @aoAlterarModo="alterarModo"/>
    </div>
    <div class="column is-three-quarters conteudo">
      <Notificacoes />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Notificacoes from "./components/Notificacoes.vue";

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    Notificacoes
  },
  data () {
    return {
      modoEscuro: false
    }
  },
  methods: {
    alterarModo (modoEscuro: boolean) : void {
      this.modoEscuro = modoEscuro
    }
  }
});
</script>

<style>
html, body, #app, main {
  height: 100vh;
  margin: 0;
}
main {
  --bg-primario: #fff;
  --texto-primario: #000;
  --borda-input: #ccc;
  --bg-botao: #3273dc;      
  --cor-botao: #fff;
  --bg-tabela: #fff;
  --cor-tabela: #000;
}
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
  --borda-input: #555;
  --bg-botao: #4a4e69;
  --cor-botao: #fff;
  --bg-tabela: #1a1a1a;
  --cor-tabela: #ddd;
}
.lista {
  padding: 1.25rem;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>
