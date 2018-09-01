// const links = Array.from(document.querySelectorAll('.links-nav ul>li'));
// const secoes = document.querySelectorAll('.section');


// function abrirSection() {
//     var name = location.hash.substring(1);
//     var secao = document.getElementById(name);
//     secao.style.display = "block";
// }

const request = new XMLHttpRequest();
request.open('GET', estados.json, true);

request.onload = function() {
    if (request.status === 200) {
      const data = JSON.parse(request.responseText);
      let option;
      for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].name;
        option.value = data[i].abbreviation;
        dropdown.add(option);
      }
     } else {
      // Reached the server, but it returned an error
    }   
  }

  const tipoIdentificador = document.getElementById('tipoIdentificador');
  console.log(tipoIdentificador);

  tipoIdentificador.addEventListener('change', mostreFormularios);

  function mostreFormularios(){
      var valor = this.value;
      switch(valor){
          case '10':
            var elemento = document.getElementById("form-ctps");
            $(elemento).show();
            break;
          default:
            break;
      }
  }