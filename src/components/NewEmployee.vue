<template>
  <div id="new-employee">
    <h3>Nuevo empleado</h3>
    <div class="row">
      <form @submit.prevent="guardarEmpleado" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="number" v-model="id_empleado" required />
            <label>ID Empleado</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nombre" required />
            <label>Nombre</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="sector" required />
            <label>Sector</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="puesto" required />
            <label>Puesto</label>
          </div>
        </div>
        <button type="submit" class="btn">Aceptar</button>
        <router-link to="/" class="btn grey">Cancelar</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import fb from "./firebaseInit";
export default {
  name: "new-employee",
  data() {
    return {
      id_empleado: null,
      nombre: null,
      sector: null,
      puesto: null,
    };
  },
  methods: {
    guardarEmpleado() {
      fb.collection("empleados")
        .add({
          id_empleado: this.id_empleado,
          nombre: this.nombre,
          sector: this.sector,
          puesto: this.puesto,
        })
        .then((docRef) => {
          console.log(docRef);
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.btn {
  margin-right: 5px;
}
</style>
