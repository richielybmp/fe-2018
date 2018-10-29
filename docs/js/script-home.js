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

/****** IDENTIFICADORES ******/

var quantidadeDeSelectsTipoDoIdentificador = 0;
var quantidadeDeSelectsAreaGeografica = 0;
var quantidadeDeSelectsEstado = 0;
var quantidadeDeSelectsTipoCertidao = 0;
var quantidadeFormCtps = 0;
var quantidadeInfoCertidao = 0;
var quantidadeInfoTEleitor = 0;

//Método responsável por gerar html para cadastro de novos identificadores.
function mostrarNovoCadastroDeIdentificador() {
    // criar várias entradas para identificadores
    var formIdentificadores = criarComponenteHtmlDinamico({ tag: 'div', className: 'form-identificadores' });

    var regiaoIdentificadores = document.getElementById("regiao-identificadores");

    var divIdentificador = criarComponenteHtmlDinamico({ tag: 'div', className: 'identificador' });

    //divRow
    var divRow = criarComponenteHtmlDinamico({ tag: 'div', className: 'row' });

    // Tipo do Identificador
    var divTipoDoIdentificador = criarComponenteHtmlDinamico({ tag: 'div', className: 'form-group col-md-6' });
    var labelTipoDoIdentificador = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Tipo do identificador', htmlFor: 'lbTipoDoIdentificador' });
    var seletorTipoDoIdentificador = criarComponenteHtmlDinamico({ tag: 'select', id: 'selectTipoDoID_' + quantidadeDeSelectsTipoDoIdentificador, className: 'form-control tipoDoIdentificador' });

    divTipoDoIdentificador.appendChild(labelTipoDoIdentificador);
    divTipoDoIdentificador.appendChild(seletorTipoDoIdentificador);

    // Área Geográfica
    var divAreaGeo = criarComponenteHtmlDinamico({ tag: 'div', className: 'form-group col-md-6' });
    var labelAreaGeo = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Área Geográfica', htmlFor: 'lbAreaGeo' });
    var seletorAreaGeo = criarComponenteHtmlDinamico({ tag: 'select', id: 'selectArea_' + quantidadeDeSelectsAreaGeografica, className: 'form-control areaGeo' });

    divAreaGeo.appendChild(labelAreaGeo);
    divAreaGeo.appendChild(seletorAreaGeo);

    // ------------------------------------------------
    divRow.appendChild(divTipoDoIdentificador);
    divRow.appendChild(divAreaGeo);
    // ------------------------------------------------

    // Designação
    var divDesignacao = criarComponenteHtmlDinamico({ tag: 'div', className: 'form-group' });
    var labelDesignacao = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Designação', htmlFor: 'lbDesignacao' });
    var inputDesignacao = criarComponenteHtmlDinamico({ tag: 'input', id:"idDesignacao", className: 'form-control', innerHTML: 'Designação', htmlFor: 'lbDesignacao', type: 'text' });
    inputDesignacao.setAttribute('required', "");

    divDesignacao.appendChild(labelDesignacao);
    divDesignacao.appendChild(inputDesignacao);

    var divRowEmissao = criarComponenteHtmlDinamico({ tag: 'div', className: 'row' });

    // Emissor
    var divEmissor = criarComponenteHtmlDinamico({ tag: 'div', className: 'col-md-6' });
    var labelEmissor = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Emissor', htmlFor: 'lbEmissor' });
    var inputEmissor = criarComponenteHtmlDinamico({ tag: 'input', id:"idEmissor", className: 'form-control', innerHTML: 'Emissor', htmlFor: 'lbEmissor', type: 'text' });
    inputEmissor.setAttribute('required', "");

    divEmissor.appendChild(labelEmissor);
    divEmissor.appendChild(inputEmissor);

    // Data de emissão
    var divDataEmissao = criarComponenteHtmlDinamico({ tag: 'div', className: 'col-md-6' });
    var labelDataEmissao = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Data de emissao', htmlFor: 'lbDataEmissao' });
    var inputDataEmissao = criarComponenteHtmlDinamico({ tag: 'input', id:"idDataEmissao", className: 'form-control', innerHTML: 'Data de emissão', htmlFor: 'lbDataEmissao', type: 'date' });
    inputDataEmissao.setAttribute('required', "");

    divDataEmissao.appendChild(labelDataEmissao);
    divDataEmissao.appendChild(inputDataEmissao);

    // ------------------------------------------------
    divRowEmissao.appendChild(divEmissor);
    divRowEmissao.appendChild(divDataEmissao);
    // ------------------------------------------------

    // Chamada de método responsável por carregar a combo de Tipo do identificador.
    carregueJson('./json/tiposDeIdentificadores.json', function (response) {
        // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
        var tipo = JSON.parse(response);

        // Select 'identificadores'
        var elTipos = document.getElementById('selectTipoDoID_' + quantidadeDeSelectsTipoDoIdentificador);

        // Para cada item no objeto Identificador, vamos criar uma <option> e adicionar no 'select'
        tipo.Identificador.forEach(id => {
            var option = document.createElement("option");
            option.text = id.descricao;
            option.value = id.valor;
            elTipos.appendChild(option);
        });
        quantidadeDeSelectsTipoDoIdentificador++;
    });

    // Chamada de método responsável por carregar a combo de Área Geográfica.
    carregueJson('./json/area.json', function (response) {
        // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
        var area = JSON.parse(response);

        // Select 'identificadores'
        var elArea = document.getElementById('selectArea_' + quantidadeDeSelectsAreaGeografica);

        // Para cada item no objeto area, vamos criar uma <option> e adicionar no 'select'
        area.Area.forEach(area => {
            var option = document.createElement("option");
            option.text = area.descricao;
            option.value = area.valor;
            elArea.appendChild(option);
        });
        quantidadeDeSelectsAreaGeografica++;
    });

    // <!-- CAMPOS OPCIONAIS -->
    // <!-- Carteira de trabalho e Previdência Social -->
    var divFormCtps = criarComponenteHtmlDinamico({ tag: 'div', id: 'form-ctps_' + quantidadeFormCtps, className: 'caixa opcional form-ctps' });
    quantidadeFormCtps++;
    var spanCtps = criarComponenteHtmlDinamico({ tag: 'span', innerHTML: 'Carteira de trabalho' });
    var hrCtps = criarComponenteHtmlDinamico({ tag: 'hr' });

    var divRowCtps = criarComponenteHtmlDinamico({ tag: 'div', className: 'row' });

    // Série
    var divSerie = criarComponenteHtmlDinamico({ tag: 'div', className: 'col-md-3' });
    var labelSerie = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Série', htmlFor: 'lbSerie' });
    var inputSerie = criarComponenteHtmlDinamico({ tag: 'input', className: 'form-control', innerHTML: 'Série', htmlFor: 'lbSerie', type: 'text' });
    inputSerie.setAttribute('required', "");

    divSerie.appendChild(labelSerie);
    divSerie.appendChild(inputSerie);

    // Estado
    var divEstado = criarComponenteHtmlDinamico({ tag: 'div', className: 'col-md-4' });
    var labelEstado = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Estado', htmlFor: 'lbEstado' });
    var selectEstado = criarComponenteHtmlDinamico({ tag: 'select', id: 'selectEstado' + quantidadeDeSelectsEstado, className: 'form-control estado' });

    divEstado.appendChild(labelEstado);
    divEstado.appendChild(selectEstado);

    divRowCtps.appendChild(divSerie);
    divRowCtps.appendChild(divEstado);

    divFormCtps.appendChild(spanCtps);
    divFormCtps.appendChild(hrCtps);
    divFormCtps.appendChild(divRowCtps);

    // Chamada de método responsável por carregar a combo de Estados.
    carregueJson('./json/estados.json', function (response) {
        // Na resposta do carregueEstados, é realizado um callback com a responseText.
        // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
        var estados = JSON.parse(response);

        // Select 'estados'
        var elEstados = document.getElementById('selectEstado' + quantidadeDeSelectsEstado);

        // Para cada item no objeto Estados, vamos criar uma <option> e adicionar no 'select'
        estados.Estados.forEach(estado => {
            //console.log(estado);
            var option = document.createElement("option");
            option.text = estado.nome;  // Goiás
            option.value = estado.sigla; // GO
            elEstados.appendChild(option);
        });
        quantidadeDeSelectsEstado++;
    });

    var divFormCertidao = criarComponenteHtmlDinamico({ tag: 'div', id: 'form-certidao_' + quantidadeInfoCertidao, className: 'caixa opcional form-certidao' });
    quantidadeInfoCertidao++;
    var spanCertidao = criarComponenteHtmlDinamico({ tag: 'span', innerHTML: 'Certidão' });

    // Tipo da Certidao
    var divTipoCertidao = criarComponenteHtmlDinamico({ tag: 'div', className: 'form-group' });
    var labelTipoCertidao = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Tipo da certidão', htmlFor: 'lbTipoCertidao' });
    var selectTipoCertidao = criarComponenteHtmlDinamico({ tag: 'select', id: 'selectTipoCertidao' + quantidadeDeSelectsTipoCertidao, className: 'form-control tipoCertidao col-md-12' });
    var opNascimento = criarComponenteHtmlDinamico({ tag: 'option', value: 'nascimento', innerHTML: 'Nascimento' });
    var opCasamento = criarComponenteHtmlDinamico({ tag: 'option', value: 'casamento', innerHTML: 'Casamento' });
    var opDivorcio = criarComponenteHtmlDinamico({ tag: 'option', value: 'divorcio', innerHTML: 'Divórcio' });

    selectTipoCertidao.appendChild(opNascimento);
    selectTipoCertidao.appendChild(opCasamento);
    selectTipoCertidao.appendChild(opDivorcio);

    divTipoCertidao.appendChild(labelTipoCertidao);
    divTipoCertidao.appendChild(selectTipoCertidao);

    // Nome do cartório
    var divNomeCartorio = criarComponenteHtmlDinamico({ tag: 'div', className: 'form-group' });
    var labelNomeCartorio = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Nome do cartório', htmlFor: 'lbNomeCartorio' });
    var inputNomeCartorio = criarComponenteHtmlDinamico({ tag: 'input', className: 'form-control', type: 'text' });
    inputNomeCartorio.setAttribute('required', "");

    divNomeCartorio.appendChild(labelNomeCartorio);
    divNomeCartorio.appendChild(inputNomeCartorio);

    var divRowInfoCertidao = criarComponenteHtmlDinamico({ tag: 'div', className: 'row' });

    // Livro
    var divLivro = criarComponenteHtmlDinamico({ tag: 'div', className: 'col-md-4' });
    var labelLivro = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Livro', htmlFor: 'lbLivro' });
    var inputLivro = criarComponenteHtmlDinamico({ tag: 'input', className: 'form-control', type: 'number' });
    inputLivro.setAttribute('required', "");

    divLivro.appendChild(labelLivro);
    divLivro.appendChild(inputLivro);

    // Folha
    var divFolha = criarComponenteHtmlDinamico({ tag: 'div', className: 'col-md-4' });
    var labelFolha = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Folha', htmlFor: 'lbFolha' });
    var inputFolha = criarComponenteHtmlDinamico({ tag: 'input', className: 'form-control', type: 'number' });
    inputFolha.setAttribute('required', "");

    divFolha.appendChild(labelFolha);
    divFolha.appendChild(inputFolha);

    // Termo
    var divTermo = criarComponenteHtmlDinamico({ tag: 'div', className: 'col-md-4' });
    var labelTermo = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Termo', htmlFor: 'lbTermo' });
    var inputTermo = criarComponenteHtmlDinamico({ tag: 'input', className: 'form-control', type: 'number' });
    inputTermo.setAttribute('required', "");

    var hrCertidao = criarComponenteHtmlDinamico({ tag: 'hr' });

    divTermo.appendChild(labelTermo);
    divTermo.appendChild(inputTermo);

    divRowInfoCertidao.appendChild(divLivro);
    divRowInfoCertidao.appendChild(divFolha);
    divRowInfoCertidao.appendChild(divTermo);

    divFormCertidao.appendChild(spanCertidao);
    divFormCertidao.appendChild(hrCertidao);
    divFormCertidao.appendChild(divTipoCertidao);
    divFormCertidao.appendChild(divNomeCartorio);
    divFormCertidao.appendChild(divRowInfoCertidao);

    // Títuloi de eleitor
    var divFormTituloEleitor = criarComponenteHtmlDinamico({ tag: 'div', id: 'form-tEleitor_' + quantidadeInfoTEleitor, className: 'caixa opcional form-tEleitor' });
    quantidadeInfoTEleitor++;
    var spanTituloEleitor = criarComponenteHtmlDinamico({ tag: 'span', innerHTML: 'Título eleitoral' });

    var divRowTEleitor = criarComponenteHtmlDinamico({ tag: 'div', className: 'row' });

    // Seção
    var divSecaoEleitoral = criarComponenteHtmlDinamico({ tag: 'div', className: 'col-md-6' });
    var labelSecaoEleitoral = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Seção eleitoral', htmlFor: 'lbSecao' });
    var inputSecaoEleitoral = criarComponenteHtmlDinamico({ tag: 'input', className: 'form-control', type: 'number' });
    inputSecaoEleitoral.setAttribute('required', "");

    divSecaoEleitoral.appendChild(labelSecaoEleitoral);
    divSecaoEleitoral.appendChild(inputSecaoEleitoral);

    // Zona eleitoral
    var divZonaEleitoral = criarComponenteHtmlDinamico({ tag: 'div', className: 'col-md-6' });
    var labelZonaEleitoral = criarComponenteHtmlDinamico({ tag: 'label', innerHTML: 'Zona eleitoral', htmlFor: 'lbZona' });
    var inputZonaEleitoral = criarComponenteHtmlDinamico({ tag: 'input', className: 'form-control', type: 'number' });
    inputZonaEleitoral.setAttribute('required', "");

    var hrTitulo = criarComponenteHtmlDinamico({ tag: 'hr' });

    divZonaEleitoral.appendChild(labelZonaEleitoral);
    divZonaEleitoral.appendChild(inputZonaEleitoral);

    divRowTEleitor.appendChild(divSecaoEleitoral);
    divRowTEleitor.appendChild(divZonaEleitoral);

    divFormTituloEleitor.appendChild(spanTituloEleitor);
    divFormTituloEleitor.appendChild(hrTitulo);
    divFormTituloEleitor.appendChild(divRowTEleitor);

    divIdentificador.appendChild(divRow);
    divIdentificador.appendChild(divDesignacao);
    divIdentificador.appendChild(divRowEmissao);
    divIdentificador.appendChild(divFormCtps);
    divIdentificador.appendChild(divFormCertidao);
    divIdentificador.appendChild(divFormTituloEleitor);

    // divAcoes
    var divAcoes = criarComponenteHtmlDinamico({ tag: 'div', className: 'acoes-id' });

    var btnSalvar = criarComponenteHtmlDinamico({ tag: 'input', id: 'btnSalvar', className: 'btn btn-success', value: 'Adicionar', type: 'button' });
    btnSalvar.onclick = (evt) => {
        acaoBotaoSalvar(evt);
    };

    var btnCancelar = criarComponenteHtmlDinamico({ tag: 'input', id: 'btnCancelar', className: 'btn btn-warning', value: 'Cancelar', type: 'button' });
    btnCancelar.onclick = (evt) => {
        var _btnSalvar = $(evt.target).closest(".acoes-id").find("#btnSalvar")[0];
        if (!_btnSalvar.getAttribute('salvou') == true)
            $(evt.target).closest(".form-identificadores").remove();
        else
            $(evt.target).closest(".form-identificadores").find(".identificador input,select").prop('disabled', true);
        $(evt.target).hide();
        $(evt.target).closest(".acoes-id").find("#btnSalvar").hide();
        $(evt.target).closest(".acoes-id").find("#btnCancelar").hide();
        $(evt.target).closest(".acoes-id").find("#btnEditar").show();
        $(evt.target).closest(".acoes-id").find("#btnExcluir").show();

        $("#btnNovoIdentificador")[0].style.display = "block";
    };

    var btnEditar = criarComponenteHtmlDinamico({ tag: 'input', id: 'btnEditar', className: 'btn btn-primary', value: 'Editar', type: 'button' });
    btnEditar.style.display = "none";
    btnEditar.onclick = (evt) => {
        $(evt.target).hide();
        $(evt.target).closest(".form-identificadores").find(".identificador input,select").prop('disabled', false);
        $(evt.target).closest(".acoes-id").find("#btnSalvar").show();
        $(evt.target).closest(".acoes-id").find("#btnCancelar").show();
        $(evt.target).closest(".acoes-id").find("#btnEditar").hide();
        $(evt.target).closest(".acoes-id").find("#btnExcluir").hide();
    };

    var btnExcluir = criarComponenteHtmlDinamico({ tag: 'input', id: 'btnExcluir', className: 'btn btn-danger', value: 'Excluir', type: 'reset' });
    btnExcluir.style.display = "none";
    btnExcluir.onclick = (evt) => {
        $(evt.target).closest(".form-identificadores").remove();
    };

    divAcoes.appendChild(btnSalvar);
    divAcoes.appendChild(btnCancelar);
    divAcoes.appendChild(btnEditar);
    divAcoes.appendChild(btnExcluir);

    formIdentificadores.appendChild(divIdentificador);
    formIdentificadores.appendChild(divAcoes);

    regiaoIdentificadores.appendChild(formIdentificadores);

    var tipoIdentificador = document.getElementById('selectTipoDoID_' + quantidadeDeSelectsTipoDoIdentificador);
    tipoIdentificador.addEventListener('change', mostreFormularios);

    $("#btnNovoIdentificador")[0].style.display = "none";
}



























function acaoBotaoSalvar(evt){
    var elObrigatorios = $(evt.target).closest(".form-identificadores").find(".identificador input:required");
    var inconsistente = false;

    for (var i = 0; i < elObrigatorios.length; i++) {
        if ($(elObrigatorios[i]).val() == "") {
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
        $(evt.target).closest(".form-identificadores").find(".identificador input,select").prop('disabled', true);
        $(evt.target).hide();
        $(evt.target).closest(".acoes-id").find("#btnCancelar").hide();
        $(evt.target).closest(".acoes-id").find("#btnEditar").show();
        $(evt.target).closest(".acoes-id").find("#btnExcluir").show();
        evt.target.setAttribute('salvou', true);
        $("#btnNovoIdentificador")[0].style.display = "block";

        adicionarNaTabela();
    }
}

function adicionarNaTabela(){
    var bodytabelaIdentificadores = $("#tabelaIdentificadores tbody")[0];
    var tipo = $("#selectTipoDoID_0")[0].selectedOptions[0].text;
    var area = $("#selectArea_0")[0].selectedOptions[0].text;   
    var designacao = $("#idDesignacao").val();
    var emissor = $("#idEmissor").val();
    var dataEmissao = $("#idDataEmissao").val();


    var elTr = criarComponenteHtmlDinamico({ tag: 'tr', id: area + dataEmissao });

    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: tipo }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: area }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: designacao }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: emissor }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: dataEmissao }));
    elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', className: "opcional", innerHTML: $("#selectRelacionamentos_0 option:selected").val() }));

    //elTr.addEventListener("dblclick", editarIdentificadores);

    bodytabelaIdentificadores.appendChild(elTr);
    //limparIdentificadores();
    $("#tabelaIdentificadores").show();
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
    $("#regiao-contatos .acoes #btnCancelar").hide();
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
    var tipoRelacionamento = $("#selectRelacionamentos_0 option:selected").data('desc');
    var dataInicio = $("#dtInicio").val();
    var dataFim = $("#dtFinal").val();
    var inconsistente = false;

    limpaInconsistencias([$("#inputIdVinculo"), $("#selectRelacionamentos_0"), $("#dtInicio"), $("#dtFinal")]);

    if (identificador == "") {
        $("#inputIdVinculo").css("border-color", "red");
        inconsistente = true;
    }
    if (tipoRelacionamento == undefined) {
        $("#selectRelacionamentos_0").css("border-color", "red");
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
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', className: "opcional", innerHTML: $("#selectRelacionamentos_0 option:selected").val() }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: dataInicio }));
        elTr.appendChild(criarComponenteHtmlDinamico({ tag: 'td', innerHTML: dataFim }));

        elTr.addEventListener("dblclick", editarVinculo);

        bodytabelaVinculos.appendChild(elTr);
        limparVinculo();
        $("#tabelaVinculos").show();
    }
}

function limparVinculo() {
    $("#inputIdVinculo").val("");
    $("#dtInicio").val("");
    $("#dtFinal").val("");
    $("#selectRelacionamentos_0").val("");
    $("#regiao-vinculos .acoes #btnExcluir").hide();
    $("#regiao-vinculos .acoes #btnCancelar").hide();
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