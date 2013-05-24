$(document).ready(function() {
  var CLIENT_KEYS = {
    "submit" : 13,
    "focus-command" : 27
  }
  refocus();
  $(document).keyup(function(e){
    if(e.keyCode == CLIENT_KEYS["focus-command"]){
      console.log("esc");
      $("#command-line").focus();
    }else{
      console.log(e.keyCode);
    }
  });
  $("#command-line").keypress(function(e){
    if(e.which == CLIENT_KEYS["submit"]){
      if(this.value == "login"){
        console.log("login");
        $("#block").load("login", refocus);
      }else if(this.value == "register"){
        $("#block").load("register");
      }else{
        console.log(this.value);

      }
      this.value = "";
    }

  });
});

function refocus(){
  $("input").first().focus();
}
