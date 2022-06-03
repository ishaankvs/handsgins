prediction_1="";
prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});
camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)  {
            document.getElementById("result").innerHTML = '<img id="capture_imge" src="' + data_uri + '"/>';
        });
} 
console.log("ml5 version",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cRN_8vbiz/model.json',modelLoaded);
function modelLoaded(){
    console.log('Model Loaded!');
}
function speak(){
    var synth= window.speechSynthesis;
    speak_data_1="the first prediction is"+ prediction_1;
    speak_data_2="and the second prediction id"+ prediction_2;
var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_imge');
    classifier.classify(img,gotResult);
}

function gotResult(error,result){
    if (error){
        console.error(error);
    }else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(result[0].label == "nice"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(result[0].label == "like"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(result[0].label == "dislike"){
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        
        if(result[1].label == "nice"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if(result[1].label == "like"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;"; 
        }
        if(result[1].label == "dislike"){
            document.getElementById("update_emoji2").innerHTML = "&#128078;" ;
        }
    }
}