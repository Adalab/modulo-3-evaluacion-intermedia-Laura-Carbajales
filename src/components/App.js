import '../styles/App.scss';

function App() {
  return (
    <div>
      <header>
        <h1>Adalabers</h1>
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
            <tbody>
              <tr>
                <td>alumni</td>
                <td>teacher</td>
                <td>JS</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <form>
            <label htmlFor='name'>Nombre</label>
            <input id='name' type='text' name='name' />
            <label htmlFor='teacher'>Tutora</label>
            <input id='teacher' type='text' name='teacher' />
            <label htmlFor='specialty'>Especialidad</label>
            <input id='specialty' type='text' name='specialty' />
            <button>Añadir una nueva Adalaber</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
