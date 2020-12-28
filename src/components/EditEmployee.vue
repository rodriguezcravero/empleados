<template>
  <div id="edit-employee">
    <h3>Editar empleado</h3>
    <div class="row">
      <form @submit.prevent="actualizarEmpleado" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="number" v-model="id_empleado" required />
            <!-- <label>ID Empleado</label> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nombre" required />
            <!-- <label>Nombre</label> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="sector" required />
            <!-- <label>Sector</label> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="puesto" required />
            <!-- <label>Puesto</label> -->
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
  name: "edit-employee",
  data() {
    return {
      id_empleado: null,
      nombre: null,
      sector: null,
      puesto: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    fb.collection("empleados")
      .where("id_empleado", "==", to.params.id_empleado)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((vm) => {
            vm.id_empleado = doc.data().id_empleado;
            vm.nombre = doc.data().nombre;
            vm.sector = doc.data().sector;
            vm.puesto = doc.data().puesto;
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      fb.collection("empleados")
        .where("id_empleado", "==", this.$route.params.id_empleado)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.id_empleado = doc.data().id_empleado;
            this.nombre = doc.data().nombre;
            this.sector = doc.data().sector;
            this.puesto = doc.data().puesto;
          });
        });
    },
    actualizarEmpleado() {
      fb.collection("empleados")
        .where("id_empleado", "==", this.$route.params.id_empleado)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                id_empleado: this.id_empleado,
                nombre: this.nombre,
                sector: this.sector,
                puesto: this.puesto,
              })
              .then(() => {
                this.$router.push({
                  name: "view-employee",
                  params: { id_empleado: this.id_empleado },
                });
              });
          });
        });
    },
  },
};
</script>

<style scoped>
.btn {
  margin-right: 5px;
}
</style>
