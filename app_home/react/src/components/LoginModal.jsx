import React, { useState } from "react";
import { storeUserId, storeUserName, storeUserPerfil, storeToken } from "~/services/storage";
import { useNavigate } from "react-router-dom";
import messages from "~/misc/messages";
import { ACTIVE_STATUS } from "~/misc/generalValues";
import apiEWS from "~/services/apiEWS";

// Função para exibir mensagens de erro
const showUserMessage = (title, text) => {
    alert(`${title}: ${text}`);
};

export const LoginModal = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const toggle = () => {
        document.querySelector('.loginNecessario').classList.add('naoExibir');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiEWS.post('/usuarios/login', { user: username, password });
            if (response?.data?.ewsError === true) {
                showUserMessage(
                    messages.auth.login_invalid.title,
                    response?.data?.ewsErrorMessage || messages.auth.login_invalid.text
                );
                return;
            }
            if (response?.data?.message === "Cadastre nova senha") {
                storeUserId(response?.data?.idUsuario);
                storeUserName(username);
                navigate("/Cadastro");
                return;
            }
            if (response?.data?.situacaoUsuario === ACTIVE_STATUS) {
                storeUserId(response?.data?.idUsuario);
                storeUserPerfil(response?.data?.idPerfil);
                storeToken(response.data.tokenJwt);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                showUserMessage(
                    messages.auth.connect_api_error.title,
                    "Senha incorreta ao tentar logar!"
                );
                return;
            }
            showUserMessage(
                messages.auth.connect_api_error.title,
                messages.auth.connect_api_error.text,
            );
        }
        toggle();
    };

    return (
        <div className="modal-backdrop-login loginNecessario naoExibir naoImprimir">
            <div className="modal-login">
                <div className="modal-header-login">
                    <h5 className="modal-title">Login</h5>
                    <button type="button" className="close" onClick={toggle}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body-login">
                        <div className="form-group">
                            <label htmlFor="username">USUARIO</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">SENHA</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer-login">
                        <button type="button" className="botao-animado" onClick={toggle}><span>CANCELAR</span></button>
                        <button type="submit" className="botao-animado"><span>ENVIAR</span></button>
                    </div>
                </form>
            </div>
        </div>
    )
};
