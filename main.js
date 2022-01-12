prediction_1="";
prediction_2="";
Webcam.set({
    width: 400,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="cam_result" src="' + data_uri + '"/>';
    });
}
console.log('ml5_version', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/r4mQFjTDlb/model.json', modelLoaded);
function modelLoaded(){
    console.log('Model Loaded')
}
function speak(){
    synth=window.speechSynthesis;
    speakdata_1= "The first prediction is " + prediction_1;
    speakdata_2= "The second prediction is " + prediction_2;
    utterThis=new SpeechSynthesisUtterance (speakdata_1 + speakdata_2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("cam_result");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak()
        if(results[0].label=="Happy Boi"){
            document.getElementById("update_emoji").innerHTML="&#128512";
        }
        if(results[0].label=="Sad Boi"){
            document.getElementById("update_emoji").innerHTML="&#128532";
        }
        if(results[0].label=="Angry Boi"){
            document.getElementById("update_emoji").innerHTML="&#128545";
        }
        if(results[1].label=="Happy Boi"){
            document.getElementById("update_emoji2").innerHTML="&#128512";
        }
        if(results[1].label=="Sad Boi"){
            document.getElementById("update_emoji2").innerHTML="&#128532";
        }
        if(results[1].label=="Angry Boi"){
            document.getElementById("update_emoji2").innerHTML="&#128545";
        }
    }
}