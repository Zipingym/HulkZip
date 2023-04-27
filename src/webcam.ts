const WebcamBuilder = (video?: HTMLVideoElement): Promise<HTMLVideoElement> => {
  video = video ?? document.createElement('video');
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(() => {
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            devices.forEach((device) => {
              if (device.kind == 'videoinput') {
                navigator.mediaDevices
                  .getUserMedia({
                    video: {
                      width: { ideal: 1920 },
                      height: { ideal: 1080 },
                      deviceId: { exact: device.deviceId },
                    },
                  })
                  .then((stream) => {
                    //@ts-ignore
                    video.srcObject = stream;
                    //@ts-ignore
                    resolve(video);
                  })
                  .catch((error) => {
                    console.error(error);
                    alert("Can't use Webcam");
                    reject();
                  });
              }
            });
          })
          .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
          });
      });
  });
};

export default WebcamBuilder;
