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

 /****** UTILITÁRIOS - FIM ******/