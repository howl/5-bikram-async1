//RESUELVE TUS EJERCICIOS AQUI
/* Creo una función genérica de consulta a una URL. */
const consulta = async (url) => {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw respuesta.status;
    return await respuesta.json();
  } catch (error) {
    throw `La consulta produjo un error: ${error}`;
  }
}

/* Ejercicio 1 */
const getAllBreeds = async () => {
  try {
    const datos = await consulta('https://dog.ceo/api/breeds/list/all');
    if (datos.status !== 'success') throw 'Error al extraer los datos.'
    return Object.keys(datos.message);
  }
  catch (error) {
    console.log(error);
  }
};

/* Ejercicio 2 */
const getRandomDog = async () => {
  try {
    const datos = await consulta('https://dog.ceo/api/breeds/image/random');
    if (datos.status !== 'success') throw 'Error al extraer la imagen aleatoria.'
    return datos.message;
  } catch (error) {
    console.log(error);
  }
};

/* Ejercicio 3 */
const getAllImagesByBreed = async () => {
  try {
    const raza = 'komondor';
    const datos = await consulta(`https://dog.ceo/api/breed/${raza}/images`);
    if (datos.status !== 'success') throw `Error al extraer las imagenes de la raza ${raza}.`
    return datos.message;
  } catch (error) {
    console.log(error);
  }
};
