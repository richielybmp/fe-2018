/****** IDENTIFICADORES ******/
// Método responsável por mostrar a aba de cadstro de identificadores.
function iniciarCadastro() {
    document.querySelector('#minhaTab > .nav-item #identificadores-tab').click();
}

// Método responsável por mostrar a aba home.
function cancelarCadastro() {
    document.querySelector('#minhaTab > .nav-item #home-tab').click();
}

// Método responsável por exibir a tabela de resultado dos registros da pesquisa de indicadores.
function buscarRegistroIdentificador() {
    document.getElementById('tabela-registros-indicadores').style.display = "table";
}

// Chamada de método responsável por carregar a combo de Estados.
carregueJson('./json/estados.json', function (response) {
    // Na resposta do carregueEstados, é realizado um callback com a responseText.
    // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
    var estados = JSON.parse(response);

    // Select 'estados'
    var elEstados = document.getElementById('selectEstado');

    // Para cada item no objeto Estados, vamos criar uma <option> e adicionar no 'select'
    estados.Estados.forEach(estado => {
        var option = document.createElement("option");
        option.text = estado.nome;  // Goiás
        option.value = estado.sigla; // GO
        elEstados.appendChild(option);
    });
});

// Chamada de método responsável por carregar a combo de Tipo do identificador.
carregueJson('./json/tiposDeIdentificadores.json', function (response) {
    // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
    var tipo = JSON.parse(response);

    // Select 'identificadores'
    var elTipos = document.getElementById('selectTipoDoID');

    // Para cada item no objeto Identificador, vamos criar uma <option> e adicionar no 'select'
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

    // Select 'identificadores'
    var elArea = document.getElementById('selectArea');

    // Para cada item no objeto area, vamos criar uma <option> e adicionar no 'select'
    area.Area.forEach(area => {
        var option = document.createElement("option");
        option.text = area.descricao;
        option.value = area.valor;
        elArea.appendChild(option);
    });
});


// Chamada de método responsável por carregar a combo de Área Geográfica.
carregueJson('./json/relacionamentos.json', function (response) {
    // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
    var area = JSON.parse(response);

    // Select 'identificadores'
    var elArea = document.getElementById('selectRelacionamentos');

    // Para cada item no objeto area, vamos criar uma <option> e adicionar no 'select'
    area.Relacionamentos.forEach(area => {
        var option = document.createElement("option");
        option.text = area.nome;
        option.value = area.codigo;
        option.dataset.desc = area.nome;
        elArea.appendChild(option);
    });
});

$("select.tipoDoIdentificador")[0].addEventListener('change', mostreFormularios);

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
    }
});

function mostrarNovoCadastroDeIdentificador(el){
    $("#regiao-identificadores").fadeIn("fast");
    $(el).hide();
    $(".form-identificadores").find(".identificador input,select").prop('disabled', false);
}

function mostrarNovoCadastroDeVinculo(el){
    $("#regiao-vinculos").fadeIn("fast");
    $(el).hide();
    $(".form-vinculos").find(".vinculo input,select").prop('disabled', false);
}

function mostrarNovoCadastroDeContato(el){
    $("#regiao-contatos").fadeIn("fast");
    $(el).hide();
    $(".form-contatos").find(".contato input,select").prop('disabled', false);
}

function acaoBotaoCancelar(el){
    $("#btnNovoIdentificador").fadeIn("fast");
    $("#regiao-identificadores").hide();
    var elObrigatorios = $(el).closest(".form-identificadores").find(".identificador select,input:required");
    $(elObrigatorios).css("border-color", "#ced4da");
}

function acaoBotaoCancelarVinculo(el){
    $("#btnNovoVinculo").fadeIn("fast");
    $("#regiao-vinculos").hide();
    var elObrigatorios = $(el).closest(".form-vinculos").find(".vinculo select,input:required");
    $(elObrigatorios).css("border-color", "#ced4da");
}

function acaoBotaoCancelarContato(el){
    $("#btnNovoContato").fadeIn("fast");
    $("#regiao-contatos").hide();
    var elObrigatorios = $(el).closest(".form-contatos").find(".contato select,input:required");
    $(elObrigatorios).css("border-color", "#ced4da");
}

function acaoBotaoSalvar(el){
    var elObrigatorios = $(el).closest(".form-identificadores").find(".identificador select,input:required");
    var inconsistente = false;

    for (var i = 0; i < elObrigatorios.length; i++) {
        if ($(elObrigatorios[i]).val() == "" || $(elObrigatorios[i]).val() == null) {
            var elementosSuperiores = $(elObrigatorios[i]).parents();
            var index = 0;
            for (var j = 0; j < elementosSuperiores.length; j++) {
                if ($(elementosSuperiores[j]).hasClass('opcional')) {
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
        $(el).closest(".form-identificadores").find(".identificador input,select").prop('disabled', true);
        el.setAttribute('salvou', true);
        $(".caixa.opcional").hide()
        $("#btnNovoIdentificador")[0].style.display = "block";
        $("#regiao-identificadores").hide();

        adicionarNaTabela();
    }
}

var id = 1;
function adicionarNaTabela(){
    var bodytabelaIdentificadores = $("#tabelaIdentificadores tbody")[0];
    var bodytabelaIdentificadoresVinculos = $("#tabelaIdentificadoresVinculos tbody")[0];

    var tipo = $("#selectTipoDoID")[0].selectedOptions[0].text;
    var area = $("#selectArea")[0].selectedOptions[0].text;
    var designacao = $("#idDesignacao").val();
    var emissor = $("#idEmissor").val();
    var dataEmissao = $("#idDataEmissao").val();
    var ehVinculo = $("#chkCadastroDeVinculo")[0].checked;

    var elTr = criarComponenteHtmlDinamico({ tag: 'tr', id: area + dataEmissao });

    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: "ID-" + (ehVinculo ? "-V" : "-P" ) + id++ }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: tipo }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: area }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: designacao }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: emissor }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: dataEmissao }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', className: "opcional", innerHTML: $("#selectRelacionamentos option:selected").val() }));

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
}

// Método responsável por controlar a habilitação de campos.
function controlaHabilitacaoInputs(id, ehDisabled) {
    var inputsDoForm = Array.from(document.querySelectorAll("." + id + " input"));
    // Desabilita todos inputs
    for (var input in inputsDoForm) {
        inputsDoForm[input].disabled = ehDisabled;
    }
}

// Método responsável por exibição dos formulários opcionais.
function mostreFormularios(evt) {
    var valor = this.value;

    var elIdentificador = $(evt.target).closest(".identificador");

    var formsOpicionais = elIdentificador.find('.opcional');

    var elemento = {};

    // Esconder todas as regiões opcionais
    for (var el in Array.from(formsOpicionais)) {
        formsOpicionais[el].style.display = "none";
        var id = formsOpicionais[el].id;
        controlaHabilitacaoInputs(id, true);
    }

    // Mostrar a região selecionada no select
    switch (valor) {
        case '10':
            elemento = elIdentificador.find('.opcional.form-ctps');
            elemento[0].style.display = "block";
            controlaHabilitacaoInputs("form-ctps", false);
            break;
        case '11':
            elemento = elIdentificador.find('.opcional.form-tEleitor');
            elemento[0].style.display = "block";
            controlaHabilitacaoInputs("form-tEleitor", false);
            break;
        case '12':
            elemento = elIdentificador.find('.opcional.form-certidao');
            controlaHabilitacaoInputs("form-certidao", false);
            elemento[0].style.display = "block";
            break;
        default:
            break;
    }
}
/****** IDENTIFICADORES - FIM ******/

/****** CONTATO ******/
function adicionarContato() {
    var bodytabelaContatos = $("#tabelaContatos tbody")[0];
    var meioDeComunicacao = $("#selectMeioDeComunicacao_0 option:selected").data('desc');
    var preferencia = $("#selectPreferenciaDeUso_0 option:selected").data('desc');
    var detalhes = $("#inputDetalhes").val();
    var utilizacao = $("#selectUtilizacaoDoContato_0 option:selected").data('desc');
    var inconsistente = false;

    limpaInconsistencias([$("#selectMeioDeComunicacao_0"),$("#inputDetalhes"), $("#selectPreferenciaDeUso_0"), $("#selectUtilizacaoDoContato_0")]);

    if (meioDeComunicacao == "" || meioDeComunicacao == undefined){
        $("#selectMeioDeComunicacao_0").css("border-color", "red");
        inconsistente = true;
    }
    if (detalhes == "") {
        $("#inputDetalhes").css("border-color", "red");
        inconsistente = true;
    }
    if (preferencia == "" || preferencia == undefined){
        $("#selectPreferenciaDeUso_0").css("border-color", "red");
        inconsistente = true;
    }
    if (utilizacao == "" || utilizacao == undefined){
        $("#selectUtilizacaoDoContato_0").css("border-color", "red");
        inconsistente = true;
    }
    if(!inconsistente) {
        var elTr = criarComponenteHtmlDinamico({ tag: 'tr', id: meioDeComunicacao + detalhes });

        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: meioDeComunicacao }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: detalhes }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: preferencia }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: utilizacao }));

        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', className: "opcional", innerHTML: $("#selectMeioDeComunicacao_0 option:selected").val() }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', className: "opcional", innerHTML: $("#selectPreferenciaDeUso_0 option:selected").val() }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', className: "opcional", innerHTML: $("#selectUtilizacaoDoContato_0 option:selected").val() }));

        elTr.addEventListener("dblclick", editarContato);

        bodytabelaContatos.appendChild(elTr);
        $("#selectMeioDeComunicacao_0").val("");
        $("#selectPreferenciaDeUso_0").val("");
        $("#inputDetalhes").val("");
        $("#selectUtilizacaoDoContato_0").val("");
        $("#tabelaContatos").show();

        $("#btnNovoContato")[0].style.display = "block";
        $("#regiao-contatos").hide();
    }
}

function editarContato(evt) {
    var linha = $(evt.target).closest('tr')[0];
    $("#inputDetalhes").val($($(linha).find("td:eq(1)")[0]).text());

    $("#selectMeioDeComunicacao_0").val($($(linha).find("td:eq(4)")[0]).text());

    $("#selectPreferenciaDeUso_0").val($($(linha).find("td:eq(5)")[0]).text())

    $("#selectUtilizacaoDoContato_0").val($($(linha).find("td:eq(6)")[0]).text());

    $("#chaveContato").val(linha.id);

    $("#regiao-contatos .acoes #btnCancelar").show();
    $("#regiao-contatos .acoes #btnExcluir").show();
}

function limpaInconsistencias(elementos) {
    elementos.forEach(element => {
        element.css("border-color", "#ced4da");
    });
}

function limparContato() {
    $("#selectMeioDeComunicacao_0").val("");
    $("#selectPreferenciaDeUso_0").val("");
    $("#inputDetalhes").val("");
    $("#selectUtilizacaoDoContato_0").val("");
    //$("#regiao-contatos .acoes #btnCancelar").hide();
    $("#regiao-contatos .acoes #btnExcluir").hide();
}

function excluirContato(){
    var chave = $("#chaveContato").val();
    $("#" + chave).remove();

    var possuiVinculosNaTabela = $("#tabelaContatos tbody tr").length > 0;
    if(!possuiVinculosNaTabela) {
        $("#tabelaContatos").hide();
    }

    limparContato();
}
/****** CONTATO - FIM ******/

/****** VÍNCULOS ******/

function adicionarVinculo() {
    var bodytabelaVinculos = $("#tabelaVinculos tbody")[0];
    var identificador = $("#inputIdVinculo").val();
    var tipoRelacionamento = $("#selectRelacionamentos option:selected").data('desc');
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
        var elTr = criarComponenteHtmlDinamico({ tag: 'tr', id: identificador + dataInicio + dataFim });

        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: identificador }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: tipoRelacionamento }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', className: "opcional", innerHTML: $("#selectRelacionamentos option:selected").val() }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: dataInicio }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: dataFim }));

        elTr.addEventListener("dblclick", editarVinculo);

        bodytabelaVinculos.appendChild(elTr);
        limparVinculo();
        $("#tabelaVinculos").show();
        
        $("#btnNovoVinculo")[0].style.display = "block";
        $("#regiao-vinculos").hide();
    }
}

function limparVinculo() {
    $("#inputIdVinculo").val("");
    $("#dtInicio").val("");
    $("#dtFinal").val("");
    $("#selectRelacionamentos_0").val("");
    $("#regiao-vinculos .acoes #btnExcluir").hide();
    //$("#regiao-vinculos .acoes #btnCancelar").hide();
}

function editarVinculo(evt) {
    var linha = $(evt.target).closest('tr')[0];
    $("#inputIdVinculo").val($($(linha).find("td:eq(0)")[0]).text());
    $("#dtInicio").val($($(linha).find("td:eq(3)")[0]).text());
    $("#dtFinal").val($($(linha).find("td:eq(4)")[0]).text());
    $("#selectRelacionamentos_0").val($(linha).find("td.opcional")[0].textContent);

    $("#chaveVinculo").val(linha.id);

    $("#regiao-vinculos .acoes #btnExcluir").show();
    $("#regiao-vinculos .acoes #btnCancelar").show();
}

function excluirVinculo(){
    var chave = $("#chaveVinculo").val();
    $("#" + chave).remove();

    var possuiVinculosNaTabela = $("#tabelaVinculos tbody tr").length > 0;
    if(!possuiVinculosNaTabela) {
        $("#tabelaVinculos").hide();
    }

    limparVinculo();
}
/****** VÍNCULOS - FIM ******/