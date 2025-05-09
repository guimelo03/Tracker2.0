<template>
  <header>
    <div class="logo-container">
      <h1>
        <img alt="Alura Tracker" src="../assets/logo.png">
      </h1>
      <div class="has-text-centered">
        <button class="button" @click="alterarModo">Ativar modo {{ textoBtn }}</button>
      </div>
      <nav class="panel mt-3">
        <ul>
          <li>
            <router-link to="/" class="link">
              <i class="fas fa-tasks"></i>
              Tarefas
            </router-link>
          </li>
          <li>
            <router-link to="/projetos" class="link">
              <i class="fas fa-project-diagram"></i>
              Projetos
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>


<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BarraLateral",
  emits: ['aoAlterarModo'],
  data () {
    return {
      modoEscuro: false
    }
  },
  methods: {
    alterarModo () : void {
      this.modoEscuro = !this.modoEscuro
      this.$emit('aoAlterarModo', this.modoEscuro)
    }
  },
  computed: {
    textoBtn () : string {
      return this.modoEscuro ? 'claro' : 'escuro'
    }
  }
});
</script>
<style scoped>
h1 {
  text-align: center;
}
strong {
  color: #f95738;
}
header {
  background: #0d3b66;
  color: white;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid red; /* para depurar */
}
@media only screen and (max-width: 768px) {
  header {
    height: auto;
  }
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #FAF0CA;
}
.link.router-link-active {
  color: #FAF0CA;
}
</style>