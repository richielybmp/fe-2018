/****** UTILITÁRIOS ******/
// Método responsável por ler arquivo json.
function carregueJson(fileName, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', fileName, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function criarComponenteHtmlDinamico(options){
    if (options != null && options.tag != null || options.tag != ""){
        var el = document.createElement(options.tag);
        
        if (existeValor(options.id))
            el.id = options.id;

        if (existeValor(options.className))
            el.className = options.className;
        
        if (existeValor(options.name))
            el.name = options.name;
            
        if (existeValor(options.innerHTML))
            el.innerHTML = options.innerHTML;
            
        if (existeValor(options.htmlFor))
            el.htmlFor = options.htmlFor;
    
        if (existeValor(options.type))
            el.type = options.type;

        if (existeValor(options.value))
            el.value = options.value;
        
        return el;
    }
}

function existeValor(obj){
    return obj != null && obj != undefined && obj != "";
}

/*Scroll Spy*/
$('body').scrollspy({ target: '#spy', offset:80});

var page = $('html, body');
$("#spy > .nav li").click(function(evt) {
    $(".sidebar-nav.nav li").removeClass("selecionado");

    var ref = $(evt.target).closest('a')[0];
    
    if(ref != undefined){
        $('html, body').animate({
            scrollTop: $(ref.hash).offset().top
        }, 500);
    }
    
    $(evt.target).closest("li").addClass("selecionado");
    return false;
});

function mostrePesquisa(){
    $("section:not(#pesquisar, #header)").fadeOut(600, function(){
        $("section#pesquisar").show();
        $("#spy li:not(.sidebar-brand)").fadeOut(200);
    });
}

function mostreInicio(){
    $("section#pesquisar").fadeOut(600, function(){
        $("section:not(#pesquisar, #header)").show();
        $("#spy li:not(.sidebar-brand)").fadeIn(300);
    });
}
 /****** UTILITÁRIOS - FIM ******/