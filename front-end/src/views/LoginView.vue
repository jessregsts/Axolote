<!-- Arquivo da pg de login -->

<template>
  <div class="login-page">
    <!-- Area ajuda -->
    <a
      class="help-link"
      href="https://www.udesc.br/arquivos/esag/id_cpmenu/1909/POLVO__Tutorial_Alunos__LABTIC_15919952790522_1909.pdf"
      target="_blank"
    >
      Ajuda - Como entrar no Axolote?
    </a>

    <!-- Logo da UDESC -->
    <a
      class="udesc-logo"
      href="https://www.udesc.br/"
      target="_blank"
      title="UDESC"
    >
      <img src="/udesc-logo.png" alt="UDESC" />
    </a>

    <div class="login-container">
      <!-- Logo Axolote -->
      <div class="brand">
        <img
          src="/axolote-logo.png"
          alt="Axolote"
          class="axolote-logo"
          @click="irParaLogin"
        />
      </div>

      <!-- Telinha de login -->
      <div class="form">
        <label>Usuário</label>
        <input v-model="email" type="text" placeholder="E-mail / CPF / Matrícula" />

        <a class="field-link" @click="abrirModalUsuario">
          Esqueceu seu usuário?
        </a>

        <label>Senha</label>
        <input v-model="password" type="password" />

        <a class="field-link" @click="abrirModalSenha">
          Esqueceu sua senha?
        </a>

        <button class="btn-login" @click="entrar">
          Entrar
        </button>

        <a class="qr-link" @click="abrirModalQr">
          Usar QR-Code
        </a>

        <p v-if="error" style="color: yellow; margin-top: 10px;">Login falhou</p>
      </div>
    </div>

    <!-- Telinha QRcode -->
    <div v-if="mostrarModalQr" class="modal-overlay">
      <div class="modal">
        <h2>Em construção 🚧</h2>
        <p>Funcionalidade em desenvolvimento.</p>
        <button class="modal-primary" @click="fecharModais">
          Fechar
        </button>
      </div>
    </div>

    <!-- Telinha Esqueceu Usuario -->
    <div v-if="mostrarModalUsuario" class="modal-overlay">
      <div class="modal">
        <h2>Esqueceu seu usuário? 📧</h2>
        <p>Digite seu e-mail e enviaremos seu usuário.</p>

        <input
          type="email"
          class="modal-input"
          placeholder="Digite seu e-mail"
        />

        <div class="modal-actions">
          <button class="modal-secondary" @click="fecharModais">
            Fechar
          </button>
          <button class="modal-primary" @click="fecharModais">
            Recuperar usuário
          </button>
        </div>
      </div>
    </div>

    <!-- Telinha Esqueceu Senha -->
    <div v-if="mostrarModalSenha" class="modal-overlay">
      <div class="modal">
        <h2>Esqueceu sua senha? 🔐</h2>
        <p>Informe seu e-mail para receber uma senha temporária.</p>

        <input
          type="email"
          class="modal-input"
          placeholder="Digite seu e-mail"
        />

        <div class="modal-actions">
          <button class="modal-secondary" @click="fecharModais">
            Fechar
          </button>
          <button class="modal-primary" @click="fecharModais">
            Recuperar senha
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter() // redirecionamento

const email = ref('') // dados do login
const password = ref('') // dados do password
const error = ref(false)

// Mostra telinhas/popoups
const mostrarModalQr = ref(false)
const mostrarModalUsuario = ref(false)
const mostrarModalSenha = ref(false)

// Se logado (token existe), redireciona automaticamente
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    router.push('/home')
  }
})

// Funcao de login
async function entrar() {
  try {
    const params = new URLSearchParams()
    params.append('username', email.value)
    params.append('password', password.value)
    params.append('grant_type', 'password') 

    const response = await api.post('/login', params)
    const token = response.data.access_token
    localStorage.setItem('token', token)

    // Busca dados do usuário logado
    const me = await api.get('/me')
    localStorage.setItem('userEmail', me.data.email || email.value)

    error.value = false
    router.push('/home')
  } catch (err) {
    console.error(err)
    error.value = true
  }
}


// Funcoes de controle de telas
function irParaLogin() {
  router.push('/login')
}

function abrirModalQr() { mostrarModalQr.value = true }
function abrirModalUsuario() { mostrarModalUsuario.value = true }
function abrirModalSenha() { mostrarModalSenha.value = true }
function fecharModais() {
  mostrarModalQr.value = false
  mostrarModalUsuario.value = false
  mostrarModalSenha.value = false
}
</script>

<style scoped>
/* CSS*/
.login-page { /* Pagina de login */
  min-height: 100vh;
  background: #2f6f68;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, sans-serif;
  position: relative;
}

.help-link { /* Link de ajuda */
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
  text-decoration: underline;
  font-size: 13px;
}

.form label { /* Campos labels */
  color: #fff;
  margin-top: 12px;
  font-size: 13px;
}

.field-link,
.qr-link { 
  font-size: 13px;
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 4px;
}

.udesc-logo {
  position: absolute;
  top: 20px;
  right: 20px;
}

.udesc-logo img {
  height: 40px;
}

.login-container { /* Container login */
  width: 900px;
  background: linear-gradient(90deg, #4fa3a5, #f4b6c2);
  display: flex;
  padding: 40px;
  border-radius: 8px;
}

.brand { /* Area para o logo axolote */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.axolote-logo {
  width: 240px;
  cursor: pointer;
}

.form {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form input {
  height: 36px;
  border-radius: 4px;
  border: none;
  padding: 0 10px;
}

.btn-login { /* Botao de login */
  margin-top: 20px;
  height: 40px;
  background: #f28ca3;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}


.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal { 
  background: #fff;
  padding: 24px;
  width: 360px;
  border-radius: 8px;
  text-align: center;
}

.modal-input { 
  width: 100%;
  height: 36px;
  margin: 12px 0;
  padding: 0 10px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.modal-primary {
  flex: 1;
  background: #2f6f68;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
}

.modal-secondary {
  flex: 1;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
}
</style>
