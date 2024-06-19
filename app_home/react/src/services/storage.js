import Cookies from 'js-cookie';

export const storeToken = (token) => {
  try {
    Cookies.set('tokenJwtrenaultRisk', token, { secure: true, sameSite: 'None', expires: 1 / 24 });
  } catch (error) {
    console.error("storeToken error > ", error.message);
  }
};

export const getToken = () => {
  try {
    return Cookies.get('tokenJwtrenaultRisk', { secure: true, sameSite: 'None' });
  } catch (error) {
    console.error("getToken error > ", error.message);
    return null;
  }
};

export const destroyToken = () => {
  try {
    // Remove o cookie que armazena o token JWT
    Cookies.remove('tokenJwtrenaultRisk', { secure: true, sameSite: 'None' });
  } catch (error) {
    console.error("destroyToken error > ", error.message);
  }
};

export const storeUserPerfil = (userPerfil) => {
  try {
    localStorage.setItem("@user_perfil", userPerfil);
  } catch (error) {
    console.error("store userPerfil error > ", error.message);
  }
};

export const getUserPerfil = () => {
  try {
    return localStorage.getItem("@user_perfil");
  } catch (error) {
    console.error("get userPerfil error > ", error.message);
    return null;
  }
};

export const destroyUserPerfil = () => {
  try {
    localStorage.removeItem("@user_perfil");
  } catch (error) {
    console.error("destroy userPerfil error > ", error.message);
  }
};

export const storeUserName = (UserName) => {
  try {
    localStorage.setItem("@user_name", UserName);
  } catch (error) {
    console.error("store UserName error > ", error.message);
  }
};

export const getUserName = () => {
  try {
    return localStorage.getItem("@user_name");
  } catch (error) {
    console.error("get UserName error > ", error.message);
    return null;
  }
};

export const destroyUserName = () => {
  try {
    localStorage.removeItem("@user_name");
  } catch (error) {
    console.error("destroy UserName error > ", error.message);
  }
};

export const storePerfilName = (PerfilName) => {
  try {
    localStorage.setItem("@perfil_name", PerfilName);
  } catch (error) {
    console.error("store PerfilName error > ", error.message);
  }
};

export const getPerfilName = () => {
  try {
    return localStorage.getItem("@perfil_name");
  } catch (error) {
    console.error("get PerfilName error > ", error.message);
    return null;
  }
};

export const destroyPerfilName = () => {
  try {
    localStorage.removeItem("@perfil_name");
  } catch (error) {
    console.error("destroy PerfilName error > ", error.message);
  }
};

export const storeTema = (Tema) => {
  try {
    localStorage.setItem("@tema_usuario", Tema);
  } catch (error) {
    console.error("store Tema error > ", error.message);
  }
};

export const getTema = () => {
  try {
    return localStorage.getItem("@tema_usuario");
  } catch (error) {
    console.error("get Tema error > ", error.message);
    return null;
  }
};

export const destroyTema = () => {
  try {
    localStorage.removeItem("@tema_usuario");
  } catch (error) {
    console.error("destroy Tema error > ", error.message);
  }
};

export const storeLinguagem = (Linguagem) => {
  try {
    localStorage.setItem("@linguagem_usuario", Linguagem);
  } catch (error) {
    console.error("store Linguagem error > ", error.message);
  }
};

export const getLinguagem = () => {
  try {
    return localStorage.getItem("@linguagem_usuario");
  } catch (error) {
    console.error("get Linguagem error > ", error.message);
    return null;
  }
};

export const destroyLinguagem = () => {
  try {
    localStorage.removeItem("@linguagem_usuario");
  } catch (error) {
    console.error("destroy Linguagem error > ", error.message);
  }
};

export const destroyAllApp = () => {
  try {
    localStorage.removeItem("@linguagem_usuario");
    Cookies.remove('tokenJwtrenaultRisk', { secure: true, sameSite: 'None' });
    localStorage.removeItem("@user_perfil");
    localStorage.removeItem("@user_name");
    localStorage.removeItem("@perfil_name");
    localStorage.removeItem("@tema_usuario");
  } catch (error) {
    console.error("destroyAllApp error > ", error.message);
  }
}
