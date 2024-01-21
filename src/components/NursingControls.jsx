
import { useRef } from "react"
import { VitalSignLineChart } from "./layout/VitalSignLineChart"



export const NursingControls = ({ nursingControls }) => {

    return (
        <>
            <div className="row">
                <div className="card-body">
                    <p className="fw-bold fs-5 text">Controles de signos vitales:</p>
                    <div className="text-end">

                    </div>
                    {(nursingControls && nursingControls.length) > 0 ?

                        (<div id="nursingControlsChartRef">
                            <div className="row">
                                <div className="border border-secondary-subtle border-1 rounded rounded-2 p-3 m-1 col nursingControlClass">
                                    <h4 className="fs-6 text">Frecuencia Respiratoria(RPM)</h4>
                                    <VitalSignLineChart
                                        className="chart animation fadeIn"
                                        title={"Frecuencia Respiratoria"}
                                        nursingControls={nursingControls}
                                        vitalSign={"respiratoryRate"}
                                        minScale={15}
                                        maxScale={45}
                                    />
                                </div>
                                <div className="border border-secondary-subtle border-1 rounded rounded-2 p-3 m-1 col nursingControlClass">
                                    <h4 className="fs-6 text">Frecuencia Cardíaca(PPM)</h4>
                                    <VitalSignLineChart
                                        title={"Frecuencia Cardíaca"}
                                        nursingControls={nursingControls}
                                        vitalSign={"heartRate"}
                                        minScale={30}
                                        maxScale={180}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="border border-secondary-subtle border-1 rounded rounded-2 p-3 m-1 col nursingControlClass"

                                >
                                    <h4 className="fs-6 text">Temperatura corporal(°C)</h4>
                                    <VitalSignLineChart
                                        title={"Temperatura corporal"}
                                        nursingControls={nursingControls}
                                        vitalSign={"temperature"}
                                        minScale={34}
                                        maxScale={43}
                                    />
                                </div>
                                <div className="border border-secondary-subtle border-1 rounded rounded-2 p-3 m-1 col nursingControlClass"
                                    id="nursingControlsChart">
                                    <h4 className="fs-6 text">Presión sanguínea(mmHg)</h4>
                                    <VitalSignLineChart
                                        title={"Presión sanguínea"}
                                        nursingControls={nursingControls}
                                        vitalSign={"bloodPressure"}
                                        minScale={30}
                                        maxScale={180}
                                    />
                                </div>
                            </div>
                        </div>) :
                        (<div className="alert alert-warning text-center mt-3" role="alert">
                            <span>No hay regisros de signos vitales a la fecha</span>
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}