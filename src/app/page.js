import Header from "./components/Header";
import styles from "./page.module.css"
import EvaluacionMotor from "./components/evaluacion-motor";
import Datosmotor from "./components/datos-motor";
import DatosMedicion from "./components/datos-motor-medicion";
import MotoresRecientes from "./components/main-motores-recientes";

export default function Home() {
  return (

    <div className={styles['main-container']}>
      
      <MotoresRecientes />
      
    </div>
  );
}
