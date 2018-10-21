/****** IDENTIFICADORES ******/
// Método responsável por mostrar a aba de cadstro de identificadores.
function iniciarCadastro(){
    document.querySelector('#minhaTab > .nav-item #identificadores-tab').click();
}

// Método responsável por mostrar a aba home.
function cancelarCadastro(){
    document.querySelector('#minhaTab > .nav-item #home-tab').click();
}

// Método responsável por exibir a tabela de resultado dos registros da pesquisa de indicadores.
function buscarRegistroIdentificador(){
    document.getElementById('tabela-registros-indicadores').style.display = "table";
}

var quantidadeDeSelectsTipoDoIdentificador = 0;
var quantidadeDeSelectsAreaGeografica = 0;
var quantidadeDeSelectsEstado = 0;
var quantidadeDeSelectsTipoCertidao = 0;

//Método responsável por gerar html para cadastro de novos identificadores.
function mostrarNovoCadastroDeIdentificador(){
    alert('Criar novo cadastro de identificadores')
}

// Chamada de método responsável por carregar a combo de Estados.
carregueJson('./json/estados.json', function(response) {
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

// Listener responsável por tratar quando uma opção do Tipo de Identificador for selecionada.
const tipoIdentificador = document.getElementById('selectTipoIdentificador');
tipoIdentificador.addEventListener('change', mostreFormularios);

// Método responsável por controlar a habilitação de campos.
function controlaHabilitacaoInputs(id, ehDisabled){
    var inputsDoForm = Array.from(document.querySelectorAll("#" + id + " input"));
    // Desabilita todos inputs
    for (input in inputsDoForm){
        inputsDoForm[input].disabled = ehDisabled;
    }
}

// Método responsável por exibição dos formulários opcionais.
function mostreFormularios(){
    var valor = this.value;
    
    var formsOpicionais = document.querySelectorAll('#identificadores .opcional');
    
    // Esconder todas as regiões opcionais
    for (el in Array.from(formsOpicionais)){
        formsOpicionais[el].style.display = "none";
        var id = formsOpicionais[el].id;
        controlaHabilitacaoInputs(id, true);
    }
    
    // Mostrar a região selecionada no select
    switch(valor){
        case '10':
            var elemento = document.getElementById("form-ctps");
            elemento.style.display = "block";
            controlaHabilitacaoInputs("form-ctps", false);
            break;
        case '11':
            var elemento = document.getElementById("form-tEleitor");
            elemento.style.display = "block";
            controlaHabilitacaoInputs("form-tEleitor", false);
            break;
        case '12':
            var elemento = document.getElementById("form-certidao");
            controlaHabilitacaoInputs("form-certidao", false);
            elemento.style.display = "block";
            break;
        default:
            break;
    }
}
/****** IDENTIFICADORES - FIM ******/
    
/****** CONTATO *******/
var quantidadeDeSelectsMeiosDeComunicacao = 0;
var quantidadeDeSelectsPreferenciaDeUso = 0;
var quantidadeDeSelectsModoUtilizacao = 0;
//Método responsável por gerar html para cadastro de novos contatos.
function mostrarNovoCadastroDeContato(){
    // criar várias entradas para vínculos
    var regiaoContatos = document.getElementById("regiao-contatos");
    
    var divContato = criarComponenteHtmlDinamico({ tag: 'div', className:'contato' });
    
    // divRow
    var divRow = criarComponenteHtmlDinamico({ tag: 'div', className:'row' });

    // Meio de comunicação
    var divMeioDeComunicacao = criarComponenteHtmlDinamico({ tag: 'div', className:'col-md-3' });
    var labelMeioDeComunicacao = criarComponenteHtmlDinamico({ tag: 'label', innerHTML:'Meio de comunicação', htmlFor:'lbMeioDeComunicacao' }); 
    var seletorDeMeioDeComunicacao = criarComponenteHtmlDinamico({ tag: 'select', id:'selectMeioDeComunicacao_' + quantidadeDeSelectsMeiosDeComunicacao, className:'form-control meioDeComunicacao' });

    divMeioDeComunicacao.appendChild(labelMeioDeComunicacao);
    divMeioDeComunicacao.appendChild(seletorDeMeioDeComunicacao);
    
    carregueJson('./json/meiosDeComunicacao.json', function(response) {
        // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
        var meiosDeComunicacao = JSON.parse(response);
        
        // Select 'meio'
        var elMeiosDeComunicacao = document.getElementById(seletorDeMeioDeComunicacao.id);
        
        // Para cada item no objeto Estados, vamos criar uma <option> e adicionar no 'select'
        meiosDeComunicacao.Meios.forEach(meio => {
            var option = document.createElement("option");
            option.text = meio.descricao;  
            option.value = meio.codigo; 
            elMeiosDeComunicacao.appendChild(option);
        });
        quantidadeDeSelectsMeiosDeComunicacao++;
    });

    // Preferência de uso
    var divPreferenciaDeUso = criarComponenteHtmlDinamico({ tag: 'div', className:'col-md-3' });
    var labelPreferenciaDeUso = criarComponenteHtmlDinamico({ tag: 'label', innerHTML:'Preferência', htmlFor:'lbPreferenciaDeUso' }); 
    var seletorDePreferenciaDeUso = criarComponenteHtmlDinamico({ tag: 'select', id:'selectPreferenciaDeUso_' + quantidadeDeSelectsPreferenciaDeUso, className:'form-control preferenciaDeUso' });

    divPreferenciaDeUso.appendChild(labelPreferenciaDeUso);
    divPreferenciaDeUso.appendChild(seletorDePreferenciaDeUso);
    
    carregueJson('./json/preferenciaDeUso.json', function(response) {
        // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
        var preferencia = JSON.parse(response);
        
        // Select 'preferencia'
        var elPreferenciaDeUso = document.getElementById(seletorDePreferenciaDeUso.id);
        
        // Para cada item no objeto Preferencia, vamos criar uma <option> e adicionar no 'select'
        preferencia.Preferencia.forEach(meio => {
            var option = document.createElement("option");
            option.text = meio.descricao;  
            option.value = meio.codigo; 
            elPreferenciaDeUso.appendChild(option);
        });
        quantidadeDeSelectsPreferenciaDeUso++;
    });

    // Detalhes do meio de comunicação
    var divDetalhesDoMeio = criarComponenteHtmlDinamico({ tag: 'div', className:'col-md-3' });
    var labelDetalhesDoMeio = criarComponenteHtmlDinamico({ tag: 'label', id:'', className:'', name:'', innerHTML:'Detalhes ', htmlFor:'lbDetalhesDoMeio', type:'' });
    var inputDetalhesDoMeio = criarComponenteHtmlDinamico({ tag: 'input', className:'form-control', innerHTML:'Detalhes do meio de comunicação', htmlFor:'lbDetalhesDoMeio', type:'text' });
    inputDetalhesDoMeio.setAttribute('required', "");
    
    divDetalhesDoMeio.appendChild(labelDetalhesDoMeio);
    divDetalhesDoMeio.appendChild(inputDetalhesDoMeio);

    // Utilização do contato
    var divUtilizacaoDoContato = criarComponenteHtmlDinamico({ tag: 'div', className:'col-md-3' });
    var labelUtilizacaoDoContato = criarComponenteHtmlDinamico({ tag: 'label', innerHTML:'Utilização', htmlFor:'lbUtilizacaoDoContato' }); 
    var seletorDeUtilizacaoDoContato = criarComponenteHtmlDinamico({ tag: 'select', id:'selectUtilizacaoDoContato_' + quantidadeDeSelectsModoUtilizacao, className:'form-control utilizacaoDoContato' });

    divUtilizacaoDoContato.appendChild(labelUtilizacaoDoContato);
    divUtilizacaoDoContato.appendChild(seletorDeUtilizacaoDoContato);
    
    carregueJson('./json/modoUtilizacaoContato.json', function(response) {
        // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
        var modo = JSON.parse(response);
        
        // Select 'modo'
        var elModo = document.getElementById(seletorDeUtilizacaoDoContato.id);
        
        // Para cada item no objeto Modo, vamos criar uma <option> e adicionar no 'select'
        modo.Modo.forEach(meio => {
            var option = document.createElement("option");
            option.text = meio.descricao;  
            option.value = meio.codigo; 
            elModo.appendChild(option);
        });
        quantidadeDeSelectsModoUtilizacao++;
    });

    // ------------------------------------------------
    divRow.appendChild(divMeioDeComunicacao);
    divRow.appendChild(divDetalhesDoMeio);
    divRow.appendChild(divPreferenciaDeUso);
    divRow.appendChild(divUtilizacaoDoContato);
    // ------------------------------------------------
    
    // divAcoes
    var divAcoes = criarComponenteHtmlDinamico({ tag: 'div', className:'acoes' });
    
    var btnSalvar =  criarComponenteHtmlDinamico({ tag: 'input', id:'btnSalvar', className:'btn btn-success', value:'Salvar', type:'button'});
    btnSalvar.onclick = (evt) =>{
        var elObrigatorio = $(evt.target).closest(".contato").find(".row input:required");
        
        if (elObrigatorio.val() != ""){
            $(evt.target).closest(".contato").find(".row input,select").prop('disabled', true);
            $(evt.target).hide();
            $(evt.target).closest(".acoes").find("#btnCancelar").hide();
            $(evt.target).closest(".acoes").find("#btnEditar").show();
            $(evt.target).closest(".acoes").find("#btnExcluir").show();
            elObrigatorio.css("border-color", "#ced4da"); 
            evt.target.setAttribute('salvou', true);
        }
        else {
            elObrigatorio.css("border-color", "red");
        }
    };
    
    var btnCancelar = criarComponenteHtmlDinamico({ tag: 'input', id:'btnCancelar', className:'btn btn-warning', value:'Cancelar', type:'button'});
    btnCancelar.onclick = (evt) =>{
        if(!$(evt.target).closest(".acoes").find("#btnSalvar")[0].getAttribute('salvou') == true)
            $(evt.target).closest(".contato").remove();
        else
            $(evt.target).closest(".contato").find(".row input,select").prop('disabled', true);
            $(evt.target).hide();
            $(evt.target).closest(".acoes").find("#btnSalvar").hide();
            $(evt.target).closest(".acoes").find("#btnCancelar").hide();
            $(evt.target).closest(".acoes").find("#btnEditar").show();
            $(evt.target).closest(".acoes").find("#btnExcluir").show();
    };
    
    var btnEditar = criarComponenteHtmlDinamico({ tag: 'input', id:'btnEditar', className:'btn btn-primary', value:'Editar', type:'button'});
    btnEditar.style.display = "none";
    btnEditar.onclick = (evt) =>{
        $(evt.target).hide();
        $(evt.target).closest(".contato").find(".row input,select").prop('disabled', false);
        $(evt.target).closest(".acoes").find("#btnSalvar").show();
        $(evt.target).closest(".acoes").find("#btnCancelar").show();
        $(evt.target).closest(".acoes").find("#btnEditar").hide();
        $(evt.target).closest(".acoes").find("#btnExcluir").hide();
    };

    var btnExcluir = criarComponenteHtmlDinamico({ tag: 'input', id:'btnExcluir', className:'btn btn-danger', value:'Excluir', type:'reset'});
    btnExcluir.style.display = "none";
    btnExcluir.onclick = (evt) =>{
        $(evt.target).closest(".contato").remove();
    };

    divAcoes.appendChild(btnSalvar);
    divAcoes.appendChild(btnCancelar);
    divAcoes.appendChild(btnEditar);
    divAcoes.appendChild(btnExcluir);

    divContato.appendChild(divRow);
    divContato.appendChild(divAcoes);

    regiaoContatos.appendChild(divContato);
}

/****** CONTATO - FIM ******/

/****** VÍNCULOS ******/
var quantidadeDeSelectsRelacionamento = 0;
    
//Método responsável por gerar html para cadastro de novos vinculos.
function mostrarNovoCadastroDeVinculos(){
    //document.querySelector(".regiao-vinculos > div").style.display="block";
    
    // criar várias entradas para vínculos
    var regiaoVinculos = document.getElementById("regiao-vinculos");
    
    var divVinculo = criarComponenteHtmlDinamico({ tag: 'div', className:'vinculo' });
    
    // divRow
    var divRow = criarComponenteHtmlDinamico({ tag: 'div', className:'row' });

    //Identificador
    var divIdentificador = criarComponenteHtmlDinamico({ tag: 'div', className:'col-md-3' });
    var labelIdentificador = criarComponenteHtmlDinamico({ tag: 'label', id:'', className:'', name:'', innerHTML:'Identificador', htmlFor:'lbIdentificador', type:'' });
    var inputIdentificador = criarComponenteHtmlDinamico({ tag: 'input', className:'form-control', innerHTML:'Identificador', htmlFor:'lbIdentificador', type:'text' });
    inputIdentificador.setAttribute('required', "");

    divIdentificador.appendChild(labelIdentificador);
    divIdentificador.appendChild(inputIdentificador);
    
    // Relacionamento
    var divRelacionamento = criarComponenteHtmlDinamico({ tag: 'div', className:'col-md-3' });
    var labelRelacionamento = criarComponenteHtmlDinamico({ tag: 'label', innerHTML:'Relacionamento', htmlFor:'lbRelacionamento' }); 
    var seletorDeRelacionamento = criarComponenteHtmlDinamico({ tag: 'select', id:'selectRelacionamentos_' + quantidadeDeSelectsRelacionamento, className:'form-control relacionamentos' });

    divRelacionamento.appendChild(labelRelacionamento);
    divRelacionamento.appendChild(seletorDeRelacionamento);
    
    carregueJson('./json/relacionamentos.json', function(response) {
        // Na resposta do carregueEstados, é realizado um callback com a responseText.
        // Fazemos o parse desse conteúdo para obtermos o JSON transformado em objeto.
        var relacionamentos = JSON.parse(response);
        
        // Select 'estados'
        var elRelacionamentos = document.getElementById(seletorDeRelacionamento.id);
        
        // Para cada item no objeto Estados, vamos criar uma <option> e adicionar no 'select'
        relacionamentos.Relacionamentos.forEach(estado => {
            //console.log(estado);
            var option = document.createElement("option");
            option.text = estado.nome;  // Goiás
            option.value = estado.codigo; // GO
            elRelacionamentos.appendChild(option);
        });
        quantidadeDeSelectsRelacionamento++;
    });

    // Data Inicio
    var divDataInicio = criarComponenteHtmlDinamico({ tag: 'div', className:'col-md-3' });
    
    var labelDataInicio = criarComponenteHtmlDinamico({ tag: 'label', htmlFor:'lbDataInicio', innerHTML:'Data inicial' });
    
    var inputDataInicio = criarComponenteHtmlDinamico({ tag: 'input', id:'dtInicio', className:'form-control', name:'dtInicio', type:'date' });

    divDataInicio.appendChild(labelDataInicio);
    divDataInicio.appendChild(inputDataInicio);

    // Data final
    var divDataFim = criarComponenteHtmlDinamico({ tag: 'div', className:'col-md-3' });
    
    var labelDataFim =  criarComponenteHtmlDinamico({ tag: 'label', htmlFor:'lbDataFim', innerHTML:'Data final' });
    
    var inputDataFim = criarComponenteHtmlDinamico({ tag: 'input', id:'dtFinal', className:'form-control', name:'dtFinal', type:'date' });

    divDataFim.appendChild(labelDataFim);
    divDataFim.appendChild(inputDataFim);
    // ------------------------------------------------
    divRow.appendChild(divIdentificador);
    divRow.appendChild(divRelacionamento);
    divRow.appendChild(divDataInicio);
    divRow.appendChild(divDataFim);
    // ------------------------------------------------
    
    // divAcoes
    var divAcoes = criarComponenteHtmlDinamico({ tag: 'div', className:'acoes' });
    
    var btnSalvar =  criarComponenteHtmlDinamico({ tag: 'input', id:'btnSalvar', className:'btn btn-success', value:'Salvar', type:'button'});
    btnSalvar.onclick = (evt) =>{
        var elObrigatorio = $(evt.target).closest(".vinculo").find(".row input:required");
        
        if (elObrigatorio.val() != ""){
            $(evt.target).closest(".vinculo").find(".row input,select").prop('disabled', true);
            $(evt.target).hide();
            $(evt.target).closest(".acoes").find("#btnCancelar").hide();
            $(evt.target).closest(".acoes").find("#btnEditar").show();
            $(evt.target).closest(".acoes").find("#btnExcluir").show();
            elObrigatorio.css("border-color", "#ced4da"); 
            evt.target.setAttribute('salvou', true);
        }
        else {
            elObrigatorio.css("border-color", "red");
        }
    };
    
    var btnCancelar = criarComponenteHtmlDinamico({ tag: 'input', id:'btnCancelar', className:'btn btn-warning', value:'Cancelar', type:'button'});
    btnCancelar.onclick = (evt) =>{
        if(!$(evt.target).closest(".acoes").find("#btnSalvar")[0].getAttribute('salvou') == true)
            $(evt.target).closest(".vinculo").remove();
        else
            $(evt.target).closest(".vinculo").find(".row input,select").prop('disabled', true);
            $(evt.target).hide();
            $(evt.target).closest(".acoes").find("#btnSalvar").hide();
            $(evt.target).closest(".acoes").find("#btnCancelar").hide();
            $(evt.target).closest(".acoes").find("#btnEditar").show();
            $(evt.target).closest(".acoes").find("#btnExcluir").show();
    };
    
    var btnEditar = criarComponenteHtmlDinamico({ tag: 'input', id:'btnEditar', className:'btn btn-primary', value:'Editar', type:'button'});
    btnEditar.style.display = "none";
    btnEditar.onclick = (evt) =>{
        $(evt.target).hide();
        $(evt.target).closest(".vinculo").find(".row input,select").prop('disabled', false);
        $(evt.target).closest(".acoes").find("#btnSalvar").show();
        $(evt.target).closest(".acoes").find("#btnCancelar").show();
        $(evt.target).closest(".acoes").find("#btnEditar").hide();
        $(evt.target).closest(".acoes").find("#btnExcluir").hide();
    };

    var btnExcluir = criarComponenteHtmlDinamico({ tag: 'input', id:'btnExcluir', className:'btn btn-danger', value:'Excluir', type:'reset'});
    btnExcluir.style.display = "none";
    btnExcluir.onclick = (evt) =>{
        $(evt.target).closest(".vinculo").remove();
    };

    divAcoes.appendChild(btnSalvar);
    divAcoes.appendChild(btnCancelar);
    divAcoes.appendChild(btnEditar);
    divAcoes.appendChild(btnExcluir);

    divVinculo.appendChild(divRow);
    divVinculo.appendChild(divAcoes);

    regiaoVinculos.appendChild(divVinculo);

    console.log(regiaoVinculos);
}
/****** VÍNCULOS - FIM ******/