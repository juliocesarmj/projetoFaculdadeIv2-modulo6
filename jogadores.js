const btn = document.querySelector('button');
btn.addEventListener('click', requisicao);
function limpaInput() {
  document.getElementById('search').value = '';
}
function requisicao() {
  limpaTela();
  limpaClubesInfo();

  const search = document.getElementById('search');
  if (search.value == '' || search.value == undefined || search.value == null) {
    alert('nao foi');
  } else {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${search.value}`,
    ).then((r) =>
      r.json().then((json) => {
        limpaTela();
        for (let i of json.player) {
          new CardPlayer(i.strCutout, i.idPlayer, i.strPlayer, i.strTeam);
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
          `https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${item.getAttribute(
            'id',
          )}`,
        ).then((r) =>
          r.json().then((json) => {
            limpaTela();
            for (let i of json.players) {
              new infoPlayers(
                i.strPlayer,
                i.strThumb,
                i.strHeight,
                i.strWeight,
                i.strPosition,
                i.strDescriptionEN,
                i.strBirthLocation,
                i.dateBorn,
                i.strNationality,
                i.strTeam,
              );
              new PhotoGalery(
                i.strThumb,
                i.strCutout,
                i.strRender,
                i.strBanner,
                i.strFanart1,
                i.strFanart2,
                i.strFanart3,
                i.strFanart4,
              );
              new SocialMedia(i.strInstagram, i.strFacebook, i.strTwitter);
              new PesquisaChuteira(i.strKit);
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
function CardPlayer(strCutout, idPlayer, strPlayer, strTeam) {
  this.strCutout = strCutout;
  this.idPlayer = idPlayer;
  this.strPlayer = strPlayer;
  this.strTeam = strTeam;
  const cardsPosition = document.querySelector('.cards-position');
  const div = document.createElement('div');
  div.classList.add('cards');
  div.setAttribute('id', `${this.idPlayer}`);
  const span = document.createElement('span');
  const divImg = document.createElement('div');
  divImg.classList.add('div-thumb-stadium');
  const img = document.createElement('img');
  img.setAttribute('src', `${this.strCutout}`);
  img.classList.add('img');
  divImg.appendChild(img);
  span.innerText = `${this.idPlayer}  ${this.strPlayer}  ${this.strTeam}`;
  for (i in this) {
    if (!this[i]) {
      img.classList.remove('img');
      img.removeAttribute('src');
      span.innerText = `No image ${this.idPlayer}  ${this.strPlayer}  ${this.strTeam}`;
    } else {
      div.appendChild(img);
      div.appendChild(span);
      cardsPosition.appendChild(div);
    }
  }
}
function infoPlayers(
  strPlayer,
  strThumb,
  strHeight,
  strWeight,
  strPosition,
  strDescriptionEN,
  strBirthLocation,
  dateBorn,
  strNationality,
  strTeam,
) {
  this.strPlayer = strPlayer;
  this.strThumb = strThumb;
  this.strHeight = strHeight;
  this.strWeight = strWeight;
  this.strPosition = strPosition;
  this.strDescriptionEN = strDescriptionEN;
  this.strBirthLocation = strBirthLocation;
  this.dateBorn = dateBorn;
  this.strNationality = strNationality;
  this.strTeam = strTeam;

  const h2 = document.createElement('h2');
  h2.classList.add('h2');
  h2.innerHTML = this.strPlayer;
  const divThumb = document.createElement('div');
  const img = document.createElement('img');
  img.classList.add('img-club');
  img.setAttribute('src', `${this.strThumb}`);
  const paragraph = document.createElement('p');
  paragraph.innerText = `${this.strHeight}
  ${this.strWeight}
  ${this.strPosition}

  ${this.strDescriptionEN}
  ${this.strBirthLocation}

  ${this.dateBorn}

  ${this.strNationality}
  ${this.strTeam}
  `;
  const dataClubs = document.getElementById('data-clubs');

  for (i in this) {
    if (!this[i]) {
      img.removeAttribute('src');
      divThumb.innerText = `${i}: The information is not in the database
      
      `;
      paragraph.innerText = paragraph.innerText.replace(
        'null',
        `${i}: The information is not in the database`,
      );
    } else {
      dataClubs.appendChild(h2);
      divThumb.appendChild(img);
      dataClubs.appendChild(divThumb);
      dataClubs.appendChild(paragraph);
    }
  }
}
const dataClubs = document.getElementById('data-clubs');
function SocialMedia(strInstagram, strFacebook, strTwitter) {
  this.strInstagram = strInstagram;
  this.strFacebook = strFacebook;
  this.strTwitter = strTwitter;

  const divSocial = document.createElement('div');
  divSocial.classList.add('social-media');
  for (i in this) {
    const link = document.createElement('a');
    if (!this[i]) {
      link.innerText = `${i}: Rede social inexistente`;
      link.innerText = link.innerText.replace('str', '');
    } else {
      link.setAttribute('href', `https://${this[i]}`);
      link.innerText = i;
      link.innerText = link.innerText.replace('str', '');
    }
    divSocial.appendChild(link);
    dataClubs.appendChild(divSocial);
  }
}
function PhotoGalery(
  strThumb,
  strCutout,
  strRender,
  strBanner,
  strFanart1,
  strFanart2,
  strFanart3,
  strFanart4,
) {
  this.strThumb = strThumb;
  this.strCutout = strCutout;
  this.strRender = strRender;
  this.strBanner = strBanner;
  this.strFanart1 = strFanart1;
  this.strFanart2 = strFanart2;
  this.strFanart3 = strFanart3;
  this.strFanart4 = strFanart4;

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
function PesquisaChuteira(strKit) {
  this.strKit = strKit;
  const modeloChuteira = document.createElement('iframe');

  if (!this.strKit) {
    modeloChuteira.setAttribute(
      'src',
      `https://www.zoom.com.br/search?q=chuteira`,
    );
  } else {
    modeloChuteira.setAttribute(
      'src',
      `https://www.zoom.com.br/search?q=${this.strKit}`,
    );
    modeloChuteira.getAttribute('src').replace(' ', '%');
  }
  dataClubs.appendChild(modeloChuteira);
  //<iframe src="https://www.homehost.com.br"></iframe>
}
function criaBotaoVoltar() {
  const btn = document.createElement('button');
  btn.classList.add('btn-back');
  btn.innerText = 'Voltar';
  const dataClubs = document.getElementById('data-clubs');
  dataClubs.appendChild(btn);
  btn.addEventListener('click', requisicao);
}
