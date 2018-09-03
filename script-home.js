function carregueEstados(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'estados.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 carregueEstados(function(response) {
    // Na resposta do carregueEstados, é realizado um callback com a responseText.
    // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
    var estados = JSON.parse(response);

    // Select 'estados'
    var elEstados = document.getElementById("selectEstado");

    // Para cada item no objeto Estados, vamos criar uma <option> e adicionar no 'select'
    estados.Estados.forEach(estado => {
        //console.log(estado);
        var option = document.createElement("option");
        option.text = estado.nome;  // Goiás
        option.value = estado.sigla; // GO
        elEstados.appendChild(option);
    });
});


const tipoIdentificador = document.getElementById('selectTipoIdentificador');
tipoIdentificador.addEventListener('change', mostreFormularios);

function mostreFormularios(){
    var valor = this.value;

    var formsOpicionais = document.querySelectorAll('#identificadores .opcional');

    // Esconder todas as regiões opcionais
    // javascript puro
    for (el in Array.from(formsOpicionais)){
        formsOpicionais[el].style.display = "none";
    }
    // jQuery
    //formsOpicionais.hide();

    // Mostrar a região selecionada no select
    switch(valor){
        case '10':
            var elemento = document.getElementById("form-ctps");
            // javascript puro
            elemento.style.display = "block";
            // jQuery
            //$(elemento).show();
            break;
        case '11':
            var elemento = document.getElementById("form-tEleitor");
            elemento.style.display = "block";
            break;
        case '12':
            var elemento = document.getElementById("form-certidao");
            elemento.style.display = "block";
            break;
        default:
          break;
    }
}