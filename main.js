function cepIsValid(cep){
    result =false;
    if($("#cep").val()  != "" && !isNaN($("#cep").val()) && $("#cep").val().length == 8) {
        result = true;
    }
    return result;
}

function enderecoIsValid(cidade, estado, rua){
    result =false;
    if(cidade != "" && estado != "" && rua != ""){
        result = true;
    }
    return result;
}

function erro(mensagem){
    isTrue = false;
        if($("#cidade").val() == ""){
            $("#cidade").addClass("erro");
            isTrue = true;
        }else{
            
        }

        if($("#rua").val() == ""){
            $("#rua").addClass("erro");
            isTrue = true;
        }else{
            $("#rua").removeClass("erro");
        }
        if(!cepIsValid($("#cep").val())){
            $("#cep").addClass("erro");
            isTrue = true;
        }else{
            $("#cep").removeClass("erro");
        }

        if($("#estados").val() == ""){
            $("#estados").addClass("erro");
            isTrue = true;
        }else{
            $("#estados").removeClass("erro");
        }

    if(isTrue){
        $("#mensagem").empty();
        $("#mensagem").append(mensagem);
        $(".aviso").removeClass("disabled");
    }else{
        $(".aviso").addClass("disabled");  
    }
}        
    

$(document).ready(function(){
    var erros = "";
    $("#descobrir").click(function(){  
          if(cepIsValid($("#cep").val())){
            
            $.get("https://viacep.com.br/ws/"+ $("#cep").val()+"/json/", function(data, status){
               
                if(data.erro != true){
                    $(".aviso").addClass("disabled");
                    $("#mensagem").empty(); 
                    $("#cep").removeClass("erro");
                    erro(null)
                    
                    $("#cidade").val("");
                    $("#cidade").val(data.localidade);
                    $("#rua").val("");
                    $("#rua").val(data.logradouro);
                    $("#estados").val("");
                    $("#estados").val(data.uf);

                    $("#estados").removeClass("erro");
                    $("#rua").removeClass("erro");
                    $("#cidade").removeClass("erro");
                    $(".aviso").addClass("disabled");
                }else{
                    console.log(data);
                    $("#mensagem").empty();
                    $("#mensagem").append("Insira um CEP valido");
                    $("#cep").addClass("erro");
                    $(".aviso").removeClass("disabled");
                }
                                
            });
          }else{
            if(enderecoIsValid($("#cidade").val(),$("#estados").val(), $("#rua").val())){
                
                    $.get("https://viacep.com.br/ws/" + $("#estados").val() +"/" + $("#cidade").val() +"/"+ $("#rua").val() +"/json/",      function(data, status){
                        console.log(data);
                        if(data == ""){
                            $("#mensagem").empty();
                            $("#mensagem").append("Insira um endereço valido");
                            $("#estados").addClass("erro");
                            $("#rua").addClass("erro");
                            $("#cidade").addClass("erro");
                            $(".aviso").removeClass("disabled");
                        }else{
                            $("#estados").removeClass("erro");
                            $("#rua").removeClass("erro");
                            $("#cidade").removeClass("erro");
                            $(".aviso").addClass("disabled");
                            $("#cep").val(data[0].cep.toString().replace("-",""));
                        }
                    });
                    
                    
                   
            }else{
                erro("Insira um CEP valido<br>Insira um endereço valido");
            }
          }
    });

});


/*
 $("#cep").addClass("erro");
        

        
        if(false){
            $("#cep").removeClass("erro");
            $(".aviso").addClass("disabled");

            
        }
*/