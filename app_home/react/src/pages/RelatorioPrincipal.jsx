import React, { useEffect, useRef, useState } from "react";

// Funcoes
import { makeRequestRWS } from "~/functions/request";

// Libs
import Select from "react-select";

// Styles
import "~/styles/Relatorio.css"

export const Relatorio = () => {
    const [dadosRelatorio, setDadosRelatorio] = useState([]);
    const [ordenamentoTabela, setOrdenamentoTabela] = useState()
    const [filtros, setFiltros] = useState([])
    const [dropDownAtivo, setDropDownAtivo] = useState("")
    const [tabelaFiltrada, setTabelaFiltrada] = useState([])
    const [linhasSelected, setLinhasSelected] = useState([])
    const [filtroMarcados, setFiltroMarcados] = useState(false);
    const titulos = [
        { label: "Linha", value: "idRisk" },
        { label: "Risco", value: "risk" },
        { label: "Tipo", value: "nomeTipoRisco" },
        { label: "Area Identificacao", value: "nomeArea" },
        { label: "Data Entrada", value: "riskEntryDate" },
        { label: "Consequencias", value: "consequences" },
        { label: "Projeto", value: "project" },
        { label: "Metier", value: "nomeMetier" },
        { label: "Jalon", value: "nomeJalon" },
        { label: "Probabilidade", value: "nomeProbabilit" },
        { label: "Impacto", value: "nomeImpact" },
        { label: "Estrategia", value: "nomeStrategy" },
        { label: "Acao", value: "action" },
        { label: "Nome Piloto", value: "pilotName" },
        { label: "Id Piloto", value: "pilotId" },
        { label: "Data Incial", value: "initialDate" },
        { label: "Data de Alerta", value: "alertDate" },
        { label: "Probabilidade Residual", value: "nomeResidualProb" },
        { label: "Impacto Residual", value: "nomeResidualImp" },
        { label: "Acao de Validacao", value: "nomeAction" },
        { label: "Data de Resolucao", value: "resolutionDate" },
        { label: "Status", value: "nomeRiskValidation" },
        { label: "Capitalizacao", value: "idCapitalization" }
    ]

    // Puxa os dados do Banco de dados
    const getInfosRelatorio = async () => {
        let resultrelatorio = await makeRequestRWS(`/riscos/relatorio`)
        resultrelatorio = resultrelatorio.tabela
        setDadosRelatorio(resultrelatorio)
        setTabelaFiltrada(resultrelatorio)
    }

    // Formata a data no formato Brasileiro
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    // Filtra os dados
    const filtraDados = (dadosOrdenados) => {
        // Cria uma variavel para preparar os dados com os ja presentes na tabela
        let tabelaDadosFiltrados = [...dadosOrdenados]
        const filtrosInclusao = {};
        const filtrosExclusao = {};
        // Ajusta variaveis para filtragem
        filtros.forEach((filtro) => {
            // Separa entre inclusao e exclusao
            if (filtro.tipo === "inclusao") {
                // Verifica se ja tem o array com o nome da coluna criado, se sim adiciona a chave, se nao ele cria com essa chave
                if (!filtrosInclusao[filtro.coluna.value]) {
                    filtrosInclusao[filtro.coluna.value] = [filtro.chave]
                } else {
                    filtrosInclusao[filtro.coluna.value].push(filtro.chave)
                }
            } else if (filtro.tipo === "exclusao") {
                // Verifica se ja tem o array com o nome da coluna criado, se sim adiciona a chave, se nao ele cria com essa chave
                if (!filtrosExclusao[filtro.coluna.value]) {
                    filtrosExclusao[filtro.coluna.value] = [filtro.chave]
                } else {
                    filtrosExclusao[filtro.coluna.value].push(filtro.chave)
                }
            }
        })
        // Busca dentro do filtro os label dos arrays e para cada um filtra a linha
        Object.keys(filtrosInclusao).forEach((label) => {
            tabelaDadosFiltrados = tabelaDadosFiltrados.filter((linha) => filtrosInclusao[label].includes(typeof linha[label] === 'string' ? linha[label].trim() : linha[label]))
        })
        Object.keys(filtrosExclusao).forEach((label) => {
            tabelaDadosFiltrados = tabelaDadosFiltrados.filter((linha) => !filtrosExclusao[label].includes(typeof linha[label] === 'string' ? linha[label].trim() : linha[label]))
        })
        // Filtra as linhas marcadas se o filtro de marcados estiver ativo
        if (filtroMarcados) {
            tabelaDadosFiltrados = tabelaDadosFiltrados.filter((linha) => linhasSelected.includes(linha.idRisk));
        }

        // Retorna dados filtrados
        return tabelaDadosFiltrados
    }

    // Funcao de ordenamento de dados
    const ordenaDados = () => {
        // Compara sempre dadoA com dadoB
        const dadosOrdenado = [...dadosRelatorio].sort((dadoA, dadoB) => {
            // Se dadoA for menor que o dadoB presente na coluna de orrdenacao
            if (dadoA[ordenamentoTabela.coluna.value] < dadoB[ordenamentoTabela.coluna.value]) {
                // Se for crescente desce um na posicao se nao sobe um na posicao
                return ordenamentoTabela.direcao === 'crescente' ? -1 : 1;
            }
            // Se dadoA for maior que o dadoB presente na coluna de orrdenacao
            if (dadoA[ordenamentoTabela.coluna.value] > dadoB[ordenamentoTabela.coluna.value]) {
                // Se for crescente desce um na posicao se nao sobe um na posicao
                return ordenamentoTabela.direcao === 'crescente' ? 1 : -1;
            }
            // Se forem iguais nao muda posicao
            return 0;
        });
        return dadosOrdenado
    }

    // Funcao reponsavel pela chamdas do ordenamento e do filtro de dados
    const ordenaFiltraTabela = () => {
        const dadosOrdenados = ordenamentoTabela ? ordenaDados() : [...dadosRelatorio]
        const dadosFiltrados = filtraDados(dadosOrdenados)
        setTabelaFiltrada(dadosFiltrados)
    }

    // Remove item dos filtros
    const removerFiltro = (filtro) => {
        let filtrosAtulizados = [...filtros]
        filtrosAtulizados = filtrosAtulizados.filter((filtroAtual) => filtroAtual !== filtro)
        setFiltros(filtrosAtulizados)
    }

    // Troca a selecao da checkbox
    const toggleSelection = (idRisk) => {
        setLinhasSelected((prevLinhasSelected) => {
            if (prevLinhasSelected.includes(idRisk)) {
                return prevLinhasSelected.filter(codigo => codigo !== idRisk);
            }
            return [...prevLinhasSelected, idRisk];
        });
    };

    const updateURLParams = () => {
        const url = new URL(window.location);
        const params = new URLSearchParams();

        // Adiciona os filtros na URL
        filtros.forEach((filtro, index) => {
            params.append(`filtro${index}_coluna`, filtro.coluna.value);
            params.append(`filtro${index}_tipo`, filtro.tipo);
            params.append(`filtro${index}_chave`, filtro.chave);
        });

        // Adiciona o ordenamento na URL
        if (ordenamentoTabela) {
            params.append('ordenacao_coluna', ordenamentoTabela.coluna.value);
            params.append('ordenacao_direcao', ordenamentoTabela.direcao);
        }

        url.search = params.toString();
        window.history.replaceState(null, '', url.toString());
    };

    // Efeitos
    useEffect(() => {
        getInfosRelatorio();

        const params = new URLSearchParams(window.location.search);
        const novosFiltros = [];
        let ordenacaoTabelaNova = null;

        params.forEach((value, key) => {
            if (key.startsWith('filtro')) {
                // Extrai o índice do parâmetro
                const index = key.match(/\d+/)[0];
                // Extrai o campo do parâmetro
                const campo = key.split('_')[1];

                if (campo === 'coluna') {
                    const coluna = value;
                    const tipo = params.get(`filtro${index}_tipo`);
                    const chave = params.get(`filtro${index}_chave`);
                    const colunaEncontrada = titulos.find(t => t.value === coluna);

                    if (colunaEncontrada) {
                        novosFiltros.push({ coluna: colunaEncontrada, tipo, chave });
                    }
                }
            } else if (key === 'ordenacao_coluna') {
                const coluna = titulos.find(t => t.value === value);
                const direcao = params.get('ordenacao_direcao');
                if (coluna) {
                    ordenacaoTabelaNova = { coluna, direcao };
                }
            } else if (key === 'filtro_marcados') {
                setFiltroMarcados(true);
            }
        });

        setFiltros(novosFiltros);
        setOrdenamentoTabela(ordenacaoTabelaNova);
    }, []);

    useEffect(() => {
        updateURLParams();
    }, [filtros, ordenamentoTabela, filtroMarcados]);

    useEffect(() => {
        ordenaFiltraTabela()
    }, [filtros, ordenamentoTabela, filtroMarcados, linhasSelected, dadosRelatorio]);

    return (
        <div className="relatorio   ">
            <div className="header-relatorio"> </div>
            <div className="body-relatorio">
                {(filtros.length > 0 || ordenamentoTabela || filtroMarcados) && (
                    <div className="filtros-ativos">
                        <div className="filtros-label">Filtros Aplicados</div>
                        {ordenamentoTabela && (
                            <button className="botao-reset" onClick={() => setOrdenamentoTabela()} type="button">
                                <span className="ordenamento-ativo">
                                    {`${ordenamentoTabela.coluna.label} em ordem ${ordenamentoTabela.direcao.toUpperCase()}`}
                                    <i className="fa fa-times-circle"></i>
                                </span>
                            </button>
                        )}
                        {filtros.map((filtro) => (
                            <button className="botao-reset" onClick={() => removerFiltro(filtro)} type="button" key={`${filtro.chave}-${filtro.tipo}-${filtro.coluna.value}`}>
                                <span className="filtro-ativo">
                                    {filtro.coluna.label}
                                    {filtro.tipo === "inclusao" ? " é: " : " não é: "}
                                    {filtro.chave}
                                    <i className="fa fa-times-circle"></i>
                                </span>
                            </button>
                        ))}
                        {filtroMarcados && (
                            <button className="botao-reset" onClick={() => setFiltroMarcados(false)} type="button">
                                <span className="filtro-ativo">
                                    Apenas as Linhas Marcadas
                                    <i className="fa fa-times-circle"></i>
                                </span>
                            </button>
                        )}
                    </div>
                )}
                <div className="tabela-div">
                    <table className="tabela table table-hover table-bordered">
                        <thead className="thead-dark">
                            <tr className="thead-tr">
                                <th onMouseEnter={() => setDropDownAtivo("marcar")} onMouseLeave={() => setDropDownAtivo("")}>
                                    Marcar
                                    {dropDownAtivo === "marcar" && (
                                        <DropDownMarcar
                                            setFiltroMarcados={setFiltroMarcados}
                                            filtroMarcados={filtroMarcados}
                                        />
                                    )}
                                </th>

                                {titulos.map((titulo) => (
                                    <th key={titulo.value} onMouseEnter={() => setDropDownAtivo(titulo.value)} onMouseLeave={() => setDropDownAtivo("")}>
                                        {titulo.label}
                                        {dropDownAtivo === titulo.value && (
                                            <DropDownMenu
                                                titulo={titulo}
                                                setDropDownAtivo={setDropDownAtivo}
                                                dadosRelatorio={dadosRelatorio}
                                                ordenamentoTabela={ordenamentoTabela}
                                                setOrdenamentoTabela={setOrdenamentoTabela}
                                                filtros={filtros}
                                                setFiltros={setFiltros}
                                            />
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {tabelaFiltrada && (
                            <tbody>
                                {tabelaFiltrada.map((risco) => (
                                    <tr key={risco.idRisk} className={linhasSelected.includes(risco.idRisk) ? "linha-marcada" : ""}>
                                        <td className="va-mid">
                                            <div className="checkbox">
                                                <div className="checkbox__1">
                                                    <input
                                                        id={`checkbox-${risco.idRisk}`}
                                                        type="checkbox"
                                                        onChange={() => toggleSelection(risco.idRisk)}
                                                        checked={linhasSelected.includes(risco.idRisk)}
                                                    />
                                                    <label htmlFor={`checkbox-${risco.idRisk}`}>
                                                        <i className="fas fa-check" />
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="va-mid">{risco.idRisk}</td>
                                        <td className="va-mid">{risco.risk}</td>
                                        <td className="va-mid">{risco.nomeTipoRisco}</td>
                                        <td className="va-mid">{risco.nomeArea}</td>
                                        <td className="va-mid">{risco.riskEntryDate ? formatDate(risco.riskEntryDate) : "NAO PREENCHIDO"}</td>
                                        <td className="va-mid">{risco.consequences}</td>
                                        <td className="va-mid">{risco.project}</td>
                                        <td className="va-mid">{risco.nomeMetier}</td>
                                        <td className="va-mid">{risco.nomeJalon}</td>
                                        <td className="va-mid">{risco.nomeProbabilit}</td>
                                        <td className="va-mid">{risco.nomeImpact}</td>
                                        <td className="va-mid">{risco.nomeStrategy}</td>
                                        <td className="va-mid">{risco.action}</td>
                                        <td className="va-mid">{risco.pilotName}</td>
                                        <td className="va-mid">{risco.pilotId}</td>
                                        <td className="va-mid">{risco.initialDate ? formatDate(risco.initialDate) : "NAO PREENCHIDO"}</td>
                                        <td className="va-mid">{risco.alertDate ? formatDate(risco.alertDate) : "NAO PREENCHIDO"}</td>
                                        <td className="va-mid">{risco.nomeResidualProb}</td>
                                        <td className="va-mid">{risco.nomeResidualImp}</td>
                                        <td className="va-mid">{risco.nomeAction}</td>
                                        <td className="va-mid">{risco.resolutionDate ? formatDate(risco.resolutionDate) : "NAO PREENCHIDO"}</td>
                                        <td className="va-mid">{risco.nomeRiskValidation}</td>
                                        <td className="va-mid">{risco.idCapitalization}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

const DropDownMenu = ({ titulo, dadosRelatorio, ordenamentoTabela, setOrdenamentoTabela, filtros, setFiltros }) => {
    const [optionsSelects, setOptionsSelects] = useState([])
    const dropDownRef = useRef(null)

    // Puxa opcoes dos filtros
    const getOptions = () => {
        // Pega so os valores daquela coluna
        let uniqueValues = dadosRelatorio.map(item => item[titulo.value]);
        // Evita nomes nulos ou indefinidos
        uniqueValues = uniqueValues.filter((valor) => valor && valor);
        // Evita nomes repitidos comparando o index dele dentro do proprio array
        // Conta as ocorrências de cada valor
        const valueCounts = uniqueValues.reduce((acc, valor) => {
            const trimmedValue = typeof valor === 'string' ? valor.trim() : valor;
            acc[trimmedValue] = (acc[trimmedValue] || 0) + 1;
            return acc;
        }, {});
        // Monta os valores conforme react select com a quantidade entre parênteses no label
        const options = Object.keys(valueCounts).map(value => ({
            value,
            label: `${value} (${valueCounts[value]})`
        }));
        setOptionsSelects(options)
    };

    // Adiciona filtros
    const handleChangeFilter = (valores, tipo, coluna) => {
        let filtrosAtuais = [];
        if (filtros && filtros.length > 0) {
            // Busca filtros atuais fora o desta coluna
            filtrosAtuais = [...filtros].filter((filtro) => filtro.coluna.value !== coluna.value)
        }
        // Busca filtros atuais de inclusao desta coluna
        let filtrosAtuaisIncCol = [...filtros].filter((filtro) => (filtro.tipo === "inclusao" && filtro.coluna.value === coluna.value))
        // Busca filtros atuais de exclusao desta coluna
        let filtrosAtuaisExcCol = [...filtros].filter((filtro) => (filtro.tipo === "exclusao" && filtro.coluna.value === coluna.value))
        const dadosProntos = [];
        // Para cada valor dentro do react select ele insere um dado preparado no estado(Objeto)
        valores.forEach((valor) => {
            const dadosPreparados = {
                chave: valor.value,
                tipo,
                coluna
            }
            dadosProntos.push(dadosPreparados)
        })
        if (tipo === "inclusao") {
            filtrosAtuaisIncCol = dadosProntos
        } else {
            filtrosAtuaisExcCol = dadosProntos
        }
        // Soma todos os filtros
        const novosFiltros = [...filtrosAtuais, ...filtrosAtuaisIncCol, ...filtrosAtuaisExcCol];

        // Atualzia filtros oficialmente
        setFiltros(novosFiltros)
    }

    // Verifica se elemento cabe na tela, se nao inverte ele
    const defineInversao = () => {
        const dropdown = dropDownRef.current;
        const rect = dropdown.getBoundingClientRect().right;
        if (rect > window.innerWidth) {
            dropdown.classList.add("invertido")
        }
    }

    // Busca filtros ativos
    const handleGetValor = (tipo) => {
        // Pega filtros ativos deste coluna e deste tipo
        let filtrosAtivosColType = filtros.filter((filtro) => (filtro.tipo === tipo && filtro.coluna.value === titulo.value))
        // Modifica para apenas pegar a chave e transformar no formato do react select
        filtrosAtivosColType = filtrosAtivosColType.map((item) => ({ value: item.chave, label: item.chave })) || []
        return filtrosAtivosColType
    }

    // Efeitos
    useEffect(() => {
        defineInversao()
        getOptions()
    }, [])

    return (
        <div ref={dropDownRef} className="dropdown-menu-relatorio">
            <p><b>Ordenamento</b></p>
            <ToggleOrdenamento titulo={titulo} ordenamentoTabela={ordenamentoTabela} setOrdenamentoTabela={setOrdenamentoTabela} />
            <p><b>{titulo.label} é:</b></p>
            <Select
                className="react-select-geral"
                isMulti
                closeMenuOnSelect={false}
                options={optionsSelects}
                onChange={(e) => handleChangeFilter(e, "inclusao", titulo)}
                value={handleGetValor("inclusao")}
                placeholder={`Incluir ${titulo.label}`}
            />
            <p><b>{titulo.label} não é:</b></p>
            <Select
                className="react-select-geral"
                isMulti
                closeMenuOnSelect={false}
                options={optionsSelects}
                onChange={(e) => handleChangeFilter(e, "exclusao", titulo)}
                value={handleGetValor("exclusao")}
                placeholder={`Excluir ${titulo.label}`}
            />
        </div>
    )
}

// Botao de Ordenamento de uma coluna
const ToggleOrdenamento = ({ titulo, ordenamentoTabela, setOrdenamentoTabela }) => {
    return (
        <div className="toggle" style={{ margin: '0px' }}>
            <input
                type="radio"
                name="selecaoOpcao"
                value="padrao"
                id="padrao"
                onChange={() => {
                    setOrdenamentoTabela()
                }}
                checked={(!ordenamentoTabela || (ordenamentoTabela && (!ordenamentoTabela.direcao === "crescente" && !ordenamentoTabela.direcao === "decrescente") && !ordenamentoTabela.coluna.value === titulo.value))}
            />
            <label htmlFor="padrao" style={{ borderRadius: "10px 0px 0px 10px" }}>PADRAO ⬍</label>
            <input
                type="radio"
                name="selecaoOpcao"
                value="crescente"
                id="crescente"
                onChange={(e) => {
                    setOrdenamentoTabela({ coluna: titulo, direcao: e.target.value })
                }}
                checked={ordenamentoTabela && ordenamentoTabela.direcao === "crescente" && ordenamentoTabela.coluna.value === titulo.value}
            />
            <label htmlFor="crescente">CRESCENTE ⬆</label>
            <input
                type="radio"
                name="selecaoOpcao"
                value="decrescente"
                id="decrescente"
                onChange={(e) => {
                    setOrdenamentoTabela({ coluna: titulo, direcao: e.target.value })
                }}
                checked={ordenamentoTabela && ordenamentoTabela.direcao === "decrescente" && ordenamentoTabela.coluna.value === titulo.value}
            />
            <label htmlFor="decrescente" style={{ borderRadius: "0px 10px 10px 0px" }}>DECRESCENTE ⬇</label>
        </div>
    )
}

const DropDownMarcar = ({ setFiltroMarcados, filtroMarcados }) => {
    return (
        <div className="dropdown-menu-relatorio">
            <p><b>Filtrar por:</b></p>
            <div className="toggle" style={{ margin: '0px' }}>
                <input
                    type="radio"
                    name="todos"
                    value="marcar"
                    id="todos"
                    onChange={() => setFiltroMarcados(false)}
                    checked={!filtroMarcados}
                />
                <label htmlFor="todos" style={{ borderRadius: "10px 0px 0px 10px", flex: "0 0 50%" }}>Todos</label>
                <input
                    type="radio"
                    name="marcados"
                    value="marcar"
                    id="marcados"
                    onChange={() => setFiltroMarcados(true)}
                    checked={filtroMarcados}
                />
                <label htmlFor="marcados" style={{ borderRadius: "0px 10px 10px 0px", flex: "0 0 50%" }}>Marcados</label>
            </div>
        </div>
    )
}
