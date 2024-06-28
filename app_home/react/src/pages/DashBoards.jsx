import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, defaults } from 'chart.js';
import { makeRequestRWS } from "~/functions/request";
import "~/styles/DashBoards.css";

// Registrar as escalas e elementos necessários no Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Configurar cor padrão das fontes para branca
defaults.color = '#FFF';

export const DashBoards = () => {
    const [dados, setDados] = useState(null);

    const getDadosDashboars = async () => {
        const result = await makeRequestRWS(`/riscos/dashboard`);
        setDados(result.dados_dashboard);
    }

    useEffect(() => {
        getDadosDashboars();
    }, []);

    const getBarChartData = () => {
        if (!dados) return {};

        const labels = dados.riscos_por_projeto.map(item => item.project);
        const data = dados.riscos_por_projeto.map(item => item.risk_count);

        return {
            labels,
            datasets: [
                {
                    label: "Qde. Riscos",
                    data,
                    backgroundColor: "#F6E556",
                    borderRadius: 3,
                    borderSkipped: false,
                },
            ],
        };
    };

    const getDoughnutChartData = () => {
        if (!dados) return {};

        const criticalPercentage = parseFloat(dados.porcentagem_criticos[0].Critical_Percentage);
        const otherPercentage = parseFloat(dados.porcentagem_criticos[0].Other_Classifications_Percentage);

        return {
            labels: ["Críticos", "Outras Classificações"],
            datasets: [
                {
                    data: [criticalPercentage, otherPercentage],
                    backgroundColor: ["#F65656", "#F6E556"],
                },
            ],
        };
    };

    const getSituacoesRiscosChartData = () => {
        if (!dados) return {};

        const situacoes = dados.situacoes_riscos[0];
        const riscosEmRisco = situacoes.riscosEmRisco;
        const riscosProblema = situacoes.riscosProblema;
        const riscosResolvidos = situacoes.riscosResolvidos;
        const riscosTrajetoria = situacoes.riscosTrajetoria;

        return {
            labels: ["Em Risco", "Problema", "Resolvidos", "Trajetória"],
            datasets: [
                {
                    data: [riscosEmRisco, riscosProblema, riscosResolvidos, riscosTrajetoria],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                },
            ],
        };
    };

    const getClassRiscosChartData = () => {
        if (!dados) return {};

        const situacoes = dados.riscos_por_classificacao[0];
        const riscosCritical = situacoes.Critical;
        const riscosModerate = situacoes.Moderate;
        const riscosSevere = situacoes.Severe;
        const riscosSustainable = situacoes.Sustainable;

        return {
            labels: ["Criticos", "Moderados", "Severos", "Sustentaveis"],
            datasets: [
                {
                    data: [riscosCritical, riscosModerate, riscosSevere, riscosSustainable],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                },
            ],
        };
    };

    const getMultipleBarChartData = () => {
        if (!dados) return {};

        const labels = dados.jalon_por_classificacao.map(item => `${item.nomeJalon}`);
        const criticalData = dados.jalon_por_classificacao.map(item => item.Critical);
        const moderateData = dados.jalon_por_classificacao.map(item => item.Moderate);
        const severeData = dados.jalon_por_classificacao.map(item => item.Severe);
        const sustainableData = dados.jalon_por_classificacao.map(item => item.Sustainable);

        return {
            labels,
            datasets: [
                {
                    label: "Critical",
                    data: criticalData,
                    backgroundColor: "#FF6384",
                },
                {
                    label: "Moderate",
                    data: moderateData,
                    backgroundColor: "#FFCE56",
                },
                {
                    label: "Severe",
                    data: severeData,
                    backgroundColor: "#36A2EB",
                },
                {
                    label: "Sustainable",
                    data: sustainableData,
                    backgroundColor: "#4BC0C0",
                },
            ],
        };
    };

    const barChartOptions = {
        indexAxis: 'y', // Inverter os eixos
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Quantidade de Riscos por Projeto",
                padding: {
                    bottom: 16,
                },
                font: {
                    size: 16,
                    weight: "normal",
                },
                color: '#FFF'
            },
            tooltip: {
                backgroundColor: "#27292D",
                titleColor: '#FFF',
                bodyColor: '#FFF'
            }
        },
        scales: {
            x: {
                border: {
                    dash: [2, 4],
                    color: '#FFF'
                },
                grid: {
                    color: "#5d5d5d",
                },
                ticks: {
                    color: '#FFF'
                },
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Qde. Riscos",
                    color: '#FFF'
                },
            },
            y: {
                grid: {
                    color: "#5d5d5d",
                },
                border: {
                    dash: [2, 4],
                    color: '#FFF'
                },
                ticks: {
                    color: '#FFF'
                },
            },
        },
    };

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#FFF'
                }
            },
            title: {
                display: true,
                text: "Porcentagem de Riscos Críticos",
                padding: {
                    bottom: 16,
                },
                font: {
                    size: 16,
                    weight: "normal",
                },
                color: '#FFF'
            },
            tooltip: {
                backgroundColor: "#27292D",
                titleColor: '#FFF',
                bodyColor: '#FFF'
            }
        }
    };

    const situacoesRiscosChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#FFF'
                }
            },
            title: {
                display: true,
                text: "Situações dos Riscos",
                padding: {
                    bottom: 16,
                },
                font: {
                    size: 16,
                    weight: "normal",
                },
                color: '#FFF'
            },
            tooltip: {
                backgroundColor: "#27292D",
                titleColor: '#FFF',
                bodyColor: '#FFF'
            }
        }
    };

    const classRiscosChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#FFF'
                }
            },
            title: {
                display: true,
                text: "Riscos por Classificassao",
                padding: {
                    bottom: 16,
                },
                font: {
                    size: 16,
                    weight: "normal",
                },
                color: '#FFF'
            },
            tooltip: {
                backgroundColor: "#27292D",
                titleColor: '#FFF',
                bodyColor: '#FFF'
            }
        }
    };

    const multipleBarChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#FFF'
                }
            },
            title: {
                display: true,
                text: "Quantidade de Riscos por Classificação e Jalon",
                padding: {
                    bottom: 16,
                },
                font: {
                    size: 16,
                    weight: "normal",
                },
                color: '#FFF'
            },
            tooltip: {
                backgroundColor: "#27292D",
                titleColor: '#FFF',
                bodyColor: '#FFF'
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#FFF'
                },
                grid: {
                    color: "#5d5d5d",
                },
                beginAtZero: true,
            },
            y: {
                ticks: {
                    color: '#FFF'
                },
                grid: {
                    color: "#5d5d5d",
                },
            },
        },
    };

    return (
        <div className="tela-principal">
            <div className="widget">
                {dados ? (
                    <Bar data={getBarChartData()} options={barChartOptions} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="widget pizza">
                {dados ? (
                    <Doughnut data={getDoughnutChartData()} options={doughnutChartOptions} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="widget pizza">
                {dados ? (
                    <Doughnut data={getSituacoesRiscosChartData()} options={situacoesRiscosChartOptions} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="widget top">
                {dados ? (
                    <>
                        <p className="titulo-graf">TOP 5 riscos mais recorrentes</p>
                        {dados?.top_5_riscos_recorrentes && dados?.top_5_riscos_recorrentes.map((risco) => (
                            <div className="risco">
                                <div className="titulo-risco">
                                    {risco.risk}
                                </div>
                                <div className="divisor" />
                                <div className="contador-riscos">
                                    {risco.risk_count} vezes
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="widget linha-multi">
                {dados ? (
                    <Bar data={getMultipleBarChartData()} options={multipleBarChartOptions} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="widget pizza class">
                {dados ? (
                    <Doughnut data={getClassRiscosChartData()} options={classRiscosChartOptions} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};
