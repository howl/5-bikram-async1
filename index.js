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
