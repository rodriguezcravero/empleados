<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-he">
        <h4>
          {{ nombre }}
        </h4>
      </li>
      <li class="collection-item">ID Empleado: {{ id_empleado }}</li>
      <li class="collection-item">Trabaja en el sector {{ sector }}</li>
      <li class="collection-item">Puesto: {{ puesto }}</li>
    </ul>
    <router-link to="/" class="btn grey">
      Volver
    </router-link>
    <button @click="borrarEmpleado" class="btn red">Borrar empleado</button>

    <div class="fixed-action-btn">
      <router-link
        :to="{ name: 'edit-employee', params: { id_empleado: id_empleado } }"
        class="btn-floating btn-large red"
      >
        <i class="fa fa-pencil"></i> </router-link
      >>
    </div>
  </div>
</template>

<script>
import fb from "./firebaseInit";
export default {
  name: "view-employee",
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
    borrarEmpleado() {
      if (confirm("¿Desea borrar al empleado?")) {
        fb.collection("empleados")
          .where("id_empleado", "==", this.$route.params.id_empleado)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.btn {
  margin-right: 5px;
}
</style>
