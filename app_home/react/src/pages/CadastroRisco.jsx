import React, { useState } from "react";

// Libs
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// Styles
import "~/styles/CadastroRisco.css"

// Torna o React Select animado '-('-')-'
const animatedComponents = makeAnimated();

export const CadastroRisco = () => {
    const [risco, setRisco] = useState("")
    const [tipoRisco, setTipoRisco] = useState()
    const [areaIdentificacao, setAreaIdentificacao] = useState()
    const [dataEntrada, setDataEntrada] = useState(new Date())
    const [consequencias, setConsequencias] = useState()
    const [projeto, setProjeto] = useState()
    const [metier, setMetier] = useState()
    const [jalon, setJalon] = useState()

    return (
        <div className="cadastro-risco">
            <div className="first-box">
                <p className="titulo-step">Descrição do Risco</p>
                <hr />
                <div className="label-input">
                    <label htmlFor="risk">Risco:</label>
                    <textarea
                        className="text-area"
                        name="risk"
                        id="risk"
                        onChange={(e) => setRisco(e.target.value)}
                        value={risco}
                    />
                </div>
                <hr />
                <div className="label-input">
                    <label>Tipo de Risco:</label>
                    <Select
                        className="react-select-geral"
                        components={animatedComponents}
                        value={tipoRisco}
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={(e) => {
                            setTipoRisco(e)
                        }}
                        placeholder={!tipoRisco ? "Selecione um Tipo" : tipoRisco}
                    />
                </div>
                <hr />
                <div className="label-input">
                    <label>Área Identificadora:</label>
                    <Select
                        className="react-select-geral"
                        components={animatedComponents}
                        value={areaIdentificacao}
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={(e) => {
                            setAreaIdentificacao(e)
                        }}
                        placeholder={!tipoRisco ? "Selecione uma Area" : tipoRisco}
                    />
                </div>
                <hr />
                <div className="label-input">
                    <label htmlFor="risk">Data Entrada:</label>
                    <input
                        type="date"
                        className="inputs"
                        onChange={(e) => setDataEntrada(e.target.value)}
                        value={dataEntrada}
                    />
                </div>
                <hr />
                <div className="label-input">
                    <label htmlFor="risk">Consequências:</label>
                    <textarea
                        className="text-area"
                        name="risk"
                        id="risk"
                        onChange={(e) => setConsequencias(e.target.value)}
                        value={consequencias}
                    />
                </div>
                <hr />
                <div className="label-input">
                    <label htmlFor="risk">Projeto:</label>
                    <input
                        type="text"
                        className="inputs"
                        onChange={(e) => setProjeto(e.target.value)}
                        value={projeto}
                    />
                </div>
                <hr />
                <div className="label-input">
                    <label>Metier:</label>
                    <Select
                        className="react-select-geral"
                        components={animatedComponents}
                        value={metier}
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={(e) => {
                            setMetier(e)
                        }}
                        placeholder={!metier ? "Selecione um Metier" : metier}
                    />
                </div>
                <hr />
                <div className="label-input">
                    <label>Jalon:</label>
                    <Select
                        className="react-select-geral"
                        components={animatedComponents}
                        value={jalon}
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={(e) => {
                            setJalon(e)
                        }}
                        placeholder={!jalon ? "Selecione um Jalon" : jalon}
                    />
                </div>
            </div>
            <div className="first-box">
                <p className="titulo-step">Análise de Qualidade</p>
                <hr />
                <p className="titulo-step">Plano de Resposta</p>
            </div>
            <div className="first-box">
                <p className="titulo-step">Plano de Resposta</p>
            </div>
        </div>
    )
}