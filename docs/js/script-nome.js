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
        //$(".caixa-nome.opcional").hide()
        //$("#btnNovoIdentificador")[0].style.display = "block";
        $("#regiao-nomes").hide();

        adicionarNomeNaTabela();
    }
}

let id_nome = 1;
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
    let uso = $("#uso-nome").val();
    let arrayUso = {
        1: 'Relatório',
        2: 'Nome de recém-nascido',
        3: 'Nome profissional ou comercial',
        4: 'Nome de solteiro, nome de nascimento ou nome original',
        5: 'Nome registrado (nome legal)',
        8: 'Outro nome (alias)'
    };


    var elTr = criarComponenteHtmlDinamico({ tag: "tr", id: nome + sobrenome });

    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: "ID-" + /*(ehVinculo ? "-V" : "-P" )*/ + id_nome++ }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: nome }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: sobrenome }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: arrayUso[uso] }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: '<input type="radio" name="preferido" id="">' }));

    bodytabelaIdentificadores.appendChild(elTr);
    $("#tabelaNomes").show();
    if(id_nome < 9)
    $("#btnNovoNome")[0].style.display = "block";

}
function mostrarNovoCadastroDeNome(el){
    var options = {
        el: el,
        form: $(".form-nomes"),
        classForm: "nome",
        regiao: $("#regiao-nomes")
    }
    $(".caixa-nome.opcional").fadeIn("fast");
    mostrarNovoCadastroForm(options);
}

/************* Representação ************/
function adicionarRepresentacaoNome(el) {
    let grupoUltimoFilho = $($(".container-representacao-nome")[0].children).last();
    if(grupoUltimoFilho.find('input').val() != ""){
        grupoUltimoFilho.clone().appendTo('.container-representacao-nome')
        $($(".container-representacao-nome")[0]
            .children)
            .last()
            .find('input')
            .val("")
            .focus()
    }else{
        $($($(".container-representacao-nome")[0].children).last().find('input')).css("border-color", "red")
        return;
    }
    $(grupoUltimoFilho).find('input').css("border-color", "#ced4da")
    $($($(".container-representacao-nome")[0].children).last().find('input')).css("border-color", "#ced4da")

}
function removerRepresentacaoNome(el) {
    //$("#form-nomes").find(".campo-representacao").remove($($(".container-representacao-nome")[0].children).last())
    if($(".container-representacao-nome")[0].children.length > 1){
        $($(".container-representacao-nome")[0].children).last().remove()
    }

}