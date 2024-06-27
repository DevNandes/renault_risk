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
                    color: '#FFF' // Configura a cor das labels da legenda como branca
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
        </div>
    );
};
