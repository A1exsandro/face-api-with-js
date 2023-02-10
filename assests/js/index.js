const cam = document.getElementById('cam')

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