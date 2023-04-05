song = ""; 
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
rigthScore = 0;
leftScore = 0;

function preload()
{
    song = loadSound("music.mp3");

}
function setup()
{
    canvas = createCanvas(500,400);
    canvas.position(350,200);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses)
}
function draw()
{
    image(video, 0, 0, 500, 400);
    fill("#ff0000");
    stroke("#ff0000");
    if(leftScore > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
    inNumberLeftWrist = Number(leftWristY);
    removeDecimais = floor(inNumberLeftWrist);
    volume = removeDecimais/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
    if(rigthScore > 0.2)
    {
        circle(rigthWristX,rigthWristY,20);

        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 0.5";
            song.rate(0.5);
        }  
        if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 1";
            song.rate(1);
        }   
        if(rightWristY > 200 && rightWristY<= 300)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 1.5";
            song.rate(1.5);
        }  
        if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 2";
            song.rate(2);
        }   
        if(rightWristY > 400)
        {
            document.getElementById("speed").innerHTML = "Velocidade 2.5";
            song.rate(2.5);
        }     
    }
}
function modelLoaded()
{
    console.log("modelo carregado")
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        rigthScore = results[0].pose.keypoints[10].score;
        leftScore = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rigthWristX = " + rightWristX + "rigthWristY = " + rightWristY);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}