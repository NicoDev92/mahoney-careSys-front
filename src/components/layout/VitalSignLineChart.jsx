import { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const VitalSignLineChart = ({
    title,
    nursingControls,
    vitalSign,
    minScale,
    maxScale,
}) => {

    const currentDate = new Date();
    const defaultStartDate = new Date(currentDate);
    defaultStartDate.setFullYear(currentDate.getFullYear() - 1);

    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(currentDate);
    const [chartData, setChartData] = useState(null);

    const onStartDateChange = ({ target }) => {
        setStartDate(target.value);
    };

    const onEndDateChange = ({ target }) => {
        setEndDate(target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const filteredControls = nursingControls
            .filter((control) => {
                const controlDate = new Date(control.controlDate);
                let from = new Date(startDate);
                let to = new Date(endDate);
                to.setDate(to.getDate() + 1);
                return (
                    controlDate >= from &&
                    controlDate <= to
                );
            })
            .sort((a, b) => new Date(a.controlDate) - new Date(b.controlDate));

        const formatDate = (date) =>
            format(new Date(date), "dd/MMM/yyyy HH:mm", { locale: esLocale });

        const getVitalSignConfig = (control) => {
            switch (vitalSign) {
                case "respiratoryRate":
                    return {
                        value: control?.respiratoryRate || null,
                        color: "255, 99, 132",
                    };
                case "heartRate":
                    return {
                        value: control?.heartRate || null,
                        color: "0, 123, 255",
                    };
                case "temperature":
                    return {
                        value: control?.temperature || null,
                        color: "75, 192, 192",
                    };
                case "bloodPressure":
                    return {
                        value: control?.bloodPressure || null,
                        diastolicPressureColor: "168, 40, 168",
                        systolicPressureColor: "255, 193, 7",
                    };
                default:
                    return {
                        value: null,
                        color: "0, 0, 0",
                    };
            }
        };

        if (vitalSign !== "bloodPressure") {
            const dataset = {
                label: title,
                data: filteredControls.map(
                    (control) => getVitalSignConfig(control).value
                ),
                tension: 0.5,
                fill: true,
                borderColor: `rgba(${getVitalSignConfig(filteredControls[0]).color
                    }, 1)`,
                backgroundColor: `rgba(${getVitalSignConfig(filteredControls[0]).color
                    }, 0.3)`,
                pointRadius: 5,
                pointBorderColor: `rgba(${getVitalSignConfig(filteredControls[0]).color
                    }, 1)`,
                pointBackgroundColor: `rgba(${getVitalSignConfig(filteredControls[0]).color
                    }, 1)`,
            };

            const newChartData = {
                labels: filteredControls.map((control) => formatDate(control.controlDate)),
                datasets: [dataset],
            };

            setChartData(newChartData);
        } else {
            var pressureData = filteredControls.map(
                (control) => getVitalSignConfig(control).value
            );
            var systolicPressure = pressureData.map((pressure) =>
                parseInt(pressure.split("/")[0], 10)
            );
            var diastolicPressure = pressureData.map((pressure) =>
                parseInt(pressure.split("/")[1], 10)
            );

            const newChartData = {
                labels: filteredControls.map((control) => formatDate(control.controlDate)),
                datasets: [
                    {
                        label: "Presión Diastólica",
                        data: diastolicPressure,
                        tension: 0.5,
                        fill: true,
                        borderColor: `rgba(${getVitalSignConfig(filteredControls[0]).diastolicPressureColor
                            }, 1)`,
                        backgroundColor: `rgba(${getVitalSignConfig(filteredControls[0]).diastolicPressureColor
                            }, 0.3)`,
                        pointRadius: 5,
                        pointBorderColor: `rgba(${getVitalSignConfig(filteredControls[0]).diastolicPressureColor
                            }, 1)`,
                        pointBackgroundColor: `rgba(${getVitalSignConfig(filteredControls[0]).diastolicPressureColor
                            }, 1)`,
                    },
                    {
                        label: "Presión Sistólica",
                        data: systolicPressure,
                        tension: 0.5,
                        fill: true,
                        borderColor: `rgba(${getVitalSignConfig(filteredControls[0]).systolicPressureColor
                            }, 1)`,
                        backgroundColor: `rgba(${getVitalSignConfig(filteredControls[0]).systolicPressureColor
                            }, 0.3)`,
                        pointRadius: 5,
                        pointBorderColor: `rgba(${getVitalSignConfig(filteredControls[0]).systolicPressureColor
                            }, 1)`,
                        pointBackgroundColor: `rgba(${getVitalSignConfig(filteredControls[0]).systolicPressureColor
                            }, 1)`,
                    },
                ],
            };

            setChartData(newChartData);
        }
    };

    var misoptions = {
        scales: {
            y: {
                min: minScale,
                max: maxScale,
            },
            x: {
                ticks: { color: "rgb(255, 99, 132)" },
            },
        },
    };

    return (
        <>
            <div className="container">
                <form onSubmit={onSubmit} className="excluded-to-pdf">
                    <div className="row">
                        <div className="mb-3 col">
                            <label htmlFor="startDate" className="form-label">
                                Fecha de inicio:
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                aria-describedby="startDateHelp"
                                id="startDate"
                                name="startDate"
                                onChange={onStartDateChange}
                            />
                        </div>

                        <div className="mb-3 col">
                            <label htmlFor="endDate" className="form-label">
                                Finalizacion:
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                aria-describedby="endDateHelp"
                                id="endDate"
                                name="endDate"
                                onChange={onEndDateChange}
                                max={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                    </div>
                    < div className="text-center p-0 d-flex align-items-center justify-content-center">
                        <button
                            className="btn btn-info mb-3 w-75 fw-semibold text-light"
                            type="submit">
                            Ver
                        </button>
                    </div>
                </form>
                <div className={`container chart-container${chartData ? "chart-fade-in" : ""}`}>
                    {chartData && <Line data={chartData} options={misoptions} />}
                </div>
            </div>
        </>
    );
};
