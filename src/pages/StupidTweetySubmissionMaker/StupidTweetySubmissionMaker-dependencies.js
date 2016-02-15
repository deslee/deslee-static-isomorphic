import "filedrop";
import "aws-sdk/dist/aws-sdk";

var content = require("./StupidTweetySubmissionMaker.md");

const AWS = window.AWS;

var fakeInput = document.createElement('input');
fakeInput.type = 'file';

export default function(dropid, canvasId, tweetyId, statusUpdate, onContent) {
  AWS.config.region = 'us-east-1';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: "us-east-1:d15dccd8-d8ce-4898-bef3-e3139112b7af"});

	onContent(content);

  var s3 = new AWS.S3();
  var lambda = new AWS.Lambda();
  var img = new Image();
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext("2d");
  var file;
  var dw, dh;
  img.onload = onImageLoad;

  function drawFace(face) {
    var f = face, c = convertCoord;
    //ctx.rect(c(f.x, 'w'),c(f.y, 'h'),c(f.width, 'w'), c(f.height, 'h'));
    ctx.drawImage(document.getElementById(tweetyId), c(f.x, 'w'),c(f.y, 'h'),c(f.width, 'w'), c(f.height, 'h'));
  }


  function drawOnFaces(faces) {
    statusUpdate("Drawing on faces...");
    ctx.beginPath();
    faces.forEach(drawFace);
    ctx.stroke();
    statusUpdate("Done!");
  }

  function processFaces(key) {
    statusUpdate("Processing on server...");
    lambda.invoke({
      FunctionName: 'facedetect',
      Payload: JSON.stringify({key: key})
    }, function(err, data) {
      if (err) {
        statusUpdate("Processing on server... error! " + JSON.stringify(err));
      } else {
        statusUpdate("Processing on server... success!");
        var response;
        try {
          response = JSON.parse(data.Payload);
        } catch (e) {
          statusUpdate("Failed to parse server response!");
        }
        if (response) {
          console.log(response);
          drawOnFaces(response);
        }
      }

    })
  }

  function uploadFaces() {
    statusUpdate("Sending to server...");
    var params = {
      Key: guid() + (file.name.split('.').length >= 2 ? "." + file.name.split('.')[file.name.split('.').length-1] : ''),
      ContentType: file.type,
      Bucket: 'des-facedetection',
      Body: file
    };

    console.log(params);

    s3.putObject(params, function(err, data) {
      if (err) {
        statusUpdate("Sending to server... error! " + JSON.stringify(err));
      }
      else {
        statusUpdate("Sending to server... Success!");
        processFaces(params.Key);
      }
    })
  }

  function onImageLoad() {
    statusUpdate("Image loaded, drawing image");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    dw = img.width;
    dh = img.height;
    var scale = 1;

    if (dw > canvas.width) {
      var ratio = dh / dw;
      dw = canvas.width;
      dh = dw * ratio;
      console.log(dw, dh);
    }
    if (dh > canvas.height) {
      var ratio = dw / dh;
      dh = canvas.height;
      dw = dh * ratio;
      console.log(dw, dh);
    }
    ctx.drawImage(img, 0,0, dw, dh);

    statusUpdate("Image drawn");
    uploadFaces();
  }

  var zone = new FileDrop(dropid, {dragOverClass: "draggingOver"});
  zone.event('send', function(files) {
    statusUpdate("Loading image");
    if (files.length <= 0) {
      return;
    }

    var fileHandle = files[0];
    fileHandle.readDataURI(function(dataUri) {
      img.src = dataUri;
    });
    file = fileHandle.nativeFile
  });

  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }

  function convertCoord(c, d) {
    if (d === 'w') {
      return c * dw / img.width
    }
    return c * dh / img.height
  }
}
