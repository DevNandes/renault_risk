import React, { useState } from "react";

// Libs
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// Styles
import "~/styles/CadastroRisco.css"

// Torna o React Select animado '-('-')-'
const animatedComponents = makeAnimated();

export const CadastroRisco = () => {
    // Estado único para todos os campos
    const [formState, setFormState] = useState({
        risco: "",
        tipoRisco: [],
        areaIdentificacao: [],
        dataEntrada: new Date().toISOString().split('T')[0],
        consequencias: "",
        projeto: "",
        metier: [],
        jalon: [],
        probabilidade: [],
        impacto: [],
        estrategia: [],
        acao: "",
        nomePiloto: "",
        idPiloto: "",
        dataResposta: "",
        dataAlerta: "",
        comentarios: "",
        probResidual: [],
        impacResidual: [],
        acaoValidacao: [],
        riscoValidacao: [],
        dataResolucao: "",
        captalizacao: []
    });

    // Estado para opções dos selects
    const [options, setOptions] = useState({
        tipoRiscoOptions: [],
        areaIdentificacaoOptions: [],
        metierOptions: [],
        jalonOptions: [],
        probabilidadeOptions: [],
        impactoOptions: [],
        estrategiaOptions: [],
        probResidualOptions: [],
        impacResidualOptions: [],
        acaoValidacaoOptions: [],
        riscoValidacaoOptions: [],
        captalizacaoOptions: []
    });

    // Função para atualizar o estado do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    // Função para atualizar os selects
    const handleSelectChange = (name, value) => {
        setFormState({
            ...formState,
            [name]: value
        });
    };

    // Configuração dos campos
    const fields = [
        { label: "Risco", name: "risco", type: "textarea" },
        { label: "Tipo de Risco", name: "tipoRisco", type: "select", optionsKey: "tipoRiscoOptions" },
        { label: "Área Identificadora", name: "areaIdentificacao", type: "select", optionsKey: "areaIdentificacaoOptions" },
        { label: "Data Entrada", name: "dataEntrada", type: "date" },
        { label: "Consequências", name: "consequencias", type: "textarea" },
        { label: "Projeto", name: "projeto", type: "text" },
        { label: "Metier", name: "metier", type: "select", optionsKey: "metierOptions" },
        { label: "Jalon", name: "jalon", type: "select", optionsKey: "jalonOptions" },
        { label: "Probabilidade", name: "probabilidade", type: "select", optionsKey: "probabilidadeOptions" },
        { label: "Impacto", name: "impacto", type: "select", optionsKey: "impactoOptions" },
        { label: "Estrategia", name: "estrategia", type: "select", optionsKey: "estrategiaOptions" },
        { label: "Ação", name: "acao", type: "text" },
        { label: "Nome Piloto", name: "nomePiloto", type: "text" },
        { label: "ID Piloto", name: "idPiloto", type: "text" },
        { label: "Data Resposta", name: "dataResposta", type: "date" },
        { label: "Data Alerta", name: "dataAlerta", type: "date" },
        { label: "Comentários", name: "comentarios", type: "textarea" },
        { label: "Probabilidade Residual", name: "probResidual", type: "select", optionsKey: "probResidualOptions" },
        { label: "Impacto Residual", name: "impacResidual", type: "select", optionsKey: "impacResidualOptions" },
        { label: "Ação de Validação", name: "acaoValidacao", type: "select", optionsKey: "acaoValidacaoOptions" },
        { label: "Risco de Validação", name: "riscoValidacao", type: "select", optionsKey: "riscoValidacaoOptions" },
        { label: "Data Resolução", name: "dataResolucao", type: "date" },
        { label: "Capitalização", name: "captalizacao", type: "select", optionsKey: "captalizacaoOptions" }
    ];

    // Função para renderizar campos de acordo com seu tipo
    const renderField = ({ label, name, type, optionsKey }) => {
        switch (type) {
            case "textarea":
                return (
                    <div className="label-input" key={name}>
                        <label htmlFor={name}>{label}:</label>
                        <textarea
                            className="text-area"
                            name={name}
                            id={name}
                            onChange={handleInputChange}
                            value={formState[name]}
                        />
                    </div>
                );
            case "select":
                return (
                    <div className="label-input" key={name}>
                        <label>{label}:</label>
                        <Select
                            className="react-select-geral"
                            components={animatedComponents}
                            value={formState[name]}
                            closeMenuOnSelect={false}
                            isMulti
                            onChange={(value) => handleSelectChange(name, value)}
                            options={options[optionsKey]}
                            placeholder={!formState[name].length ? `Selecione ${label}` : formState[name]}
                        />
                    </div>
                );
            case "date":
                return (
                    <div className="label-input" key={name}>
                        <label htmlFor={name}>{label}:</label>
                        <input
                            type="date"
                            name={name}
                            className="inputs"
                            onChange={handleInputChange}
                            value={formState[name]}
                        />
                    </div>
                );
            case "text":
            default:
                return (
                    <div className="label-input" key={name}>
                        <label htmlFor={name}>{label}:</label>
                        <input
                            type="text"
                            name={name}
                            className="inputs"
                            onChange={handleInputChange}
                            value={formState[name]}
                        />
                    </div>
                );
        }
    };

    return (
        <div className="cadastro-risco">
            <div className="first-box">
                <p className="titulo-step">Descrição do Risco</p>
                <hr />
                {fields.slice(0, 8).map((field, index) => (
                    <React.Fragment key={field.name}>
                        {renderField(field)}
                        {index < 7 && <hr />}
                    </React.Fragment>
                ))}
            </div>
            <div className="first-box">
                <p className="titulo-step">Análise de Qualidade</p>
                <hr />
                {fields.slice(8, 10).map((field, index) => (
                    <React.Fragment key={field.name}>
                        {renderField(field)}
                        {index < 6 && <hr />}
                    </React.Fragment>
                ))}
                <p className="titulo-step">Plano de Resposta</p>
                <hr />
                {fields.slice(10, 15).map((field, index) => (
                    <React.Fragment key={field.name}>
                        {renderField(field)}
                        {index < 4 && <hr />}
                    </React.Fragment>
                ))}
            </div>
            <div className="first-box">
                <p className="titulo-step">Plano de Resposta</p>
                <hr />
                {fields.slice(15).map((field, index) => (
                    <React.Fragment key={field.name}>
                        {renderField(field)}
                        {index < fields.slice(15).length - 1 && <hr />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
