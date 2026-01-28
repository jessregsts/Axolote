<template>
  <div class="home-page">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <img src="/axolote-logo.png" alt="Axolote" />
      </div>

      <!-- Icone Casinha -->
      <nav class="nav-menu">
        <a class="nav-item active">
          <img src="/casa.png" class="nav-icon" />
          <span>Início</span>
        </a>

        <!--- Icone Livros -->
        <router-link to="/disciplinas" class="nav-item">
          <img src="/disciplinas.png" class="nav-icon" />
          <span>Disciplinas</span>
        </router-link>
        
      </nav>

      <!-- Icone de logout -->
      <div class="sidebar-footer">
        <a class="logout-btn">
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
            <img :src="aluno.foto" :alt="aluno.nome" class="avatar" />
          </div>
          <div class="profile-details">
            <h1>Bem-vindo, {{ aluno.nome }}! 👋</h1>
            <div class="course-info">
              <p><strong>Curso:</strong> {{ aluno.curso }}</p>
              <p><strong>Semestre:</strong> {{ aluno.semestre }}</p>
            </div>
          </div>
          <div class="udesc-logo-container">
            <img src="/udesc-logo.png" alt="UDESC" class="udesc-logo" />
          </div>
        </div>
      </div>

      <hr class="divider" />

      <!-- Tabela Disciplinas Matriculadas -->
      <section class="disciplines-section">
        <h2>Disciplinas Matriculadas</h2>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Disciplina</th>
                <th>Professor</th>
                <th>Horário</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="disciplina in disciplinas" :key="disciplina.codigo">
                <td>{{ disciplina.codigo }}</td>
                <td>{{ disciplina.nome }}</td>
                <td>{{ disciplina.professor }}</td>
                <td>{{ disciplina.horario }}</td>
                <td>
                  <button class="details-btn">Ver detalhes</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// Dados mocados do aluno e disciplinas
const aluno = {
  nome: 'Pedro',
  curso: 'Ciências da Computação',
  semestre: '2026.1',
  foto: '/public/pessoa.png'
}

const disciplinas = [
  {
    codigo: 'COP123',
    nome: 'Algoritmos e Programação',
    professor: 'Dr. Maria Carvalho',
    horario: 'Seg. Qua- 10:00 às 12:00'
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
]
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* Fundo homepage */
.home-page {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #2f6f68 0%, #5fa7a1 35%, #f2a7b8 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  gap: 20px;
}


/* Sidebar */
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

/* Logo */
.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.logo img {
  max-width: 180px;
  height: auto;
}

/* Menu de navegacao */
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
/* Fim menu de navegacao */

/* Botao de logout */
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
}
/* Fim botao de logout */

/* Background transparente */
.profile-header {
  position: relative;
  background: linear-gradient(135deg, rgba(47, 111, 104, 0.7) 0%, rgba(95, 167, 161, 0.7) 35%, rgba(242, 167, 184, 0.7) 100%);
  border-radius: 20px 20px 0 0;
  padding: 40px;
  min-height: 200px;
  display: flex;
  align-items: center;
}


/* Perfil do usuario */
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
/* Fim perfil do usuario */


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

/* Logo UDESC  */
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
/* Fim Logo UDESC  */

.divider {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 0;
}

/* Secao disciplinas */
.disciplines-section {
  padding: 40px;
  flex: 1;
}

.disciplines-section h2 {
  color: #333;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 600;
}

.table-container {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #2f6f68;
}

th {
  color: white;
  font-weight: 600;
  padding: 18px 20px;
  text-align: left;
  font-size: 15px;
}

tbody tr {
  border-bottom: 1px solid #eaeaea;
}

tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

tbody tr:nth-child(odd) {
  background-color: white;
}

td {
  padding: 18px 20px;
  color: #444;
  font-size: 14px;
}
/* Fim secao disciplinas */

/* Botao detalhes disciplinas - NAO ESTAO FUNCIONAIS, ARRUMAR DEPOIS */
.details-btn {
  background-color: #2f6f68;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.details-btn:hover {
  background-color: #255a54;
}
</style>
