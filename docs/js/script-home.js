/****** IDENTIFICADORES ******/
// Método responsável por mostrar a aba de cadstro de identificadores.
function iniciarCadastro() {
    document.querySelector("#minhaTab > .nav-item #identificadores-tab").click();
}

// Método responsável por mostrar a aba home.
function cancelarCadastro() {
    document.querySelector("#minhaTab > .nav-item #home-tab").click();
}

// Método responsável por exibir a tabela de resultado dos registros da pesquisa de indicadores.
function buscarRegistroIdentificador() {
    document.getElementById("tabela-registros-indicadores").style.display = "table";
}

// Chamada de método responsável por carregar a combo de Estados.
carregueJson("./json/estados.json", function (response) {
    // Na resposta do carregueEstados, é realizado um callback com a responseText.
    // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
    var estados = JSON.parse(response);

    // Select "estados"
    var elEstados = document.getElementById("selectEstado");

    // Para cada item no objeto Estados, vamos criar uma <option> e adicionar no "select"
    estados.Estados.forEach(estado => {
        var option = document.createElement("option");
        option.text = estado.nome;  // Goiás
        option.value = estado.sigla; // GO
        elEstados.appendChild(option);
    });
});

// Chamada de método responsável por carregar a combo de Tipo do identificador.
carregueJson("./json/tiposDeIdentificadores.json", function (response) {
    // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
    var tipo = JSON.parse(response);

    // Select "identificadores"
    var elTipos = document.getElementById("selectTipoDoID");

    // Para cada item no objeto Identificador, vamos criar uma <option> e adicionar no "select"
    tipo.Identificador.forEach(id => {
        var option = document.createElement("option");
        option.text = id.descricao;
        option.value = id.valor;
        elTipos.appendChild(option);
    });
});

// Chamada de método responsável por carregar a combo de Área Geográfica.
carregueJson('./json/area.json', function (response) {
    // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
    var area = JSON.parse(response);

    // Select "Área"
    var elArea = document.getElementById("selectArea");

    // Para cada item no objeto area, vamos criar uma <option> e adicionar no "select"
    area.Area.forEach(area => {
        var option = document.createElement("option");
        option.text = area.descricao;
        option.value = area.valor;
        elArea.appendChild(option);
    });
});


// Chamada de método responsável por carregar a combo de Relacionamentos.
carregueJson("./json/relacionamentos.json", function (response) {
    // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
    var relacionamentos = JSON.parse(response);

    // Select "Relacionamentos"
    var elRelacionamentos = document.getElementById("selectRelacionamentos");

    // Para cada item no objeto Relacionamentos, vamos criar uma <option> e adicionar no "select"
    relacionamentos.Relacionamentos.forEach(rel => {
        var option = document.createElement("option");
        option.text = rel.nome;
        option.value = rel.codigo;
        option.dataset.desc = rel.nome;
        elRelacionamentos.appendChild(option);
    });
});

// Evento que controla a troca do Tipo de Identificador.
$("select.tipoDoIdentificador")[0].addEventListener("change", mostreFormularios);

// Evento que controla o formulário de cadastro de Vínculos.
$("#chkCadastroDeVinculo").change(function() {
    if(this.checked) {
        $("#vinculos").fadeIn("fast");
        $("#tabelaIdentificadores").fadeOut("fast");
        $("#refVinculos").fadeIn("fast");

        if ($($("#tabelaIdentificadoresVinculos tbody")[0])[0].children.length > 0){
            $("#tabelaIdentificadoresVinculos").fadeIn("fast");
        } 
    }
    else{
        $("#vinculos").fadeOut("fast");
        $("#tabelaIdentificadoresVinculos").fadeOut("fast");
        $("#refVinculos").fadeOut("fast");
        
        if ($($("#tabelaIdentificadores tbody")[0])[0].children.length > 0){
            $("#tabelaIdentificadores").fadeIn("fast");
        }
        acaoBotaoCancelarVinculo();
    }
});

// MOSTRAR
// Mostrar form Vinculo.
function mostrarNovoCadastroDeVinculo(el){
    var options = {
        el: el,
        form: $(".form-vinculos"),
        classForm: "vinculo",
        regiao: $("#regiao-vinculos")
    }
    mostrarNovoCadastroForm(options);
}

// Mostrar form Identificadores.
function mostrarNovoCadastroDeIdentificador(el){
    var options = {
        el: el,
        form: $(".form-identificadores"),
        classForm: "identificador",
        regiao: $("#regiao-identificadores")
    }
    $(".caixa.opcional").hide();
    mostrarNovoCadastroForm(options);
}

// Mostrar form Comunicações eletrônicas.
function mostrarNovoCadastroDeContato(el){
    var options = {
        el: el,
        form: $(".form-contatos"),
        classForm: "contato",
        regiao: $("#regiao-contatos")
    }
    mostrarNovoCadastroForm(options);
}

// Método responsável por mostrar form de cadastro.
function mostrarNovoCadastroForm(options){
    options.regiao.fadeIn("fast");
    options.form.find("." + options.classForm + " input,select").prop("disabled", false);
    $(options.el).hide();
}

// ADICIONAR NOVO
// Método responsável por adicionar vínculo na tabela.
function adicionarVinculo() {
    var bodytabelaVinculos = $("#tabelaVinculos tbody")[0];
    var identificador = $("#inputIdVinculo").val();
    var tipoRelacionamento = $("#selectRelacionamentos option:selected").data("desc");
    var dataInicio = $("#dtInicio").val();
    var dataFim = $("#dtFinal").val();
    var inconsistente = false;

    limpaInconsistencias([$("#inputIdVinculo"), $("#selectRelacionamentos"), $("#dtInicio"), $("#dtFinal")]);

    if (identificador == "" || identificador == null) {
        $("#inputIdVinculo").css("border-color", "red");
        inconsistente = true;
    }
    if (tipoRelacionamento == undefined) {
        $("#selectRelacionamentos").css("border-color", "red");
        inconsistente = true;
    }
    if (dataInicio == "") {
        $("#dtInicio").css("border-color", "red");
        inconsistente = true;
    }
    if (dataFim == "") {
        $("#dtFinal").css("border-color", "red");
        inconsistente = true;
    }
    if(!inconsistente) {
        var chave = identificador + dataInicio + dataFim;
        chave = chave.replace(/\s/g, '');
        var elTr = criarComponenteHtmlDinamico({ tag: "tr", id: chave });

        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: identificador }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: tipoRelacionamento }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", className: "opcional", innerHTML: $("#selectRelacionamentos option:selected").val() }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: dataInicio }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: dataFim }));

        elTr.addEventListener("dblclick", editarVinculo);

        bodytabelaVinculos.appendChild(elTr);
        limparVinculo();
        $("#tabelaVinculos").show();
        
        $("#btnNovoVinculo")[0].style.display = "block";
        $("#regiao-vinculos").hide();
    }
}

// Método responsável por adicionar Identificadores de vínvulos e pacientes na tabela.
function acaoBotaoSalvar(el){
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
        }
        else {
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
}

var id = 1;
// Método responsável por adicionar Identificadores de vínvulos e pacientes na tabela.
function adicionarNaTabela(){
    var bodytabelaIdentificadores = $("#tabelaIdentificadores tbody")[0];
    var bodytabelaIdentificadoresVinculos = $("#tabelaIdentificadoresVinculos tbody")[0];

    var tipo = $("#selectTipoDoID")[0].selectedOptions[0].text;
    var area = $("#selectArea")[0].selectedOptions[0].text;
    var designacao = $("#idDesignacao").val();
    var emissor = $("#idEmissor").val();
    var dataEmissao = $("#idDataEmissao").val();
    var ehVinculo = $("#chkCadastroDeVinculo")[0].checked;

    var chave = "ID-" + (ehVinculo ? "V" : "P" ) + id++;

    var elTr = criarComponenteHtmlDinamico({ tag: "tr", id: chave });

    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: chave }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: tipo }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: area }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: designacao }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: emissor }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: dataEmissao }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", className: "opcional", innerHTML: $("#selectTipoDoID option:selected").val() }));

    // Adiciona identificador na tabela de vínculos. 
    // Senão, adiciona na tabela de pacientes.
    if (ehVinculo){
        bodytabelaIdentificadoresVinculos.appendChild(elTr);
        $("#tabelaIdentificadoresVinculos").show();
        $("#tabelaIdentificadores").hide();
    }
    else {
        bodytabelaIdentificadores.appendChild(elTr);
        $("#tabelaIdentificadores").show();
        $("#tabelaIdentificadoresVinculos").hide();
    }
    elTr.addEventListener("dblclick", editarIdentificadores);
}

// Método responsável por adicionar nova comunicação eletrônica na tabela.
function adicionarContato() {
    var bodytabelaContatos = $("#tabelaContatos tbody")[0];
    var meioDeComunicacao = $("#selectMeioDeComunicacao option:selected").data("desc");
    var preferencia = $("#selectPreferenciaDeUso option:selected").data("desc");
    var detalhes = $("#inputDetalhes").val();
    var utilizacao = $("#selectUtilizacaoDoContato option:selected").data("desc");
    var inconsistente = false;

    limpaInconsistencias([$("#selectMeioDeComunicacao"),$("#inputDetalhes"), $("#selectPreferenciaDeUso"), $("#selectUtilizacaoDoContato")]);

    if (meioDeComunicacao == "" || meioDeComunicacao == undefined){
        $("#selectMeioDeComunicacao").css("border-color", "red");
        inconsistente = true;
    }
    if (detalhes == "") {
        $("#inputDetalhes").css("border-color", "red");
        inconsistente = true;
    }
    if (preferencia == "" || preferencia == undefined){
        $("#selectPreferenciaDeUso").css("border-color", "red");
        inconsistente = true;
    }
    if (utilizacao == "" || utilizacao == undefined){
        $("#selectUtilizacaoDoContato").css("border-color", "red");
        inconsistente = true;
    }
    if(!inconsistente) {
        var chave = meioDeComunicacao + detalhes;
        chave = chave.replace(/\s/g, '');
        var elTr = criarComponenteHtmlDinamico({ tag: "tr", id: chave });

        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: meioDeComunicacao }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: detalhes }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: preferencia }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", innerHTML: utilizacao }));

        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", className: "opcional", innerHTML: $("#selectMeioDeComunicacao option:selected").val() }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", className: "opcional", innerHTML: $("#selectPreferenciaDeUso option:selected").val() }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: "td", className: "opcional", innerHTML: $("#selectUtilizacaoDoContato option:selected").val() }));

        elTr.addEventListener("dblclick", editarContato);

        bodytabelaContatos.appendChild(elTr);
        $("#selectMeioDeComunicacao").val("");
        $("#selectPreferenciaDeUso").val("");
        $("#inputDetalhes").val("");
        $("#selectUtilizacaoDoContato").val("");
        $("#tabelaContatos").show();

        $("#btnNovoContato")[0].style.display = "block";
        $("#regiao-contatos").hide();
    }
}

// EDITAR
// Método responsável por carregar a edição mock dos vínculos.
function editarVinculo(evt) {
    var linha = $(evt.target).closest("tr")[0];
    $("#inputIdVinculo").val($($(linha).find("td:eq(0)")[0]).text());
    $("#dtInicio").val($($(linha).find("td:eq(3)")[0]).text());
    $("#dtFinal").val($($(linha).find("td:eq(4)")[0]).text());
    $("#selectRelacionamentos").val($(linha).find("td.opcional")[0].textContent);

    $("#chaveVinculo").val(linha.id);

    $("#regiao-vinculos .acoes #btnExcluir").show();
    $("#regiao-vinculos .acoes #btnCancelar").show();

    $("#btnNovoVinculo")[0].style.display = "none";
    $("#regiao-vinculos").show();
}

function editarIdentificadores(evt){
    var linha = $(evt.target).closest("tr")[0];
    var tipoIdentificador = $($(linha).find("td:eq(6)")[0]).text();

    $("#selectArea").val("1");
    $("#idDesignacao").val("- edição designação -");
    $("#idEmissor").val("- ID-Emissor -");
    $("#idDataEmissao").val("2018-11-02");

    $("#selectTipoDoID").val(tipoIdentificador);

    var ehVinculo = $("#chkCadastroDeVinculo")[0].checked;
    if(ehVinculo){
        $("#chaveIdentificadoresVinculos").val(linha.id);
    }
    else{
        $("#chaveIdentificadores").val(linha.id);
    }

    var formsOpicionais = $(".identificador .opcional");
    // Esconder todas as regiões opcionais
    for (var el in Array.from(formsOpicionais)) {
        formsOpicionais[el].style.display = "none";
        var id = formsOpicionais[el].id;
        controlaHabilitacaoInputs(id, true);
    }

    mostrarRegiao(tipoIdentificador);

    $("#regiao-identificadores .acoes-id #btnExcluir").show();
    $("#regiao-identificadores .acoes-id #btnCancelar").show();

    $("#btnNovoIdentificador")[0].style.display = "none";
    $("#regiao-identificadores").show();

}

// Método responsável por carregar a edição mock das comunicações eletrônicas.
function editarContato(evt) {
    var linha = $(evt.target).closest("tr")[0];
    $("#inputDetalhes").val($($(linha).find("td:eq(1)")[0]).text());
    $("#selectMeioDeComunicacao").val($($(linha).find("td:eq(4)")[0]).text());
    $("#selectPreferenciaDeUso").val($($(linha).find("td:eq(5)")[0]).text())
    $("#selectUtilizacaoDoContato").val($($(linha).find("td:eq(6)")[0]).text());

    $("#chaveContato").val(linha.id);

    $("#btnNovoContato")[0].style.display = "none";
    $("#regiao-contatos").show();

    $("#regiao-contatos .acoes #btnCancelar").show();
    $("#regiao-contatos .acoes #btnExcluir").show();
}

// CANCELAR
// Cancelar cadastro de identificadores.
function acaoBotaoCancelar(el){
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

// Cancelar Cadastro de Vinculo.
function acaoBotaoCancelarVinculo(el){
    var options = {
        el: el, 
        btnNovo: $("#btnNovoVinculo"), 
        form: "form-vinculos", 
        classForm: "vinculo", 
        regiao: $("#regiao-vinculos")
    };
    $("#regiao-vinculos .acoes #btnExcluir").hide();
    acaoBotaoCancelarForm(options);
}

// Cancelar cadastro de comunicações eletrônicas.
function acaoBotaoCancelarContato(el){
    var options = {
        el: el, 
        btnNovo: $("#btnNovoContato"), 
        form: "form-contatos", 
        classForm: "contato", 
        regiao: $("#regiao-contatos")
    };
    $("#regiao-contatos .acoes #btnExcluir").hide();
    acaoBotaoCancelarForm(options);
}

// Método geral que controla ação cancelar.
function acaoBotaoCancelarForm(options){
    var elObrigatorios = $(options.el).closest("." + options.form).find("." + options.classForm + " select,input:required");
    $(elObrigatorios).css("border-color", "#ced4da");
    options.regiao.hide();

    options.btnNovo.fadeIn("fast");
}

// EXCLUIR
// Método responsável por excluir registros.
function acaoExcluirRegistro(options){
    var chave = options.chave.val();
    $("#" + chave).remove();

    var possuiRegistrosNaTabela = $("#" + options.tabela + " tbody tr").length > 0;
    if(!possuiRegistrosNaTabela) {
        $("#" + options.tabela).hide();
    }

    options.btnNovo.style.display = "block";
    options.regiao.hide();
}

// Método responsável por excluir vinculo.
function excluirVinculo(){
    $('#modalExcluir').modal('show');
    
    $("#btnExcluirRegistro").off("click").on("click", function(){
        var options = {
            chave: $("#chaveVinculo"),
            tabela: "tabelaVinculos",
            btnNovo: $("#btnNovoVinculo")[0],
            regiao: $("#regiao-vinculos")
        }
            
        limparVinculo();
        acaoExcluirRegistro(options);
        $('#modalExcluir').modal('hide');
    });
}

// Método responsável por excluir vinculo.
function excluirIdentificador(){
    $('#modalExcluir').modal('show');
    
    var ehVinculo = $("#chkCadastroDeVinculo")[0].checked;

    $("#btnExcluirRegistro").off("click").on("click", function(){
        var options = {
            chave: ehVinculo ? $("#chaveIdentificadoresVinculos") : $("#chaveIdentificadores"),
            tabela: ehVinculo ? "tabelaIdentificadoresVinculos" : "tabelaIdentificadores",
            btnNovo: $("#btnNovoIdentificador")[0],
            regiao: $("#regiao-identificadores")
        }
            
        acaoExcluirRegistro(options);
        $('#modalExcluir').modal('hide');
        $("#regiao-identificadores .acoes-id #btnExcluir").hide();
    });
}

// Método responsável por excluir comunicações eletrônicas.
function excluirContato(){
    $('#modalExcluir').modal('show');
    
    $("#btnExcluirRegistro").off("click").on("click", function(){
        var options = {
            chave: $("#chaveContato"),
            tabela: "tabelaContatos",
            btnNovo: $("#btnNovoContato")[0],
            regiao: $("#regiao-contatos")
        }

        limparContato();
        acaoExcluirRegistro(options);
        $('#modalExcluir').modal('hide');
    });
}

// Método responsável por limpar campos de comunicações eletrônicas.
function limparContato() {
    $("#selectMeioDeComunicacao").val("");
    $("#selectPreferenciaDeUso").val("");
    $("#inputDetalhes").val("");
    $("#selectUtilizacaoDoContato").val("");
    $("#regiao-contatos .acoes #btnExcluir").hide();
}

// Método responsável por limpar campos de vínculos.
function limparVinculo() {
    $("#inputIdVinculo").val("");
    $("#dtInicio").val("");
    $("#dtFinal").val("");
    $("#selectRelacionamentos").val("");
    $("#regiao-vinculos .acoes #btnExcluir").hide();
}

// Método responsável por controlar a habilitação de campos.
function controlaHabilitacaoInputs(id, ehDisabled) {
    var inputsDoForm = Array.from(document.querySelectorAll("." + id + " input"));
    // Desabilita todos inputs
    for (var input in inputsDoForm) {
        inputsDoForm[input].disabled = ehDisabled;
    }
}

// Método responsável por exibição dos formulários opcionais para Identificadores.
function mostreFormularios(evt) {
    var valor = this.value;

    var elIdentificador = $(evt.target).closest(".identificador");

    var formsOpicionais = elIdentificador.find(".opcional");

    var elemento = {};

    // Esconder todas as regiões opcionais
    for (var el in Array.from(formsOpicionais)) {
        formsOpicionais[el].style.display = "none";
        var id = formsOpicionais[el].id;
        controlaHabilitacaoInputs(id, true);
    }

    mostrarRegiao(valor);
}

function mostrarRegiao(valor){
    // Mostrar a região selecionada no select
    switch (valor) {
        case "10":
            elemento = $(".opcional.form-ctps");
            elemento[0].style.display = "block";
            controlaHabilitacaoInputs("form-ctps", false);
            break;
        case "11":
            elemento = $(".opcional.form-tEleitor");
            elemento[0].style.display = "block";
            controlaHabilitacaoInputs("form-tEleitor", false);
            break;
        case "12":
            elemento = $(".opcional.form-certidao");
            controlaHabilitacaoInputs("form-certidao", false);
            elemento[0].style.display = "block";
            break;
        default:
            break;
    }
}

// Método responsável por limpar inconsistências de componentes obrigatórios.
function limpaInconsistencias(elementos) {
    elementos.forEach(element => {
        element.css("border-color", "#ced4da");
    });
}

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
