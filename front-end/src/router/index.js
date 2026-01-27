// Arquivo de configuracao das rotas

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import DisciplinasView from '../views/DisciplinasView.vue'
import DisciplinaView from '../views/DisciplinaView.vue'

const routes = [
  // Redireciona raiz para login
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  
  // Redireciona para homepage apos login
  { 
    path: '/home',
    component: HomeView, 
    meta: { requiresAuth: true }
  },

  // Redireciona para pg de disciplinas
  {
    path: '/disciplinas',
    component: DisciplinasView,
    meta: { requiresAuth: true } 
  },

  // Redireciona para pg da disciplina algoritmos
  {
    path: '/disciplinas/:slug',
    component: DisciplinaView,
    props: true,
    meta: { requiresAuth: true } 
  },
]

// Roteador 
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Rotas protegidas por autenticacao
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') 
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
