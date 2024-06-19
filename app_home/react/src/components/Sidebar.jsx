import React, { useEffect, useState } from "react";

// Libs
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Select from "react-select";

// Componentes
import { CloseButton } from "~/components/CloseButton";

// Assets
import logo from "~/assets/logo.png"
import logoDark from "~/assets/logo-dark.png"
import profile from "~/assets/profile.webp"

// Services
import {
    destroyAllApp,
    getUserName,
    getPerfilName,
    getTema,
    destroyTema,
    storeTema,
    destroyLinguagem,
    storeLinguagem,
    destroyUserName,
    storeUserName,
    getLinguagem
} from "~/services/storage";
import { apiRWS } from "~/services/apiRWS";

// Funcoes
import { makeRequestRWS } from "~/functions/request"
import { notify } from "~/functions/notifications";

// Styles
import '~/styles/Sidebar.css';

export const Sidebar = () => {
    const [menus, setMenus] = useState()
    const [visibleConfig, setVisibleConfig] = useState(false)
    // Abre e fecha a sidebar
    const toggleSidebar = () => {
        document.body.classList.toggle("collapsed");
        const allLinks = document.querySelectorAll(".sidebar-links a");

        allLinks.forEach((elem) => {
            elem.addEventListener("click", function () {
                const hrefLinkClick = elem.href;

                allLinks.forEach((link) => {
                    if (link.href == hrefLinkClick) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            });
        });

        const searchInput = document.querySelector(".search__wrapper input");

        searchInput.addEventListener("focus", (e) => {
            document.body.classList.remove("collapsed");
        });
    }

    // Busca menus que o usuario tem autorizacao de acesso
    const getMenusUsuario = async () => {
        const result = await makeRequestRWS("/app/menus")
        setMenus(result.menus)
    }

    // Efeitos
    useEffect(() => {
        getMenusUsuario()
    }, [])
    return (
        <nav className="sidebar">
            <div className="sidebar-top-wrapper">
                <div className="sidebar-top">
                    <a href="/home" className="logo__wrapper">
                        <img src={getTema() === "dark" ? logoDark : logo} alt="Renault Logo" className="logo-small" />
                        <span className="sidebar-title hide">
                            Renault Risk
                        </span>
                    </a>
                </div>
                <button type="button" className="expand-btn" onClick={() => toggleSidebar()}>
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
            <div className="search__wrapper">
                <i className="fas fa-search"></i>
                <input type="search" placeholder="Busque por algo..." />
            </div>
            {menus && menus.length > 0 && menus.filter((menu) => menu.urlMenu === null).map((menuPrincipal) => (
                <div className="sidebar-links">
                    <h2>{menuPrincipal.nomeMenu}</h2>
                    <ul>
                        {menus.filter((menu) => menuPrincipal.idMenu === menu.idMenuPai).map((menuSecundario) => (
                            <li>
                                <a href={menuSecundario.urlMenu} title={menuSecundario.nomeMenu} className="tooltip-sidebar">
                                    <i className={menuSecundario.iconeMenu}></i>
                                    <span className="link hide">{menuSecundario.nomeMenu}</span>
                                    <span className="tooltip__content">{menuSecundario.nomeMenu}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <div className="sidebar-links bottom-links">
                <ul>
                    <li>
                        <button type="button" title="Configurações" className="tooltip-sidebar" onClick={() => setVisibleConfig(true)}>
                            <i className="fas fa-cog"></i>
                            <span className="link hide">Configurações</span>
                            <span className="tooltip__content">Configurações</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="divider"></div>
            <div className="sidebar__profile">
                <div className="avatar__wrapper">
                    <img className="avatar" src={profile} alt="Avatar" />
                    <div className="online__status"></div>
                </div>
                <section className="avatar__name hide">
                    <div className="user-name">{getUserName()}</div>
                    <div className="perfil">{getPerfilName()}</div>
                </section>
                <button
                    className="logout"
                    type="button"
                    onClick={() => {
                        destroyAllApp()
                        document.body.classList.remove("dark");
                        window.location.reload();
                    }}
                >
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
            <ModalConfig
                visible={visibleConfig}
                setVisible={setVisibleConfig}
            />
        </nav>
    )
};

const opcoesIdiomas = [
    { value: "portugues", label: "Português" },
    { value: "espanhol", label: "Espanhol" },
    { value: "ingles", label: "Inglês" }
];

const ModalConfig = ({ visible, setVisible }) => {
    const [tema, setTema] = useState(getTema());
    const [idioma, setIdioma] = useState(getLinguagem()); // Estado para armazenar o idioma selecionado
    const [novoNomeUsuario, setNovoNomeUsuario] = useState(getUserName()); // Estado para armazenar o novo nome de usuário

    // Função para fechar o modal
    const toggle = () => {
        setVisible(!visible);
    };

    // Função para salvar as informações alteradas
    const salvaInfos = async () => {
        const infoSave = {};

        // Verifica se houve mudança no tema
        if (tema !== getTema()) {
            infoSave.tema = tema;
            destroyTema();
            storeTema(tema);
            if (tema === "light") {
                document.body.classList.remove("dark");
            } else {
                document.body.classList.add("dark");
            }
        }

        // Verifica se houve mudança no idioma
        if (idioma !== getLinguagem()) {
            infoSave.idioma = idioma;
            destroyLinguagem();
            storeLinguagem(idioma);
            // Lógica para alterar o idioma da aplicação
        }

        // Verifica se houve mudança no nome de usuário
        if (novoNomeUsuario.trim() !== "") {
            infoSave.novoNomeUsuario = novoNomeUsuario;
            destroyUserName();
            storeUserName(novoNomeUsuario);
            // Lógica para atualizar o nome de usuário
        }

        notify({ message: "Informações atualizadas com sucesso", type: "success" });
    };

    return (
        <Modal isOpen={visible} className="modal-geral" centered>
            <ModalHeader close={CloseButton(toggle)} className="header-modal-geral">
                <span className="title-header-modal">CONFIGURAÇÕES DO USUÁRIO</span>
            </ModalHeader>
            <ModalBody className="text-center">
                <h4>Tema:</h4>
                <Select
                    className="react-select-geral"
                    options={[
                        { value: "light", label: "Claro" },
                        { value: "dark", label: "Escuro" }
                    ]}
                    value={{ value: tema, label: tema === "light" ? "Claro" : "Escuro" }}
                    onChange={(opt) => setTema(opt.value)}
                />

                <h4>Idioma:</h4>
                <Select
                    className="react-select-geral"
                    options={opcoesIdiomas}
                    value={opcoesIdiomas.find(opt => opt.value === idioma)}
                    onChange={(opt) => setIdioma(opt.value)}
                />

                <h4>Novo Nome de Usuário:</h4>
                <input
                    type="text"
                    id="username"
                    style={{ width: "100%", height: "2.5rem", borderRadius: "5px", textAlign: "center" }}
                    name="username"
                    autoComplete="off"
                    placeholder="Nome de Usuário"
                    maxLength="60"
                    pattern="^[A-Za-z ]{2,60}$"
                    value={novoNomeUsuario}
                    onChange={(e) => setNovoNomeUsuario(e.target.value)}
                    required
                />
            </ModalBody>
            <ModalFooter className="justify-space-around modal-geral-footer">
                <button type="button" className="botao-animado" onClick={salvaInfos}>
                    <span>SALVAR</span>
                </button>
                <button type="button" className="botao-animado" onClick={toggle}>
                    <span>FECHAR</span>
                </button>
            </ModalFooter>
        </Modal>
    );
};
