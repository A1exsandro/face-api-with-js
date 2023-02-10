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

// DRAW THE CANVAS AND DETECT
cam.addEventListener('play', async () => {
  const canvas = faceapi.createCanvasFromMedia(cam)
  const canvasSize = {
    width: cam.width,
    height: cam.height
  }
  faceapi.matchDimensions(canvas, canvasSize)
  document.body.appendChild(canvas)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(cam, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
    const resizeDetections = await faceapi.resizeResults(detections, canvasSize)
    canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizeDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizeDetections)
  }, 100)
})