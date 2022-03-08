import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import BarraBusqueda from './components/barraBusqueda.component';

function App() {

  return (
    <div className="App">
      <BarraBusqueda></BarraBusqueda>
      <Container id="containerFicha"></Container>
    </div>
  );
};

export default App;
