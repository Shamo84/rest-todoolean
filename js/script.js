$(document).ready(function() {
  getList();

  $("input").keyup(function(event) {
    if (event.which == 13) {
      var text = $(this).val()
      $(this).val("");
      if ($(".text.green").hasClass("green")) {
        var id = $(".text.green").parents(".entry").attr("id");
        patchElement(text, id);
        $(".text.green").removeClass("green");
      } else {
        addToList(text);
      }
    }
  });
  $(document).on("click", function(event) {
    if ($(event.target).hasClass("delete")) {
      deleteElement($(event.target).parents(".entry").attr("id"));
    } else if ($(event.target).hasClass("text")) {
      $(".text.green").removeClass("green");
      $(event.target).addClass("green");
    }
  });
});

function getList() {
  $(".container").html("");
  $.ajax({
    url: "http://157.230.17.132:3024/todos",
    method: "GET",
    success: function(risposta) {
      printList(risposta)
    },
    error: function() {
      console.log(errore);
    }
  });
}

function printList(object) {
  var source = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);
  for (var key in object) {
    var context = {
      id: object[key].id,
      text: object[key].text
    };
    var html = template(context);
    $(".container").append(html);
  }
}

function addToList(text) {
  $.ajax({
    url: "http://157.230.17.132:3024/todos",
    method: "POST",
    data: {
      text: text
    },
    success: function(risposta) {
      getList();
    },
    error: function() {
      console.log("errore");
    }
  });
}

function deleteElement(id) {
  $.ajax({
    url: "http://157.230.17.132:3024/todos/" + id,
    method: "DELETE",
    success: function(risposta) {
      getList();
    },
    error: function() {
      console.log("errore");
    }
  });
}
function patchElement(text, id) {
  $.ajax({
    url: "http://157.230.17.132:3024/todos/" + id,
    method: "PATCH",
    data: {
      text: text
    },
    success: function(risposta) {
      getList();
    },
    error: function() {
      console.log("errore");
    }
  });
}
