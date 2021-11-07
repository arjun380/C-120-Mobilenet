function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelloaded);
}

function modelloaded() {
  console.log('Model Loaded!');
}

function draw(){
  image(video, 0 ,0 ,300 ,300);
  classifier.classify(video, gotResult);
}

var previous_result = '';

function gotResult(error, results){
  if (error) {
    console.log(error);
  }else {
    if((results[0].confidence > 0.5) && (previous_result != results[0].
      label)){
        console.log(results);
        previous_result = results[0].label;
        var synth = windows.speechSynthesis;
        speak_data = 'Object detected is - '+results[0].label;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);

        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("results_object_sccuracy").innerHTML = results[0].confidenence.toFixed(3);

      }
   }
}



