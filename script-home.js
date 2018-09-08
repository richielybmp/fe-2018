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

// Chamada de método responsável por carregar a combo de Estados.
carregueJson('estados.json', function(response) {
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
    // javascript puro
    for (el in Array.from(formsOpicionais)){
        formsOpicionais[el].style.display = "none";
        var id = formsOpicionais[el].id;
        controlaHabilitacaoInputs(id, true);
    }
    // jQuery
    //formsOpicionais.hide();
    
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
    
/****** VÍNCULOS ******/
var quantidadeDeSelectsRelacionamento = 0;
    
//Método responsável por gerar html para cadastro de novos vinculos.
function mostrarNovoCadastroDeVinculos(){
    //document.querySelector(".regiao-vinculos > div").style.display="block";
    
    // criar várias entradas para vínculos
    var regiaoVinculos = document.getElementById("regiao-vinculos");
    
    var divVinculo = document.createElement('div');
    divVinculo.className = "vinculo";
    
    // divRow
    var divRow = document.createElement('div');
    divRow.className = "row";
    
    //Identificador
    var divIdentificador = document.createElement('div');
    divIdentificador.className = "col-md-3";
    var labelIdentificador = document.createElement('label');
    labelIdentificador.htmlFor = "lbIdentificador";
    labelIdentificador.innerHTML="Identificador";
    var inputIdentificador = document.createElement('input');
    inputIdentificador.className = "form-control";
    inputIdentificador.type = "text";
    
    divIdentificador.appendChild(labelIdentificador);
    divIdentificador.appendChild(inputIdentificador);
    
    // Relacionamento
    var divRelacionamento = document.createElement('div');
    divRelacionamento.className = "col-md-3";
    var labelRelacionamento = document.createElement('label');
    labelRelacionamento.htmlFor = "lbRelacionamento";
    labelRelacionamento.innerHTML="Relacionamento";
    var seletorDeRelacionamento = document.createElement('select');
    
    seletorDeRelacionamento.id = "selectRelacionamentos_" + quantidadeDeSelectsRelacionamento;
    seletorDeRelacionamento.className = "form-control relacionamentos";

    divRelacionamento.appendChild(labelRelacionamento);
    divRelacionamento.appendChild(seletorDeRelacionamento);
    
    carregueJson('relacionamentos.json', function(response) {
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
    var divDataInicio = document.createElement('div');
    divDataInicio.className = "col-md-3";
    
    var labelDataInicio = document.createElement('label');
    labelDataInicio.htmlFor = "lbDataInicio";
    labelDataInicio.innerHTML="Data inicial";
    
    var inputDataInicio = document.createElement('input');
    inputDataInicio.id = "dtInicio";
    inputDataInicio.name = "dtInicio";
    inputDataInicio.className = "form-control";
    inputDataInicio.type = "date";

    divDataInicio.appendChild(labelDataInicio);
    divDataInicio.appendChild(inputDataInicio);

    // Data final
    var divDataFim = document.createElement('div');
    divDataFim.className = "col-md-3";
    
    var labelDataFim = document.createElement('label');
    labelDataFim.htmlFor = "lbDataFim";
    labelDataFim.innerHTML="Data final";
    
    var inputDataFim = document.createElement('input');
    inputDataFim.id = "dtFinal";
    inputDataFim.name = "dtFinal";
    inputDataFim.className = "form-control";
    inputDataFim.type = "date";

    divDataFim.appendChild(labelDataFim);
    divDataFim.appendChild(inputDataFim);
    // ------------------------------------------------
    divRow.appendChild(divIdentificador);
    divRow.appendChild(divRelacionamento);
    divRow.appendChild(divDataInicio);
    divRow.appendChild(divDataFim);
    // ------------------------------------------------
    
    // divAcoes
    var divAcoes = document.createElement('div');
    divAcoes.className = "acoes";
    
    var btnSalvar = document.createElement('input');
    btnSalvar.className="btn btn-success";
    btnSalvar.value = "Salvar";
    btnSalvar.type = "";
    btnSalvar.onclick = (evt) =>{
        $(evt.target).closest(".vinculo").find(".row input,select").prop('disabled', true);
        $(evt.target).hide();
        $(evt.target).closest(".acoes").find("#btnCancelar").hide();
        $(evt.target).closest(".acoes").find("#btnEditar").show();
        $(evt.target).closest(".acoes").find("#btnExcluir").show();
    };
    
    var btnCancelar = document.createElement('input');
    btnCancelar.id = "btnCancelar";
    btnCancelar.className="btn btn-warning";
    btnCancelar.value = "Cancelar";
    btnCancelar.type = "submit";
    btnCancelar.onclick = (evt) =>{
        $(evt.target).closest(".vinculo").remove();
    };
    
    var btnEditar = document.createElement('input');
    btnEditar.id = "btnEditar";
    btnEditar.className="btn btn-primary";
    btnEditar.value = "Editar";
    btnEditar.type = "submit";
    btnEditar.style.display = "none";
    
    var btnExcluir = document.createElement('input');
    btnExcluir.id = "btnExcluir";
    btnExcluir.className="btn btn-danger";
    btnExcluir.value = "Excluir";
    btnExcluir.type = "reset";
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

    //         <!-- Tipo de relacionamento -->
    //         <div class="col-md-3">
    //             <label for="lbRelacionamento">Relacionamento</label>
    //             <select class="form-control">
    //                 <option value="7" selected="">Avó materna</option>
    //                 <option value="8">Avô materno</option>
    //                 <option value="22">Cônjuge/companheiro(a)</option>
    //                 <option value="23">Irmão</option>
    //                 <option value="24">Irmã</option>
    //                 <option value="25">Meio-irmão</option>
    //                 <option value="26">Meio-irmã</option>
    //                 <option value="27">Irmãos</option>
    //                 <option value="28">Criança</option>
    //                 <option value="29">Filha</option>
    //                 <option value="36">Avó paterna</option>
    //                 <option value="37">Avô paterno</option>
    //                 <option value="38">Tio materno</option>
    //                 <option value="40">Tio paterno</option>
    //                 <option value="41">Tia paterna</option>
    //                 <option value="189">Recém-nascido</option>
    //                 <option value="254">Pais</option>
    //                 <option value="262">Mãe adotiva</option>
    //                 <option value="263">Pai adotivo</option>
    //                 <option value="264">Responsável</option>
    //                 <option value="265">Coabitante</option>
    //                 <option value="939">Tia materna</option>
    //             </select>
    //         </div>

}
/****** VÍNCULOS - FIM ******/

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
 /****** UTILITÁRIOS - FIM ******/