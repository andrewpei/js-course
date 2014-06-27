// (function(){
  var jokesArray = [];

  $(document).ready(
    $.ajax({
      type: "GET",
      success: function(jokeArrayJson) {
        for(var i = 0; i<jokeArrayJson.length;i++) {
          jokesArray.push(jokeArrayJson[i]);
          $(document).trigger('new-joke', jokeArrayJson[i]);
        }},
      url: '/api/jokes'
    })
  );

  $("#submit").click(function(e) {
    e.preventDefault();

    var jokeQuestion = $(".joke-form-question").val();
    var jokeAnswer = $(".joke-form-answer").val();
    var newJoke = jokeMakerJSON(jokeQuestion, jokeAnswer);

    $(".joke-form-question").val("");
    $(".joke-form-answer").val("");

    $.post('api/joke', {joke: newJoke}, function(data) {
      newJoke = data;
      $(document).trigger('new-joke', newJoke);
    });

  });

  function jokeMakerJSON (jokeQuestion, jokeAnswer) {
    return {question: jokeQuestion, answer: jokeAnswer};
  }

  $(document).on('new-joke', function (e, jokeObject) {

      jokesArray.push(jokeObject);

     $("#jokes").append(
        "<div class='joke' data-joke-id=" + jokeObject.id + ">" +
        "<p class='joke-question'> Question: "+ jokeObject.question + "</p>" + 
        "<p class='joke-answer'> Answer: " + jokeObject.answer + "</p>" + 
        "<button class='delete-" + jokeObject.id + "'>Delete</button>"
      );

     $('.delete-' + jokeObject.id).click(function(e) {
        $(this).parent().remove();

        $.ajax({
          type: "DELETE",
          url: 'api/joke/' + $(this).parent().data('joke-id')
        });
        
     });
  });

// })();