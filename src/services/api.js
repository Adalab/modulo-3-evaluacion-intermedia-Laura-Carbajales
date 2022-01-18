const callToApi = () => {
  // Llamamos al API
  return fetch('https://beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json')
    .then((response) => response.json())
    .then((response) => {
      // Cuando responde el API podemos limpiar los datos aquí
      const result = response.results.map((adalaber) => {
        return {
          name: adalaber.name,
          counselor: adalaber.counselor,
          speciality: adalaber.speciality,
        };
      });
      return result;
    });
};

export default callToApi;
