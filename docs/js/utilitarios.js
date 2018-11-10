"use strict"

var page = $("html, body");

/****** UTILITÁRIOS ******/
// Método responsável por ler arquivo json.
function carregueJson(fileName, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', fileName, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

//Método responsável por criar um compnente HTML dinamicamente.
function criarComponenteHtmlDinamico(options) {
    if (options != null && options.tag != null || options.tag != "") {
        var el = document.createElement(options.tag);

        if (existeValor(options.id)) {
            el.id = options.id;
        }

        if (existeValor(options.className)) {
            el.className = options.className;
        }

        if (existeValor(options.name)) {
            el.name = options.name;
        }

        if (existeValor(options.innerHTML)) {
            el.innerHTML = options.innerHTML;
        }

        if (existeValor(options.htmlFor)) {
            el.htmlFor = options.htmlFor;
        }

        if (existeValor(options.type)) {
            el.type = options.type;
        }

        if (existeValor(options.value)) {
            el.value = options.value;
        }

        return el;
    }
}

// Método responsável por verificar se objeto possui valor.
function existeValor(obj) {
    return obj != null && obj != undefined && obj != "";
}

$("body").scrollspy({ target: "#spy", offset: 80 });

// Método responsável por rolar scroll ao clicar no menu lateral.
$("#spy > .nav li:not(:last)").click(function(evt) {
    $(".sidebar-nav.nav li").removeClass("selecionado");

    var ref = $(evt.target).closest("a")[0];

    if (ref != undefined) {
        $("html, body").animate({
            scrollTop: $(ref.hash) ? $(ref.hash).offset().top : 0
        }, 500);
    }

    $(evt.target).closest("li").addClass("selecionado");

    return false;
});

// Método responsável por mostrar seção de pesquisar indivíduos.
function mostrePesquisa() {
    $("section:not(#pesquisar, #header)").fadeOut(600, function() {
        $("section#pesquisar").show();
        $("#chkCadastroDeVinculo").parent().hide();
        $("#spy li:not(.sidebar-brand, .li-inferior)").fadeOut(200);
        $(".botoes-acoes-geral").hide();
    });
}

// Método responsável por mostrar seção inicial.
function mostreInicio() {
    $("section#pesquisar").fadeOut(600, function() {
        if ($("#chkCadastroDeVinculo")[0].checked) {
            $("section#vinculos").show();
            $("#refVinculos").fadeIn(300);
        }
        $("section:not(#pesquisar, #header, #vinculos)").show();
        $("#chkCadastroDeVinculo").parent().show();
        $("#spy li:not(.sidebar-brand, #refVinculos)").fadeIn(300);
        $(".botoes-acoes-geral").show();
    });
}

function abrirModalAbout() {
    $('#modalAbout').modal('show');
}

function mudaNacionalidade() {
    var db = document.getElementById('Bra');
    var de = document.getElementById('Est');

    var elemento = document.getElementById('brasileira');
    if (elemento.checked) {
        db.style.display = "block";
        de.style.display = "none";
    } else {
        db.style.display = "none";
        de.style.display = "block";
    }
}
/****** UTILITÁRIOS - FIM ******/