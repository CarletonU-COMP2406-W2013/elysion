//module pattern to prevent global space polution
var FormExample = (function(FormExample, $, undefined){
    
    var COUNTRIES = ["America", "Canada", "Mexico", "Russia", "France"];
    
    //functions passed directly into $ will run when the document is ready to be manipulated
    $(function(){
        $("#birthday").datepicker();
        
        $("#country").autocomplete({
            source: COUNTRIES
        });
       
        var sendEmail = $("#send-email");
        sendEmail.on("change", function(event){
            if(sendEmail.is(":checked")){
                $("#email-info").show();
            }else{
                $("#email-info").hide(); 
            }
        }).change();
      
        $('form').validate({
			onKeyup : true,
			eachValidField : function() {

				$(this).closest('div').removeClass('error').addClass('success');
			},
			eachInvalidField : function() {

				$(this).closest('div').removeClass('success').addClass('error');
			}
		});
    });
    


    return FormExample;
})(FormExample || {}, $);
