<template>
  <div class="home-page">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <img src="/axolote-logo.png" alt="Axolote" />
      </div>

      <!-- Icone casinha -->
      <nav class="nav-menu">
        <router-link to="/home" class="nav-item">
          <img src="/casa.png" class="nav-icon" />
          <span>Início</span>
        </router-link>

        <!--- Icone Livros -->
        <router-link to="/disciplinas" class="nav-item active">
          <img src="/disciplinas.png" class="nav-icon" />
          <span>Disciplinas</span>
        </router-link>
      </nav>

      <!-- Icone logout -->
      <div class="sidebar-footer">
        <a class="logout-btn" @click="handleLogout">
          <img src="/sair.png" class="logout-icon" />
          <span>Sair</span>
        </a>
      </div>
    </aside>

    <main class="content">
      <!-- Profile Header -->
      <div class="profile-header">
        <div class="profile-bg"></div>
        <div class="profile-info">
          <div class="profile-avatar">
            <img src="/public/pessoa.png" alt="Pedro" class="avatar" />
          </div>
          <div class="profile-details">
            <h1>Bem-vindo, Pedro! 👋</h1>
            <div class="course-info">
              <p><strong>Curso:</strong> Ciências da Computação</p>
              <p><strong>Semestre:</strong> 2026.1</p>
            </div>
          </div>
          <div class="udesc-logo-container">
            <img src="/udesc-logo.png" alt="UDESC" class="udesc-logo" />
          </div>
        </div>
      </div>

      <hr class="divider" />

      <!-- Page Header -->
      <div class="page-header">
        <h1>Minhas Disciplinas</h1>
        <p class="subtitle">Selecione uma disciplina para acessar:</p>
      </div>

      <!-- Cards Disciplines -->
      <section class="disciplines-grid">
        <div class="grid-column">
          <div 
            v-for="disciplina in disciplinas.slice(0, 2)" 
            :key="disciplina.codigo" 
            class="discipline-card"
          >
            <div class="discipline-header">
              <h2 class="discipline-code">{{ disciplina.codigo }}</h2>
              <h3 class="discipline-name">{{ disciplina.nome }}</h3>
            </div>
            
            <div class="discipline-info">
              <p class="professor">{{ disciplina.professor }}</p>
              <p class="schedule">{{ disciplina.horario }}</p>
            </div>

            <!-- Botão de acesso para disciplina individual -->
            <div class="discipline-actions">
              <button 
                class="action-btn access-btn"
                @click="acessarDisciplina(disciplina)"
              >
                Acessar disciplina
              </button>
            </div>
          </div>
        </div>

        <div class="grid-column">
          <div 
            v-for="disciplina in disciplinas.slice(2, 4)" 
            :key="disciplina.codigo" 
            class="discipline-card"
          >
            <div class="discipline-header">
              <h2 class="discipline-code">{{ disciplina.codigo }}</h2>
              <h3 class="discipline-name">{{ disciplina.nome }}</h3>
            </div>
            
            <div class="discipline-info">
              <p class="professor">{{ disciplina.professor }}</p>
              <p class="schedule">{{ disciplina.horario }}</p>
            </div>

            <!-- Botão de acesso para disciplina individual -->
            <div class="discipline-actions">
              <button 
                class="action-btn access-btn"
                @click="acessarDisciplina(disciplina)"
              >
                Acessar disciplina
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

// Dados mocados das disciplinas
const disciplinas = ref([
  {
    codigo: 'COP123',
    nome: 'Algoritmos e Programação',
    professor: 'Dr. Maria Carvalho',
    horario: 'Seg, Qua - 10:00 às 12:00'
  },
  {
    codigo: 'MAT456',
    nome: 'Cálculo Diferencial e Integral',
    professor: 'Prof. Carlos Pereira',
    horario: 'Ter, Qui - 14:00 às 16:00'
  },
  {
    codigo: 'FIS789',
    nome: 'Física I',
    professor: 'Dr. Ana Souza',
    horario: 'Seg, Sex - 08:00 às 10:00'
  },
  {
    codigo: 'DIS321',
    nome: 'Banco de Dados',
    professor: 'Prof. Ricardo Lima',
    horario: 'Qua, Sex - 16:00 às 18:00'
  }
])

// Funcao para acessar a disciplina individual
const acessarDisciplina = (disciplina) => {
    router.push(`/disciplinas/${disciplina.codigo}`)
}

// Funcao de logout - FALTOU IMPLEMENTAR CERTINHO
const handleLogout = () => {
  if (confirm('Tem certeza que deseja sair?')) {
    router.push('/login')
  }
}
</script>

<style scoped> /* Repeticao CSS geral */ 
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-page {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #2f6f68 0%, #5fa7a1 35%, #f2a7b8 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  gap: 20px;
}


.sidebar {
  width: 280px;
  background: rgba(47, 111, 104, 0.95);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 30px 25px;
  border-radius: 20px;
  flex-shrink: 0;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.logo img {
  max-width: 180px;
  height: auto;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 12px 15px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.15);
  font-weight: 600;
}

.nav-icon {
  width: 65px;
  height: 65px;
  margin-right: 15px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.nav-item span {
  font-size: 16px;
}


.sidebar-footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 100%;
  cursor: pointer;
  border: none;
  font-family: inherit;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.logout-icon {
  width: 65px;
  height: 65px;
  margin-right: 15px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}


.content {
  flex: 1;
  background-color: white;
  border-radius: 20px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}


.profile-header {
  position: relative;
  background: linear-gradient(135deg, rgba(47, 111, 104, 0.7) 0%, rgba(95, 167, 161, 0.7) 35%, rgba(242, 167, 184, 0.7) 100%);
  border-radius: 20px 20px 0 0;
  padding: 40px;
  min-height: 200px;
  display: flex;
  align-items: center;
}

.profile-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/profile-bg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  border-radius: 20px 20px 0 0;
  z-index: 1;
}

.profile-info {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 40px;
}

.profile-avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.profile-details {
  flex: 1;
}

.profile-details h1 {
  color: white;
  font-size: 32px;
  margin-bottom: 15px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.course-info {
  display: flex;
  gap: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.course-info p {
  color: #2f6f68;
  font-size: 16px;
  margin: 0;
  font-weight: 500;
}

.course-info strong {
  color: #255a54;
  margin-right: 5px;
}

.udesc-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  margin-top: -85px;
  margin-right: -15px;
  padding: 0;
  flex-shrink: 0;
  width: 160px;
  height: 160px;
}

.udesc-logo {
  max-width: 160px;
  max-height: 160px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.divider {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 0;
}


.page-header {
  padding: 30px 40px 20px;
}

.page-header h1 {
  color: #2f6f68;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-header .subtitle {
  color: #666;
  font-size: 16px;
  font-weight: 400;
}

/* Organiza layout das disciplinas em duas colunas */
.disciplines-grid {
  padding: 0 40px 40px;
  display: flex;
  gap: 30px;
  flex: 1;
  overflow-y: auto;
}

.grid-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* Card de disciplina */
.discipline-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.discipline-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-color: #5fa7a1;
}

.discipline-header {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

/* Informacoes das disciplinas */
.discipline-code {
  color: #2f6f68;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
}

.discipline-name {
  color: #333;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
}

.discipline-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  flex: 1;
}

.professor {
  color: #555;
  font-size: 16px;
  font-weight: 500;
}

.schedule {
  color: #2f6f68;
  font-size: 15px;
  font-weight: 500;
  background-color: #f0f9f8;
  padding: 8px 12px;
  border-radius: 6px;
  display: inline-block;
  width: fit-content;
}
/* Fim informacoes das disciplinas */

/* Botão de acesso */
.discipline-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.action-btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
  width: 100%;
}

.access-btn {
  background-color: #2f6f68;
  color: white;
}

.access-btn:hover {
  background-color: #255a54;
}

/* Responsividade */
@media (max-width: 1200px) {
  .disciplines-grid {
    flex-direction: column;
  }
  
  .grid-column {
    flex-direction: row;
  }
  
  .discipline-card {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .home-page {
    flex-direction: column;
    padding: 10px;
  }
  
  .sidebar {
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: 15px 20px;
    margin-bottom: 10px;
  }
  
  .logo {
    margin-bottom: 0;
    margin-right: 20px;
  }
  
  .logo img {
    max-width: 120px;
  }
  
  .nav-menu {
    flex-direction: row;
    margin-bottom: 0;
  }
  
  .sidebar-footer {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
    margin-left: auto;
  }
  
  .logout-btn {
    width: auto;
    padding: 8px 15px;
  }
  
  .grid-column {
    flex-direction: column;
  }
}
</style>
