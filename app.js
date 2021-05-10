const btn = document.querySelector('button');
btn.addEventListener('click', requisicao);
function limpaInput() {
  document.getElementById('search').value = '';
}
function requisicao() {
  limpaTela();
  limpaClubesInfo();
  const cardsPosition = document.querySelector('.cards-position');
  const search = document.getElementById('search');
  if (search.value == '' || search.value == undefined || search.value == null) {
    alert('nao foi');
  } else {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${search.value}`,
    ).then((r) =>
      r.json().then((json) => {
        for (let i of json.teams) {
          const div = document.createElement('div');
          div.classList.add('cards');
          div.setAttribute('id', `${i.idTeam}`);
          const span = document.createElement('span');
          const img = document.createElement('img');
          img.setAttribute('src', `${i.strTeamBadge}`);
          img.classList.add('img');
          span.innerText = `${i.idTeam}  ${i.strTeam}  ${i.strSport}  ${i.strLeague}`;
          div.appendChild(img);
          div.appendChild(span);
          cardsPosition.appendChild(div);
        }
        exibeInfo();
      }),
    );
  }
}
function exibeInfo() {
  const div = document.querySelectorAll('.cards-position .cards');
  if (div !== null) {
    div.forEach((item) => {
      item.addEventListener('click', () => {
        fetch(
          `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${item.getAttribute(
            'id',
          )}`,
        ).then((r) =>
          r.json().then((json) => {
            limpaTela();
            for (let i of json.teams) {
              new CreateElementsDataClub(
                i.strTeam,
                i.strTeamBadge,
                i.strLeague,
                i.strSport,
                i.strStadium,
                i.strStadiumDescription,
                i.strStadiumThumb,
                i.intStadiumCapacity,
                i.strStadiumLocation,
                i.strDescriptionEN,
                i.strCountry,
              );
              new PhotoGalery(
                i.strTeamBadge,
                i.strTeamJersey,
                i.strTeamLogo,
                i.strTeamFanart1,
                i.strTeamFanart2,
                i.strTeamFanart3,
                i.strTeamFanart4,
                i.strTeamBanner,
              );
              new CriaLinkYoutube(i.strYoutube);
              new SocialMediaClubs(i.strFacebook, i.strInstagram, i.strTwitter);
              criaBotaoVoltar();
            }
          }),
        );
      });
    });
  }
}
function limpaTela() {
  const cardsPosition = document.querySelector('.cards-position');
  cardsPosition.innerHTML = '';
}
function limpaClubesInfo() {
  const dataClubs = document.getElementById('data-clubs');
  dataClubs.innerHTML = '';
}
function CreateElementsDataClub(
  strTeam,
  strTeamBadge,
  strLeague,
  strSport,
  strStadium,
  strStadiumDescription,
  strStadiumThumb,
  intStadiumCapacity,
  strStadiumLocation,
  strDescriptionEN,
  strCountry,
) {
  this.strTeam = strTeam;
  this.strTeamBadge = strTeamBadge;
  this.strLeague = strLeague;
  this.strSport = strSport;
  this.strStadium = strStadium;
  this.strStadium = strStadium;
  this.strStadiumDescription = strStadiumDescription;
  this.strStadiumThumb = strStadiumThumb;
  this.intStadiumCapacity = intStadiumCapacity;
  this.strStadiumLocation = strStadiumLocation;
  this.strDescriptionEN = strDescriptionEN;
  this.strCountry = strCountry;

  const h2 = document.createElement('h2');
  h2.classList.add('h2');
  h2.innerHTML = this.strTeam;
  const img = document.createElement('img');
  img.classList.add('img-club');
  img.setAttribute('src', `${this.strTeamBadge}`);
  const paragraph = document.createElement('p');
  paragraph.innerText = `${this.strLeague}
  ${this.strSport}
  ${this.strStadium}
  ${this.strStadiumDescription}

  `;
  const divThumbStadium = document.createElement('div');
  divThumbStadium.classList.add('div-thumb-stadium');
  const thumStadium = document.createElement('img');
  thumStadium.classList.add('thumb');
  thumStadium.setAttribute('src', `${this.strStadiumThumb}`);
  divThumbStadium.appendChild(thumStadium);
  const stadiumCapacity = document.createElement('p');
  stadiumCapacity.innerText = `Stadium Capacity: ${this.intStadiumCapacity}
  ${this.strStadiumLocation}
  
  ${this.strDescriptionEN}
  ${this.strCountry}
  `;

  const dataClubs = document.getElementById('data-clubs');
  for (i in this) {
    if (this[i] === null) {
      thumStadium.removeAttribute('src');
      divThumbStadium.innerText = `${i}: The information is not in the database
      
      `;
      paragraph.innerText = paragraph.innerText.replace(
        'null',
        `${i}: The information is not in the database`,
      );
    } else {
      dataClubs.appendChild(h2);
      dataClubs.appendChild(img);
      dataClubs.appendChild(paragraph);
      dataClubs.appendChild(divThumbStadium);
      dataClubs.appendChild(stadiumCapacity);
    }
  }
}
function PhotoGalery(
  strTeamBadge,
  strTeamJersey,
  strTeamLogo,
  strTeamFanart1,
  strTeamFanart2,
  strTeamFanart3,
  strTeamFanart4,
  strTeamBanner,
) {
  this.strTeamBadge = strTeamBadge;
  this.strTeamJersey = strTeamJersey;
  this.strTeamLogo = strTeamLogo;
  this.strTeamFanart1 = strTeamFanart1;
  this.strTeamFanart2 = strTeamFanart2;
  this.strTeamFanart3 = strTeamFanart3;
  this.strTeamFanart4 = strTeamFanart4;
  this.strTeamBanner = strTeamBanner;

  const divGalery = document.createElement('div');
  divGalery.classList.add('div-galery');

  for (i in this) {
    if (this[i] == null) {
      const pNull = document.createElement('p');
      pNull.innerText = `${i}: The information is not in the database`;
      divGalery.appendChild(pNull);
    } else {
      const imgGalery = document.createElement('img');
      imgGalery.classList.add('img-galery');
      imgGalery.setAttribute('src', `${this[i]}`);
      divGalery.appendChild(imgGalery);
    }
  }
  const dataClubs = document.getElementById('data-clubs');
  dataClubs.appendChild(divGalery);
}
const dataClubs = document.getElementById('data-clubs');
function CriaLinkYoutube(strYoutube) {
  this.strYoutube = strYoutube;
  const divLinkYoutube = document.createElement('div');
  const linkYoutube = document.createElement('a');
  if (!this.strYoutube) {
    linkYoutube.innerText = 'Não contém link do Youtube';
  } else {
    linkYoutube.setAttribute('href', `https://${this.strYoutube}`);
    linkYoutube.innerText = this.strYoutube;
    linkYoutube.innerText = linkYoutube.innerText.replace('str', '');
  }
  divLinkYoutube.appendChild(linkYoutube);
  dataClubs.appendChild(divLinkYoutube);
}
function SocialMediaClubs(strFacebook, strInstagram, strTwitter) {
  this.strFacebook = strFacebook;
  this.strInstagram = strInstagram;
  this.strTwitter = strTwitter;
  const divSocialMedia = document.createElement('div');
  divSocialMedia.classList.add('divSocialMedia');
  for (i in this) {
    const linkSocialMedia = document.createElement('a');
    if (!this[i]) {
      linkSocialMedia.innerText = `${i}: Rede social inexistente`;
      linkSocialMedia.innerText = linkSocialMedia.innerText.replace('str', '');
    } else {
      linkSocialMedia.setAttribute('href', `https://${this[i]}`);
      linkSocialMedia.innerText = i;
      linkSocialMedia.innerText = linkSocialMedia.innerText.replace('str', '');
    }
    divSocialMedia.appendChild(linkSocialMedia);
    dataClubs.appendChild(divSocialMedia);
  }
}
function criaBotaoVoltar() {
  const btn = document.createElement('button');
  btn.classList.add('btn-back');
  btn.innerText = 'Voltar';
  const dataClubs = document.getElementById('data-clubs');
  dataClubs.appendChild(btn);
  btn.addEventListener('click', requisicao);
}
