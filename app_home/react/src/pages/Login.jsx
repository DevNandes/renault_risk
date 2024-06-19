import React from 'react';
import { useNavigate } from "react-router-dom";

// Services
import { apiRWS } from "~/services/apiRWS"
import {
	storeToken,
	storeUserPerfil,
	storeUserName,
	storePerfilName,
	storeTema,
	storeLinguagem,
	destroyAllApp
} from '~/services/storage'

// Funcoes
import { notify } from "~/functions/notifications"

// Assets
import logo from "~/assets/logo.png"
import returns from "~/assets/returns.png"
import avatar from "~/assets/logo.png"

// Styles
import '~/styles/Login.css';

export const Login = () => {
	const navigate = useNavigate();

	// Funcoes
	const executaLogin = async (e) => {
		// Evita o comportamento padrão do formulário (recarregar a página)
		e.preventDefault();
		// Cria um objeto FormData a partir do formulário
		const formData = new FormData(e.target);
		// Converte o FormData em um objeto
		const data = Object.fromEntries(formData);

		let response;
		// Envia dados para a API
		try {
			response = await apiRWS.post("/app/login", data);
			destroyAllApp()
			storeToken(response.data.jwtToken)
			storeUserPerfil(response.data.idPerfil)
			storePerfilName(response.data.nomePerfil)
			storeTema(response.data.tema)
			storeLinguagem(response.data.linguagem)
			storeUserName(response.data.nomeUsuario)
			window.location.reload();
			notify({ message: response.data.mensagem, type: "success" });
		} catch (error) {
			// Verifica se o error.response está disponível
			if (error.response) {
				notify({ message: error.response.data.mensagem, type: "error" });
			} else {
				// Mensagem de erro genérica se não houver response disponível
				notify({ message: "Erro ao enviar os dados", type: "error" });
			}
			console.error('Erro ao enviar os dados:', error);
		}
	}

	return (
		<div className="tela-login">
			<div className="form-wrapper">
				<main className="form-side">
					<a href="https://www.renault.com.br/" target="_blank" rel="noreferrer">
						<img src={logo} alt="Renault Logo" className="logo" />
					</a>
					<form className="my-form" onSubmit={executaLogin}>
						<div className="form-welcome-row">
							<h1>Bem-Vindo! &#128079;</h1>
							<h2>Entre com sua credencias de login!</h2>
						</div>
						<div className="text-field">
							<label htmlFor="email">E-mail</label>
							<input
								type="email"
								id="email"
								name="email"
								autoComplete="off"
								placeholder="voce@exemplo.com"
								required
							/>
							<div className="error-message">Email está em um formato incorreto</div>
						</div>
						<div className="text-field">
							<label htmlFor="password">Senha</label>
							<input
								id="password"
								type="password"
								name="password"
								placeholder="Sua senha"
								title="Minimo de 6 caracteres Ao menos 1 letra e 1 Numero"
								pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
								required
							/>
							<div className="error-message">Mínimo de 6 caracteres do alfabeto e um número!</div>
						</div>
						<button className="my-form__button" type="submit">
							Entrar
						</button>
						<div className="my-form__actions">
							<div className="my-form__row">
								<span>Não tem uma conta?</span>
								<a href="/cadastro" className="botao-cadastra" title="Reseta Senha">
									Cadastre-se Agora!
								</a>
							</div>
						</div>
					</form>
				</main>
				<aside className="info-side">
					<div className="blockquote-wrapper">
						<img src={returns} alt="Returns" className="returns" />
						<blockquote>
							A única que se destaca em todos os quesitos, a marca que realmente MARCA!
						</blockquote>
						<div className="author">
							<img src={avatar} alt="Avatar" className="avatar" />
							<span className="author-name">@renault_brasil</span>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
