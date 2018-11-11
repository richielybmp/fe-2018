
// Chamada de método responsável por carregar a combo de Uso.
carregueJson("./json/tipoUsoNome.json", function(response) {
    // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
    var usoNomes = JSON.parse(response);

    // Select "Uso"
    var elUso = document.getElementById("uso-nome");

    // Para cada item no objeto Relacionamentos, vamos criar uma <option> e adicionar no "select"
    usoNomes.Uso.forEach(rel => {
        var option = document.createElement("option");
        option.text = rel.descricao;
        option.value = rel.codigo;
        option.dataset.desc = rel.descricao;
        elUso.appendChild(option);
    });
});
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


    let nome = $("#nome").val();
    let sobrenome = $("#sobrenome").val();
    let uso = $("#uso-nome").val();
    let inicio = $("#uso-data-inicio").val();
    let fim = $("#uso-data-fim").val();
    let arrayUso = {
        1: 'Relatório',
        2: 'Nome de recém-nascido',
        3: 'Nome profissional ou comercial',
        4: 'Nome de solteiro, nome de nascimento ou nome original',
        5: 'Nome registrado (nome legal)',
        8: 'Outro nome (alias)'
    };

    let representacoes = $("input[name='representacao[]']")
        .map(function(){
            return $(this).val();
        })
        .get();
    let representTable = "";
    representacoes.forEach(element => {
        representTable += element+"<br>";
    })

    var elTr = criarComponenteHtmlDinamico({ tag: "tr", id: nome + sobrenome });

    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: "ID-" + /*(ehVinculo ? "-V" : "-P" )*/ + id_nome++ }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: nome }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: sobrenome }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", className: "uso", innerHTML: arrayUso[uso]   }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", className: "inicio-uso", innerHTML: inicio }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", className: "fim-uso", innerHTML: fim }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", className: "", innerHTML: representTable }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: '<input type="radio" name="preferido" id="">' }));

    elTr.addEventListener("dblclick", editarNome);
    bodytabelaIdentificadores.appendChild(elTr);
    $("#tabelaNomes").show();
    if(id_nome < 9)
    $("#btnNovoNome")[0].style.display = "block";

}
function editarNome(evt) {
    var linha = $(evt.target).closest("tr")[0];

    $("#nome").val($($(linha).find("td:eq(1)")[0]).text());
    $("#sobrenome").val($($(linha).find("td:eq(2)")[0]).text());
    console.log($(linha).find("td.uso")[0].textContent);
    $("#uso-nome").val($(linha).find("td.uso")[0].textContent);
    $("#uso-data-inicio").val($($(linha).find("td:eq(4)")[0]).text());
    $("#uso-data-fim").val($(linha).find("td:eq(5)")[0].textContent);
    //$("#uso-data-inicio").val($(linha).find("td:eq(4)")[0].text);

    $("#chaveVinculo").val(linha.id);

    $("#regiao-vinculos .acoes #btnExcluir").show();
    $("#regiao-vinculos .acoes #btnCancelar").show();

    $("#btnNovoNome")[0].style.display = "none";
    $("#regiao-nomes").show();
    $("#acoes-id-nome").show();
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

// Método responsável por adicionar Identificadores de vínvulos e pacientes na tabela.
/*function acaoBotaoSalvarNome(el) {
    var elObrigatorios = $(el).closest(".form-identificadores").find(".identificador select,input:required");
    var inconsistente = false;

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
        } else {
            $(elObrigatorios[i]).css("border-color", "#ced4da");
        }
    }

    if (!inconsistente) {
        //$(el).closest(".form-identificadores").find(".identificador input,select").prop("disabled", true);
        el.setAttribute("salvou", true);
        $(".caixa.opcional").hide();
        $("#btnNovoIdentificador")[0].style.display = "block";
        $("#regiao-identificadores").hide();
        adicionarNaTabela();
    }
}*/
function acaoBotaoCancelarNome(el) {
    var options = {
        el: el,
        btnNovo: $("#btnNovoIdentificador"),
        form: "form-identificadores",
        classForm: "identificador",
        regiao: $("#regiao-identificadores")
    };
    $(".opcional").hide();
    acaoBotaoCancelarForm(options);
}