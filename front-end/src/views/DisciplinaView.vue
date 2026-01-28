<template>
  <div class="home-page">
    <aside class="sidebar">
      <div class="logo">
        <img src="/axolote-logo.png" alt="AxNote" />
      </div>

      <nav class="nav-menu">
        <router-link to="/home" class="nav-item">
          <img src="/casa.png" class="nav-icon" />
          <span>Início</span>
        </router-link>

        <router-link to="/disciplinas" class="nav-item">
          <img src="/disciplinas.png" class="nav-icon" />
          <span>Disciplinas</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <a class="logout-btn" @click="handleLogout">
          <img src="/sair.png" class="logout-icon" />
          <span>Sair</span>
        </a>
      </div>
    </aside>

    <main class="content">
      <div class="breadcrumb">
        <router-link to="/disciplinas" class="breadcrumb-link">Disciplinas</router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ disciplina.codigo }}</span>
      </div>

      <div class="discipline-header">
        <h1>{{ disciplina.nome }}</h1>
        <div class="professor-info">
          <p class="professor-name">{{ disciplina.professor }}</p>
          <a :href="`mailto:${disciplina.email}`" class="professor-email">
            {{ disciplina.email }}
          </a>
        </div>
        <hr class="header-divider" />
      </div>

      <div class="navigation-menu">
        <button 
          v-for="item in menuItems" 
          :key="item.id"
          :class="['menu-btn', { 'active': selectedMenu === item.id }]"
          @click="selectMenu(item.id)"
        >
          {{ item.name }}
        </button>
      </div>

      <div class="main-content">
        <div class="section-content">
          
          <!-- Lista de Materiais -->
          <div v-if="selectedMenu === 'materiais'" class="materials-section">
            <h2>Lista de Materiais</h2>
            
            <div class="material-item">
              <div class="material-content">
                <h3 class="material-title">Plano de Ensino</h3>
                <span class="material-date">19 de abril de 2024</span>
              </div>
              <button class="download-btn" @click="downloadMaterial('plano_ensino.pdf')">
                <span>Download</span>
                <svg class="download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </button>
            </div>

            <!-- Descricao dos materiais -->
            <div class="material-item">
              <div class="material-content">
                <h3 class="material-title">Apostila de Algoritmos - Capítulos 1 e 2</h3>
                <span class="material-date">15 de abril de 2024</span>
              </div>
              <button class="download-btn" @click="downloadMaterial('apostila_algoritmos.pdf')">
                <span>Download</span>
                <svg class="download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </button>
            </div>

            <div class="material-item">
              <div class="material-content">
                <h3 class="material-title">Slides Aula 01 - Introdução à Programação</h3>
                <span class="material-date">12 de abril de 2024</span>
              </div>
              <button class="download-btn" @click="downloadMaterial('slides_aula01.pdf')">
                <span>Download</span>
                <svg class="download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </button>
            </div>

            <div class="material-item">
              <div class="material-content">
                <h3 class="material-title">exemplos_algoritmos.zip</h3>
                <span class="material-date">10 de abril de 2024</span>
              </div>
              <button class="download-btn" @click="downloadMaterial('exemplos_algoritmos.zip')">
                <span>Download</span>
                <svg class="download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Participantes -->
          <div v-if="selectedMenu === 'participantes'" class="participants-section">
            <h2>Participantes</h2>
            <div class="participants-list">
              <div v-for="participant in participants" :key="participant.id" class="participant">
                <div class="participant-avatar">
                  {{ participant.name.charAt(0) }}
                </div>
                <div class="participant-info">
                  <p class="participant-name">{{ participant.name }}</p>
                  <p class="participant-email">{{ participant.email }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Mala Direta -->
          <div v-if="selectedMenu === 'mala-diretas'" class="mailing-section">
            <h2>Mala Direta</h2>
            
            <div class="mailing-form">
              <div class="form-group">
                <label>Destinatário:</label>
                <select v-model="mailForm.recipient" class="form-control">
                  <option value="">Selecione...</option>
                  <option value="professor">{{ disciplina.professor.replace('Responsável: ', '') }}</option>
                  <option value="todos">Todos os participantes</option>
                  <option v-for="p in participants" :key="p.id" :value="p.email">
                    {{ p.name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Título:</label>
                <input 
                  type="text" 
                  v-model="mailForm.subject" 
                  placeholder="Digite o título"
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label>Mensagem:</label>
                <textarea 
                  v-model="mailForm.message" 
                  placeholder="Digite sua mensagem"
                  class="form-control"
                  rows="6"
                ></textarea>
              </div>

              <div class="form-group">
                <label>Anexar arquivo:</label>
                <div class="file-upload">
                  <input 
                    type="file" 
                    @change="handleFileUpload" 
                    ref="fileInput"
                    class="file-input"
                  >
                  <button type="button" @click="triggerFileInput" class="attach-btn">
                    Escolher arquivo
                  </button>
                  <span v-if="mailForm.attachment" class="file-name">
                    {{ mailForm.attachment.name }}
                  </span>
                </div>
              </div>

              <div class="form-buttons">
                <button @click="sendMessage" class="send-btn" :disabled="!canSend">
                  Enviar
                </button>
                <button @click="clearForm" class="clear-btn">
                  Limpar
                </button>
              </div>
            </div>
          </div>

          <!-- Trabalho Colaborativo -->
          <div v-if="selectedMenu === 'trabalho-colaborativo'" class="collaborative-section">
            <h2>Trabalho Colaborativo</h2>
            
            <div class="collaborative-work">
              <div class="work-header">
                <h3>Trabalho 2</h3>
                <span class="work-date">15 de fevereiro de 2025</span>
              </div>
              
              <div class="work-content">
                <p class="work-description">O Trabalho 2 poderá ser realizado individualmente ou em equipes de até 4 alunos. A postagem do mesmo deverá ser feito até dia 29/02. Boa sorte. Att, Maria.</p>
                
                <div class="work-attachment">
                  <div class="attachment-info">
                    <span class="attachment-name">Trabalho2.pdf</span>
                    <button class="download-work-btn" @click="downloadWork">
                      Baixar
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="work-actions">
                <button class="publish-btn" @click="showModal = true">
                  Publicar Resposta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Enviar resposta</h3>
        
        <div class="modal-body">
          <div class="form-group">
            <label>Título:</label>
            <input 
              type="text" 
              v-model="responseTitle" 
              placeholder="Digite o título"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label>Mensagem:</label>
            <textarea 
              v-model="responseMessage" 
              placeholder="Digite sua mensagem"
              class="form-control"
              rows="4"
            ></textarea>
          </div>

          <div class="form-group">
            <label>Arquivo:</label>
            <input 
              type="file" 
              class="form-control"
            >
          </div>
        </div>
        
        <div class="modal-buttons">
          <button @click="sendResponse" class="modal-send-btn">
            Enviar
          </button>
          <button @click="showModal = false" class="modal-close-btn">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'DisciplinaView',
  
  setup() {
    // Dados mocados da disciplina (simulacao)
    const disciplina = ref({
      codigo: 'COP123',
      nome: 'Algoritmos e Programação',
      professor: 'Responsável: Dr. Maria Carvalho',
      email: 'maria.carvalho@udesc.br'
    })

    // Formulario de mala direta
    const mailForm = ref({
      recipient: '',
      subject: '',
      message: '',
      attachment: null
    })

    const responseTitle = ref('')
    const responseMessage = ref('')
    const showModal = ref(false)
    const fileInput = ref(null)

    // Itens do menu de navegacao
    const menuItems = ref([
      { id: 'materiais', name: 'Lista de Materiais' },
      { id: 'participantes', name: 'Participantes' },
      { id: 'mala-diretas', name: 'Mala Direta' },
      { id: 'trabalho-colaborativo', name: 'Trabalho Colaborativo' }
    ])

    // Dados mocados dos participantes
    const participants = ref([
      { id: 1, name: 'Pedro Silva', email: 'pedro.silva@udesc.br' },
      { id: 2, name: 'Maria Santos', email: 'maria.santos@udesc.br' },
      { id: 3, name: 'Carlos Oliveira', email: 'carlos.oliveira@udesc.br' },
      { id: 4, name: 'Ana Costa', email: 'ana.costa@udesc.br' },
      { id: 5, name: 'João Pereira', email: 'joao.pereira@udesc.br' }
    ])

    const selectedMenu = ref('materiais')

    // Habilita envio soh se todos os campos obrigatorios estiverem preenchidos
    const canSend = computed(() => {
      return mailForm.value.recipient && 
             mailForm.value.subject.trim() !== '' && 
             mailForm.value.message.trim() !== ''
    })

    const selectMenu = (menuId) => {
      selectedMenu.value = menuId
    }

    const downloadMaterial = (filename) => {
      alert(`Download: ${filename}`)
    }

    const downloadWork = () => {
      alert('Baixando Trabalho2.pdf')
    }

    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        mailForm.value.attachment = file
      }
    }

    const sendMessage = () => {
      if (!canSend.value) return
      alert('Mensagem enviada!')
      clearForm()
    }

    // Limpa o formulario da mala direta
    const clearForm = () => {
      mailForm.value = {
        recipient: '',
        subject: '',
        message: '',
        attachment: null
      }
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }

    const sendResponse = () => {
      if (!responseTitle.value.trim() || !responseMessage.value.trim()) {
        alert('Preencha título e mensagem!')
        return
      }
      alert('Resposta enviada!')
      responseTitle.value = ''
      responseMessage.value = ''
      showModal.value = false
    }

    // Simula logout -- INCOMPLETO 
    const handleLogout = () => {
      if (confirm('Sair?')) {
        alert('Redirecionando para login...')
      }
    }

    // Inicializa fileInput quando o componente eh montado
    onMounted(() => {
      // Como jah temos dados fixos, nao precisa carregar nada
    })

    return {
      disciplina,
      mailForm,
      responseTitle,
      responseMessage,
      showModal,
      fileInput,
      menuItems,
      participants,
      selectedMenu,
      canSend,
      selectMenu,
      downloadMaterial,
      downloadWork,
      triggerFileInput,
      handleFileUpload,
      sendMessage,
      clearForm,
      sendResponse,
      handleLogout
    }
  }
}
</script>

<style scoped>

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
  padding: 40px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #666;
}

.breadcrumb-link {
  color: #2f6f68;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb-link:hover {
  color: #255a54;
  text-decoration: underline;
}

.breadcrumb-separator {
  color: #999;
}

.breadcrumb-current {
  color: #333;
  font-weight: 600;
}

.discipline-header {
  margin-bottom: 30px;
}

.discipline-header h1 {
  color: #333;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 15px;
}

.professor-info {
  margin-bottom: 20px;
}

.professor-name {
  color: #555;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
}

.professor-email {
  color: #2f6f68;
  font-size: 16px;
  text-decoration: none;
}

.professor-email:hover {
  color: #255a54;
  text-decoration: underline;
}

.header-divider {
  border: none;
  border-top: 2px solid #e0e0e0;
  margin: 20px 0 30px 0;
}

.navigation-menu {
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.menu-btn {
  padding: 12px 24px;
  background-color: #f0f9f8;
  color: #2f6f68;
  border: 2px solid #2f6f68;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  min-width: 120px;
  text-align: center;
}

.menu-btn:hover {
  background-color: #e0f2f0;
  transform: translateY(-2px);
}

.menu-btn.active {
  background-color: #2f6f68;
  color: white;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section-content {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 30px;
  border: 1px solid #e0e0e0;
}

.materials-section h2,
.participants-section h2,
.mailing-section h2,
.collaborative-section h2 {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
}

.material-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
}

.material-content {
  flex: 1;
}

.material-title {
  color: #2f6f68;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

.material-date {
  color: #666;
  font-size: 14px;
}

.download-btn {
  padding: 10px 20px;
  background-color: #2f6f68;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.download-btn:hover {
  background-color: #255a54;
}

.participants-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.participant {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.participant:hover {
  background-color: #f0f9f8;
}

.participant-avatar {
  width: 40px;
  height: 40px;
  background-color: #2f6f68;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.participant-name {
  color: #333;
  font-weight: 500;
}

.participant-email {
  color: #666;
  font-size: 14px;
}

.mailing-form {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.form-control:focus {
  outline: none;
  border-color: #2f6f68;
}

.file-upload {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-input {
  display: none;
}

.attach-btn {
  padding: 8px 16px;
  background-color: #f0f9f8;
  color: #2f6f68;
  border: 1px solid #2f6f68;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.attach-btn:hover {
  background-color: #e0f2f0;
}

.file-name {
  font-size: 14px;
  color: #666;
}

.form-buttons {
  display: flex;
  gap: 15px;
  margin-top: 25px;
}

.send-btn {
  padding: 10px 25px;
  background-color: #2f6f68;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
}

.send-btn:hover:not(:disabled) {
  background-color: #255a54;
}

.send-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.clear-btn {
  padding: 10px 25px;
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
}

.clear-btn:hover {
  background-color: #f8f9fa;
}

.collaborative-work {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.work-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.work-header h3 {
  color: #2f6f68;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
}

.work-date {
  color: #666;
  font-size: 14px;
}

.work-content {
  margin-bottom: 25px;
}

.work-description {
  color: #333;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.work-attachment {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.attachment-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.attachment-name {
  color: #333;
  font-weight: 500;
}

.download-work-btn {
  padding: 6px 12px;
  background-color: #2f6f68;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.download-work-btn:hover {
  background-color: #255a54;
}

.work-actions {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
}

.publish-btn {
  padding: 12px 30px;
  background-color: #2f6f68;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.publish-btn:hover {
  background-color: #255a54;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 25px;
}

.modal-content h3 {
  color: #333;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  gap: 15px;
}

.modal-send-btn {
  padding: 12px 30px;
  background-color: #2f6f68;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
}

.modal-send-btn:hover {
  background-color: #255a54;
}

.modal-close-btn {
  padding: 12px 30px;
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
}

.modal-close-btn:hover {
  background-color: #f8f9fa;
}
</style>
