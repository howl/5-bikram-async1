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

/* Ejercicio 7 */
const getAndPrintGitHubUserProfile = async (username) => {
  try {
    const user = await getGitHubUserProfile(username);
    const sectionElement = document.createElement('section');
    const userImgElement = document.createElement('img');
    const userNameElement = document.createElement('h1');
    const userReposElement = document.createElement('p');
    userImgElement.src = user.avatar_url;
    userImgElement.alt = user.name;
    userNameElement.appendChild(document.createTextNode(user.name));
    userReposElement.appendChild(document.createTextNode(`Public repos: ${user.public_repos}`));
    sectionElement.append(userImgElement, userNameElement, userReposElement);
    return sectionElement.outerHTML;
  } catch (error) {
    console.log(error);
  }
};

/* Ejercicio 8 */
const createGitHubUserFindForm = () => {
  const form = document.createElement('form');
  const inputLabel = document.createElement('label');
  const input = document.createElement('input');
  const button = document.createElement('input');

  inputLabel.setAttribute('for', 'input');
  inputLabel.appendChild(document.createTextNode('Nombre de usuario: '));
  input.id = 'input';
  button.id = 'button';
  button.value = 'Buscar usuario';
  button.type = 'submit';

  form.append(inputLabel, input, button);
  document.body.prepend(form);

  return form;
};

document.addEventListener('DOMContentLoaded', (ev) => {
  createGitHubUserFindForm().addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const profile = await getAndPrintGitHubUserProfile(ev.target.input.value);
    console.log(profile);
  });
});

/* Ejercicio 9 */
const getGitHubUserProfileOnlyNameAndUrl = async username => {
  try {
    const userProfile = await getGitHubUserProfile(username);
    if (!userProfile.name || !userProfile.html_url) throw `Fallo al recuperar el perfil del usuario ${username}`;
    return { name: userProfile.name, html_url: userProfile.html_url };
  } catch (error) {
    console.log(error);
  }
};

const fetchGithubUsers = async usernames => {
  try {
    const promesas = Promise.all(usernames.map(username => getGitHubUserProfileOnlyNameAndUrl(username)));
    (await promesas).forEach(usuario => console.log(`Name: ${usuario.name} , URL: ${usuario.html_url}`));
    return promesas;
  } catch (error) {
    console.log(error);
  }
};
