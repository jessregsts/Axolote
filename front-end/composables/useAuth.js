import { ref } from 'vue';
import api from '../services/api';

const user = ref(null);

// Autenticacao do usuario
export function useAuth() {
  const login = async (username, password) => {
    try {
      // Requisicoes do login
      const form = new FormData(); 
      form.append('username', username);
      form.append('password', password);

      // Geracao do token para o usuario
      const response = await api.post('/login', form);
      const token = response.data.access_token;
      localStorage.setItem('token', token);

      // Busca dados do usuário que logou
      const me = await api.get('/me');
      user.value = me.data;
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Logout usuario
  const logout = () => {
    localStorage.removeItem('token');
    user.value = null;
  };

  // Pega dados do usuario logado
  const getUser = () => user.value;

  return { login, logout, getUser };
}
