import { useEffect, useState } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [counselor, setCounselor] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchCounselor, setSearchCounselor] = useState('all');

  useEffect(() => {
    callToApi().then((response) => {
      setData(response);
    });
  }, []);

  const filteredByName = data.filter((adalaber) =>
    adalaber.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const filteredByCounselor = filteredByName.filter((adalaber) => {
    if (searchCounselor === 'all') {
      return true;
    }
    return adalaber.counselor.toLowerCase() === searchCounselor.toLowerCase();
  });

  const htmlAdalabers = filteredByCounselor.map((adalaber, index) => {
    return (
      <tr className='row' key={index}>
        <td>{adalaber.name}</td>
        <td>{adalaber.counselor}</td>
        <td>{adalaber.speciality}</td>
        <td>
          <ul>
            {adalaber.social_networks.map((social, index) => {
              return (
                <li key={index}>
                  <a href={social.url}>{social.name}</a>
                </li>
              );
            })}
          </ul>
        </td>
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
      social_networks: [],
    };
    setData([...data, newAdalaber]);
    setName('');
    setCounselor('');
    setSpeciality('');
  };

  return (
    <div>
      <header className='header'>
        <h1 className='header__title'>Adalabers</h1>
        <form className='header__form'>
          <label className='header__form--label' htmlFor='filter'>
            Filtra por nombre:
          </label>
          <input
            className='header__form--input'
            id='filterName'
            autoComplete='off'
            type='search'
            name='search'
            placeholder='Filtrar adalabers por nombre'
            onChange={handleChangeSearch}
            value={searchName}
          />
          <label className='header__form--label' htmlFor='filterCounselor'>
            Filtra por tutor:
          </label>
          <select
            className='header__form--select'
            id='filterCounselor'
            name='filter'
            value={searchCounselor}
            onChange={handleSelectSearch}
          >
            <option value='all'>Todos</option>
            <option value='Yanelis'>Yanelis</option>
            <option value='Dayana'>Dayana</option>
            <option value='Iván'>Iván</option>
          </select>
        </form>
      </header>
      <main>
        <section className='main1'>
          <table className='main1__table'>
            <thead className='main1__table--head'>
              <tr>
                <td>Nombre</td>
                <td>Tutora</td>
                <td>Especialidad</td>
                <td>RR.SS.</td>
              </tr>
            </thead>
            <tbody className='main1__table--body'>{htmlAdalabers}</tbody>
          </table>
        </section>
        <section className='main2'>
          <form className='main2__form'>
            <label className='main2__form--label' htmlFor='name'>
              Nombre
            </label>
            <input
              className='main2__form--input'
              id='name'
              type='text'
              name='name'
              onChange={handleChangeName}
              value={name}
            />
            <label className='main2__form--label' htmlFor='teacher'>
              Tutora
            </label>
            <input
              className='main2__form--input'
              id='teacher'
              type='text'
              name='teacher'
              onChange={handleChangeCounselor}
              value={counselor}
            />
            <label className='main2__form--label' htmlFor='specialty'>
              Especialidad
            </label>
            <input
              className='main2__form--input'
              id='specialty'
              type='text'
              name='specialty'
              onChange={handleChangeSpeciality}
              value={speciality}
            />
            <button className='main2__form--btn' onClick={handleClick}>
              Añadir una nueva Adalaber
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
