function acaoBotaoSalvarNome(el) {
    let elObrigatorios = $(el).closest("#form-nomes").find(".identificador select,input:required");
    let inconsistente = false;


    for (var i = 0; i < elObrigatorios.length; i++) {
        if ($(elObrigatorios[i]).val() == "" || $(elObrigatorios[i]).val() == null) {
            var elementosSuperiores = $(elObrigatorios[i]).parents();
            var index = 0;
            for (var j = 0; j < elementosSuperiores.length; j++) {
                if ($(elementosSuperiores[j]).hasClass("opcional")) {
                    index = j;
                    break;
                }
            }
            if (index > 0) {
                if (elementosSuperiores[index].style.display == "block") {
                    $(elObrigatorios[i]).css("border-color", "red");
                    inconsistente = true;
                }
            }
            //else if (index == 0 && ) {
            else if (index == 0) {
                $(elObrigatorios[i]).css("border-color", "red");
                inconsistente = true;
            }
        }
        else {
            $(elObrigatorios[i]).css("border-color", "#ced4da");
        }
    }

    if (!inconsistente) {
        //$(el).closest(".form-identificadores").find(".identificador input,select").prop("disabled", true);
        //el.setAttribute("salvou", true);
        $(".caixa-nome.opcional").hide()
        //$("#btnNovoIdentificador")[0].style.display = "block";
        $("#regiao-nomes").hide();

        adicionarNomeNaTabela();
    }
}

function adicionarNomeNaTabela(){
    var bodytabelaIdentificadores = $("#tabelaNomes tbody")[0];
    var bodytabelaIdentificadoresVinculos = $("#tabelaIdentificadoresVinculos tbody")[0];

    // var tipo = $("#selectTipoDoID")[0].selectedOptions[0].text;
    // var area = $("#selectArea")[0].selectedOptions[0].text;
    // var designacao = $("#idDesignacao").val();
    // var emissor = $("#idEmissor").val();
    // var dataEmissao = $("#idDataEmissao").val();
    // var ehVinculo = $("#chkCadastroDeVinculo")[0].checked;

    let nome = $("#nome").val();
    let sobrenome = $("#sobrenome").val();


    var elTr = criarComponenteHtmlDinamico({ tag: "tr", id: nome + sobrenome });

    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: "ID-" + /*(ehVinculo ? "-V" : "-P" )*/ + id++ }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: nome }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: sobrenome }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: '' }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: '<input type="radio" name="preferido" id="">' }));

    bodytabelaIdentificadores.appendChild(elTr);
    $("#tabelaNomes").show();
    $("#btnNovoNome")[0].style.display = "block";

}
function mostrarNovoCadastroDeNome(el){
    var options = {
        el: el,
        form: $(".form-identificadores"),
        classForm: "nome",
        regiao: $("#regiao-nomes")
    }
    mostrarNovoCadastroForm(options);
}