import { Route, Routes } from "react-router-dom";
import { NursingAppRoutes } from "./routes/NursingAppRoutes";

export const NursingApp = () => {

  return (
    <>
      <main className="d-flex flex-column justify-content-between">
        <Routes>
          <Route path="/*" element={<NursingAppRoutes />} />
        </Routes>
      </main>
    </>
  )
}
