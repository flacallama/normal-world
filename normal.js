function readyFn(jQuery) {
  console.log("ready, set, and normalize")
  var upperLimit
  var lowerLimit
  var zPercent
  var submittedSAT
  var submittedIQ
  var submittedHeight
  var z
  var x
  var isMale
  var primaryVariable
  var primaryVariableValue
  var primaryVariableA
  var secondaryVariable
  var secondaryVariableValue
  var getHeight = $(`<button type='button' class='btn getHeight' id="getHeight">get Equivalent Height in cm</button>`);
  var getHeightSecondary = $(`<button type='button' class='btn getHeightSecondary' id="getHeightSecondary">get Equivalent Height in cm</button>`);
  var getIQ = $(`<button type='button' class='btn getIQ' id="getIQ">get Equivalent IQ</button>`)
  var getSAT = $(`<button type='button' class='btn getSAT' id="getSAT">get Equivalent SAT</button>`)
  var getIncome = $(`<button type='button' class='btn getIncome' id="getIncome">get Equivalent Income</button>`)

  var maleOrFemaleElements = $(`
  <div class="prelimButtonArea">
    <button type="button" class="btn maleButton">Male</button>
    <button type="button" class="btn femaleButton">Female</button>
  </div>
  `);

  var maleOrFemaleElementsSecondary = $(`
  <div class="prelimButtonArea">
    <button type="button" class="btn maleButtonSecondary">Male</button>
    <button type="button" class="btn femaleButtonSecondary">Female</button>
  </div>
  `);

  var buttonsThreeOriginal = $(`
    <button type="button" class="btn chooseHeightButton">Start with Height</button>
    <button type="button" class="btn chooseIQButton">Start with IQ score</button>
    <button type="button" class="btn chooseSATButton">Start with SAT score</button>`)

  function resetVariables() {
    upperLimit = 0;
    lowerLimit = 0;
    zPercent = 0;
    submittedSAT = '';
    submittedIQ = '';
    submittedHeight = '';
    z = 0;
    x = 0;
    isMale
    primaryVariable = '';
    primaryVariableValue = '';
    primaryVariableA = '';
    secondaryVariable = '';
    secondaryVariableValue = '';
  }

  function GetZPercent(z)
    { //z == number of standard deviations from the mean

    //if z is greater than 6.5 standard deviations from the mean
    //the number of significant digits will be outside of a reasonable
    //range
    if ( z < -160.5)
      return 0.0;
    if( z > 160.5)
      return 1.0;

    var factK = 1;
    var sum = 0;
    var term = 1;
    var k = 0;
    var loopStop = Math.exp(-23);
    while(Math.abs(term) > loopStop)
      {
        term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
        sum += term;
        k++;
        factK *= k;

      }
    sum += 0.5;

    zPercent = sum;
    }



  // SELECT HEIGHT MENU PRIMARY
  $('.leftInstructions').on('click', '.chooseHeightButton', function() {
    $('.topInstructions').empty();
    $('.leftInstructions').empty();
    primaryVariable = "Height";
    console.log("primaryVariable set to height")
    $('.leftInstructions').append(maleOrFemaleElements);

  })
  // enter secondary menu
  $('.leftInstructions').on('click', ".maleButton", function() {
    isMale = true;
    console.log('first stack of height stuff for ===')
    primaryVariableA = "male"
    $('.leftInstructions').empty(heightElements);
    $('.leftInstructions').append(heightElements);
    // $('.leftInstructions').empty(maleOrFemaleElements);
  })
  $('.leftInstructions').on('click', ".femaleButton", function() {
    isMale = false;
    primaryVariableA = "female"
    $('.leftInstructions').empty(heightElements);
    $('.leftInstructions').append(heightElements);
  })
  // tertiary output
  var heightElements = $(`
    <input id="searchHeight" type="text" name="search" placeholder="Enter your height in cm">
    <button type="button" class="btn submitButtonHeight">Submit</button>
    <button type="button" class="btn resetButton">Reset</button>
  `)








  // tertiary input
  // SUBMIT BUTTON CLICK HANDLER FOR HEIGHT PRIMARY SELECTOR
  $(".leftInstructions").on("click", ".submitButtonHeight", function() {
    submittedHeight = $("#searchHeight").val();
    primaryVariableValue = submittedHeight + " cm";
    $('.leftInstructions').empty();

    function getHeight(x) {
      if (isMale === true) {
        var mu = 176
        var theta = 7.47
        z = (x - mu) / theta;
      } else {
        var mu = 161.8
        var theta = 6.858
        z = (x - mu) / theta;
      }

      console.log(z)




    }
    getHeight(submittedHeight);

    $('.leftInstructions').append($(`<button type="button" class="btn resetButton">Reset</button>`))

    $('.bottomInstructions').append(getIQ);
    $('.bottomInstructions').append(getIncome);
    $('.bottomInstructions').append(getSAT);
    GetZPercent(z);
    console.log("this is zPercent from Height: ", zPercent)
  })




  // SELECT IQ MENU PRIMARY
  $('.leftInstructions').on('click', '.chooseIQButton', function() {
    $('.topInstructions').empty();
    $('.leftInstructions').empty();
    primaryVariable = "IQ"
    var IQElements = $(`<input id="searchIQ" type="text" name="search" placeholder="Enter your IQ score">
  <button type="button" class="btn submitButtonIQ">Submit</button>
  <button type="button" class="btn resetButton">Reset</button>`)
    $('.leftInstructions').append(IQElements);

    $('.leftInstructions').on("click", ".submitButtonIQ", function() {
      submittedIQ = $('#searchIQ').val();
      primaryVariableValue = submittedIQ;
      console.log("entered submitbuttoniq click handler")


      function getIQ(x) {
        var mu = 100
        var theta = 15
        z = (x - mu) / theta;
      }
      getIQ(submittedIQ);
      console.log("entered bottom part of submitbuttoniq click handler")
      $('.bottomInstructions').append(getHeightSecondary);
      $('.bottomInstructions').append(getSAT);
      $('.bottomInstructions').append(getIncome);
      GetZPercent(z);
      console.log("this is zPercent from IQprimary: ", zPercent)
    })

  })

  // SELECT SAT MENU PRIMARY
  $('.leftInstructions').on('click', '.chooseSATButton', function() {
    $('.leftInstructions').empty();
    primaryVariable = "SAT"
    var SATElements = $(`<input id="searchSAT" type="text" name="search" placeholder="Enter your SAT score">
  <button type="button" class="btn submitButtonSAT">Submit</button>
  <button type="button" class="btn resetButton">Reset</button>`)
    $('.leftInstructions').append(SATElements);

    $('.leftInstructions').on("click", ".submitButtonSAT", function() {
      submittedSAT = $('#searchSAT').val();
      primaryVariableValue = submittedSAT;

      function getSAT(x) {
        var mu = 100
        var theta = 15
        z = (x - mu) / theta;
      }
      getSAT(submittedIQ);

      $('.bottomInstructions').append(getHeightSecondary);
      $('.bottomInstructions').append(getIQ);
      $('.bottomInstructions').append(getIncome);
    })
    GetZPercent(z);
    console.log("this is zPercent from SATprimary: ", zPercent)
  })









  // RESET BUTTON CLICK HANDLER
  $('.leftInstructions').on("click", ".resetButton", function() {
    $('#search').val("Enter your height in cm");
    $('.leftInstructions').empty();
    resetVariables();
    $(".topInstructions").empty();
    $('.topInstructions').append($(`
        <h2>Find out how your exceptionalism in one measure would directly compare to another unrelated measure! Everybody is unusual or usual in one way or another and it's interesting to see how our percentile in one measure would translate to another completely unrelated measure. We're not suggesting there is any correlation between height, IQ, and SAT scores, and income, but it's interesting to say "If I were as smart as I am tall, my IQ would be...". Start the fun by choosing which measure you want to use as your base:</h2>
      `));
    $(".leftInstructions").append(buttonsThreeOriginal);
    $('.bottomInstructions').empty();
    $('.results').empty();
  })



  // GET INCOME DISTRIBUTION BUTTON CLICK HANDLER SECONDARY
  $(".bottomInstructions").on('click', '.getIncome', function() {
    console.log('clicked getincome button')
    secondaryVariable = "Income level"

    $.get("https://api.commerce.gov/midaas/quantiles?&api_key=MLyHdh1QdocNCsxLhzxYFm7TsSU1FAdxE3kh2deM", function(data){
      console.log(data);

      console.log("this is zPercent from income: ", zPercent)

      var lesserIncomePercentArray = [];
      for (var key in data.overall){
        if ((zPercent*100) >= parseInt(key)){
          lesserIncomePercentArray.push(parseInt(key));
        }
      }
      console.log(lesserIncomePercentArray)
      var lesserIncomePercent = 0;
      for (var i=0; i<lesserIncomePercentArray.length; i++){
        if (lesserIncomePercentArray[i]>=lesserIncomePercent){
          lesserIncomePercent = lesserIncomePercentArray[i];
        }
      }
      console.log(lesserIncomePercent)
      lesserIncomePercentKey = lesserIncomePercent + "%"
      lowerLimit = data.overall[lesserIncomePercentKey];
      if (lesserIncomePercentArray.length === 0){
        lowerLimit = 0;
      }
      console.log('here;s lower limit: ' + lowerLimit)


      var greaterIncomePercentArray=[];
      for (var key in data.overall){
        if ((zPercent*100) < parseInt(key)){
          greaterIncomePercentArray.push(parseInt(key));
        }
      }
      console.log(greaterIncomePercentArray)
      var greaterIncomePercent = 100;
      for (var i=0; i<greaterIncomePercentArray.length; i++){
        if (greaterIncomePercentArray[i]<=greaterIncomePercent){
          greaterIncomePercent = greaterIncomePercentArray[i];
        }
      }
      greaterIncomePercentKey = greaterIncomePercent + "%"
      upperLimit = data.overall[greaterIncomePercentKey];
      if (greaterIncomePercentArray.length === 0){
        upperLimit = "above"
      }
      console.log('heres upper limit: ' + upperLimit)


    $('.results').empty();
    $('.results').append(resultIncome());
    })
  })










  // GET IQ BUTTON CLICK HANDLER SECONDARY
  $(".bottomInstructions").on('click', '.getIQ', function() {
    console.log('clicked getiq button')
    secondaryVariable = "IQ"

    function getIQ(z) {
      var mu = 100
      var theta = 15
      x = Math.round((z * theta) + mu);
      console.log(x)
      secondaryVariableValue = x;
    }
    getIQ(z);

    $('.results').empty();
    $('.results').append(result());

  })


  // GET SAT CLICK BUTTON HANDLER SECONDARY
  $(".bottomInstructions").on('click', '.getSAT', function() {
    console.log('clicked getSAT button')
    secondaryVariable = "SAT"

    function getSAT(z) {
      var mu = 1083;
      var theta = 194;
      x = Math.round((z * theta) + mu);
      console.log(x)
      secondaryVariableValue = x;
    }
    getSAT(z);

    $('.results').empty();
    $('.results').append(result());
  })



  // GET HEIGHT CLICK BUTTON HANDLER SECONDARY PT1
  $(".bottomInstructions").on('click', '.getHeightSecondary', function() {
    $('.leftInstructions').empty();
    secondaryVariable = "height";
    $('.leftInstructions').append(maleOrFemaleElementsSecondary);
    console.log("on pt1: " + primaryVariable)
    getHeightPt2();
  })

  // GET HEIGHT CLICK BUTTON HANDLER SECONDARY PT2
  function getHeightPt2() {
    $('.leftInstructions').on('click', ".maleButtonSecondary", function() {
      isMale = true;
      primaryVariableA = "male";
      console.log('second stack !===')
      console.log("heres primaryVariable: " + primaryVariable)
      getHeightPt3();
    })
    $('.leftInstructions').on('click', ".femaleButtonSecondary", function() {
      isMale = false;
      primaryVariableA = 'female';
      console.log("primaryvariableA set to female")
      getHeightPt3();
    })
  }


  function getHeightPt3() {
    function getHeight(z) {
      if (isMale === true) {
        var mu = 176
        var theta = 7.47
        x = Math.round((z * theta) + mu);
      } else {
        var mu = 161.8
        var theta = 6.858
        x = Math.round((z * theta) + mu);
      }
      secondaryVariableValue = x + " cm";
    }
    getHeight(z)

    $('.results').empty();
    console.log('passing results empty')
    $('.leftInstructions').empty();
    $('.leftInstructions').append(maleOrFemaleElementsSecondary);
    $('.leftInstructions').append($(`<button type="button" class="btn resetButton">Reset</button>`))
    $('.results').append(resultHeight());
  }








  function result() {
    var result = $(`<h3>If your ${secondaryVariable} was based on your actual ${primaryVariable} of ${primaryVariableValue}, your ${secondaryVariable} would be ${secondaryVariableValue}.</h3>`)
    return result;
  }

  function resultHeight() {
    var resultHeight = $(`<h3>If your ${secondaryVariable} ( for a ${primaryVariableA}) was based on your actual ${primaryVariable} of ${primaryVariableValue}, your ${secondaryVariable} would be ${secondaryVariableValue}.</h3>`);
    return resultHeight;
  }

  function resultIncome() {
    console.log(upperLimit, lowerLimit)
    if (upperLimit === undefined){
      upperLimit = ""
    }
    var resultIncome = $(`<h3>If your ${secondaryVariable} was based on your actual ${primaryVariable} of ${primaryVariableValue}, your ${secondaryVariable} would be between ${lowerLimit} and ${upperLimit}.</h3>
      <h4>* Income distribution is not normally distributed, but these results are generated from your previously identified percentile .</h4>`);
    return resultIncome;
  }

}
$(window).on("load", readyFn);
