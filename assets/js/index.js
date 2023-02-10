const cam = document.getElementById('cam')

const startVideo = () => {
  navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    devices.forEach(device => {
      if (device.kind === 'videoinput') {
        navigator.getUserMedia(
          {
            video: {
              deviceId: device.deviceId
            }
          },
          stream => cam.srcObject = stream,
          error => console.log(error)
        )
      }
    })
  })
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/assets/lib/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/assets/lib/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/assets/lib/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/assets/lib/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/assets/lib/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/lib/models')
]).then(startVideo)

