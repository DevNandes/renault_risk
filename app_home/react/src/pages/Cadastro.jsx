import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Services
import { apiRWS } from "~/services/apiRWS"

// Funcoes
import { notify } from "~/functions/notifications"

// Assets
import logo from "~/assets/logo.png"
import returns from "~/assets/returns.png"
import avatar from "~/assets/logo.png"

// Styles
import '~/styles/Login.css';

export const Cadastro = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});

	// Funcoes
	const cadastraUsuario = async (e) => {
		// Evita o comportamento padrão do formulário (recarregar a página)
		e.preventDefault();
		// Cria um objeto FormData a partir do formulário
		const formData = new FormData(e.target);
		// Converte o FormData em um objeto
		const data = Object.fromEntries(formData);

		const errors = {};
		let formIsValid = true

		// Validações personalizadas
		if (data.password !== data["confirm-password"]) {
			const message = "As senhas não coincidem"
			errors.passwordConfirm = message
			formIsValid = false
		}

		setErrors(errors);

		if (!formIsValid) {
			return;
		}

		// Envia dados para a API
		try {
			await apiRWS.post("/app/cadastro", data);
			notify({ message: "Usuário cadastrado com sucesso!", type: "success" });
			navigate("/login");
		} catch (error) {
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
					<form className="my-form" onSubmit={cadastraUsuario}>
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
							<label htmlFor="username">Nome de Usuário</label>
							<input
								type="text"
								id="username"
								name="username"
								autoComplete="off"
								placeholder="Nome de Usuário"
								maxLength="60"
								pattern="^[A-Za-z ]{2,60}$"
								required
							/>
							<div className="error-message">O nome de usuário deve ter entre 2 e 30 caracteres alfabéticos</div>
						</div>
						<div className="text-field">
							<label htmlFor="password">Senha</label>
							<input
								id="password"
								type="password"
								name="password"
								placeholder="Sua senha"
								title="Mínimo de 6 caracteres. Ao menos 1 letra e 1 número"
								pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
								required
							/>
							<div className="error-message">Mínimo de 6 caracteres do alfabeto e um número!</div>
						</div>
						<div className="text-field">
							<label htmlFor="confirm-password">Confirme a Senha</label>
							<input
								id="confirm-password"
								type="password"
								className={errors["passwordConfirm"] && "confirm-password"}
								name="confirm-password"
								placeholder="Confirme sua senha"
								required
							/>
							{errors["passwordConfirm"] && <div className="error-message-confirm">{errors["passwordConfirm"]}</div>}
						</div>
						<button className="my-form__button" type="submit">
							Entrar
						</button>
						<div className="my-form__actions">
							<div className="my-form__row">
								<span>Já tem uma conta?</span>
								<a href="/login" className="botao-cadastra" title="Reseta Senha">
									Entre Agora!
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
