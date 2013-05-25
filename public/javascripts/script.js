var PLACE = "portal";
var CLIENT_KEY = {
  SUBMIT : 13,
  FOCUS : 27
};
var CMD = {
  "portal" :{
    "login": function(){
      if($("#username").val() == ""){
        $("#block").load("login", refocus);
      }else{
        setCmdMsg("You are already logged in");
      }
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
        $("#block").html(data);
        refocus();
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
    setCmdMsg("Invalid Command");
  }else{
    CMD[PLACE.toLowerCase()][command]();
  }
  $("#command-line").val("");
}

function setCmdMsg(msg){
  $("#cmd-response p").text(msg);
  $("#cmd-response").show(0, function(){
    setTimeout(function(){
      $("#cmd-response").hide(0);
    }, 3000);
  });;
}

$(document).ready(function() {
  refocus();
  $("#cmd-response").hide();

  $(document).keyup(function(e){
    if(e.keyCode == CLIENT_KEY.FOCUS){
      $("#command-line").focus();
    }else if(e.keyCode == CLIENT_KEY.SUBMIT){
      if(e.target.id != "command-line"){
        FORM[$(e.target).parents().find("form").attr("id").toLowerCase()]();
      }else { execCmd(); }
    }
  });
});

