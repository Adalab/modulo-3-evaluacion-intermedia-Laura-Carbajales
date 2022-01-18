import { useEffect, useState } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [counselor, setCounselor] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchCounselor, setSearchCounselor] = useState('choose');

  useEffect(() => {
    callToApi().then((response) => {
      setData(response);
    });
  }, []);

  const filteredByName = data.filter((adalaber) =>
    adalaber.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const filteredByCounselor = filteredByName.filter((adalaber) => {
    if (searchCounselor === 'yanelis') {
      return adalaber.counselor === 'Yanelis';
    } else if (searchCounselor === 'dayana') {
      return adalaber.counselor === 'Dayana';
    } else if (searchCounselor === 'ivan') {
      return adalaber.counselor === 'Iván';
    }
    return 'choose';
  });

  const htmlAdalabers = filteredByCounselor.map((adalaber, index) => {
    return (
      <tr key={index}>
        <td>{adalaber.name}</td>
        <td>{adalaber.counselor}</td>
        <td>{adalaber.speciality}</td>
      </tr>
    );
  });

  const handleChangeSearch = (ev) => {
    setSearchName(ev.currentTarget.value);
  };
  const handleSelectSearch = (ev) => {
    setSearchCounselor(ev.target.value);
  };

  const handleChangeName = (ev) => {
    setName(ev.currentTarget.value);
  };

  const handleChangeCounselor = (ev) => {
    setCounselor(ev.currentTarget.value);
  };

  const handleChangeSpeciality = (ev) => {
    setSpeciality(ev.currentTarget.value);
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    const newAdalaber = {
      name: name,
      counselor: counselor,
      speciality: speciality,
    };
    setData([...data, newAdalaber]);
    setName('');
    setCounselor('');
    setSpeciality('');
  };

  return (
    <div>
      <header>
        <h1>Adalabers</h1>
        <form>
          <label htmlFor='filter'>Filtra por nombre:</label>
          <input
            id='filterName'
            autoComplete='off'
            type='search'
            name='search'
            placeholder='Filtrar adalabers por nombre'
            onChange={handleChangeSearch}
            value={searchName}
          />
          <label htmlFor='filterCounselor'>Filtra por tutor:</label>
          <select
            id='filterCounselor'
            name='filter'
            value={searchCounselor}
            onChange={handleSelectSearch}
          >
            <option value='choose' disabled>
              Escoge una opción
            </option>
            <option value='yanelis'>Yanelis</option>
            <option value='dayana'>Dayana</option>
            <option value='ivan'>Iván</option>
          </select>
        </form>
      </header>
      <main>
        <section>
          <table>
            <thead>
              <tr>
                <td>Nombre</td>
                <td>Tutora</td>
                <td>Especialidad</td>
              </tr>
            </thead>
            <tbody>{htmlAdalabers}</tbody>
          </table>
        </section>
        <section>
          <form>
            <label htmlFor='name'>Nombre</label>
            <input id='name' type='text' name='name' onChange={handleChangeName} value={name} />
            <label htmlFor='teacher'>Tutora</label>
            <input
              id='teacher'
              type='text'
              name='teacher'
              onChange={handleChangeCounselor}
              value={counselor}
            />
            <label htmlFor='specialty'>Especialidad</label>
            <input
              id='specialty'
              type='text'
              name='specialty'
              onChange={handleChangeSpeciality}
              value={speciality}
            />
            <button onClick={handleClick}>Añadir una nueva Adalaber</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
