<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>
          Empleados
        </h4>
      </li>
      <li v-for="e in empleados" :key="e.id" class="collection-item">
        <div class="chip">
          {{ e.sector }}
        </div>
        Nº empleado: {{ e.id_empleado }} -
        {{ e.nombre }}
        <router-link
          class="secondary-content"
          :to="{
            name: 'view-employee',
            params: { id_empleado: e.id_empleado },
          }"
        >
          <i class="fa fa-eye"></i
        ></router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i> </router-link
      >>
    </div>
  </div>
</template>

<script>
import fb from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      empleados: [],
    };
  },
  created() {
    fb.collection("empleados")
      .orderBy("sector")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            id_empleado: doc.data().id_empleado,
            nombre: doc.data().nombre,
            puesto: doc.data().puesto,
            sector: doc.data().sector,
          };
          this.empleados.push(data);
        });
      })
      .catch((err) => console.log("Error: " + err));
  },
};
</script>

<style scoped></style>
