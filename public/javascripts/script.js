var PLACE = "portal";
var CLIENT_CMD = {
  SUBMIT : 13,
  FOCUS : 27
};
var CMD = {
  "portal" :{
    "login": function(){
      $("#block").load("login", refocus);
    },
    "register": function(){
      $("#block").load("register", refocus);
    },
    "help":function(){
      alert("help");
    },
    "exit": function(){
      alert("exit");
    }
  }
};

var FORM = {
  "login": function(){
    $.ajax({
      type: "POST",
      url: "login",
      data: $("form#login").serialize(),
      success: function(data, textStatus, xhr) {
        if(data.substring(0, 20).indexOf("DOCTYPE") == -1){
          $("#block").html(data);
          refocus();
        }else{
          window.location = "/";
        }
      }
    });

    return false;
  },
  "register": function(){
    $.ajax({
      type: "POST",
      url: "register",
      data: $("form#register").serialize(),
      success: function(data) {
        $("#block").html(data);
      }
    });

    refocus();
    return false;
  }
};

function refocus(){ $("input").first().focus(); }

function execCmd(){
  var command = $("#command-line").val().toLowerCase();
  if(typeof(CMD[PLACE.toLowerCase()][command]) === 'undefined'){
    $("#cmd-response p").text("Invalid Command");
    $("#cmd-response").show();
  }else{
    CMD[PLACE.toLowerCase()][command]();
    $("#cmd-response p").text("");
    $("#cmd-response").hide();
  }
  $("#command-line").val("");
}

$(document).ready(function() {
  refocus();
  $("#cmd-response").hide();

  $(document).keyup(function(e){
    if(e.keyCode == CLIENT_CMD.FOCUS){
      $("#command-line").focus();
    }else if(e.keyCode == CLIENT_CMD.SUBMIT){
      if(e.target.id != "command-line"){
        FORM[$(e.target).parents().find("form").attr("id").toLowerCase()]();
      }else { execCmd(); }
    }
  });
});

