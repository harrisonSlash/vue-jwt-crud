import Vue from "vue";
import Router from "vue-router";
import Usuarios from "./components/usuario/Usuarios";
import Todos from './components/todo/Todos';
import Equipos from './components/equipo/Equipos';
import EquipoDetalle from './components/equipo/EquipoDetalle';
 
Vue.use(Router);
 
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/todos",
      name: "todos",
      component: Todos
    },
    {
      path: "/usuarios",
      name: "usuarios",
      component: Usuarios
    },
    {
      path: "/equipos",
      name: "equipos",
      component: Equipos
    },
    {
      path: "/equipo-detalle/:equipoId",
      name: "equipo-detalle",
      component: EquipoDetalle
    }
  ]
});