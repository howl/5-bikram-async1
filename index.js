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

/* Ejercicio 4 */
const getAllImagesByBreed2 = async (raza) => {
  try {
    const datos = await consulta(`https://dog.ceo/api/breed/${raza}/images`);
    if (datos.status !== 'success') throw `Error al extraer las imágenes de la raza ${raza}.`
    return datos.message;
  } catch (error) {
    console.log(error);
  }
};

/* Ejercicio 5 */
const getGitHubUserProfile = async (username) => {
  try {
    const datos = await consulta(`https://api.github.com/users/${username}`);
    if (datos.login.toLowerCase() !== username) throw `Error al recoger el perfil del usuario ${username}.`;
    return datos;
  } catch (error) {
    console.log(error);
  }
};

/* Ejercicio 6 */
const printGithubUserProfile = async (username) => {
  try {
    const user = await getGitHubUserProfile(username);
    const userImg = document.createElement('img');
    const userNameP = document.createElement('p');

    userImg.src = user.avatar_url;
    userImg.alt = `Avatar en GitHub de ${user.login}`;
    userNameP.appendChild(document.createTextNode(user.name));

    return { img: userImg.outerHTML, name: userNameP.innerHTML };
  } catch (error) {
    console.log(error);
  }
};
