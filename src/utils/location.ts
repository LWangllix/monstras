
export const getCurrentLocation = (callback, onError) => {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      if(position?.coords) {
        callback({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      } else {
        onError();
      }
    },
    (e) => {
      onError(e)
    },
    { enableHighAccuracy: false, timeout: 10000 }
  )
}
  
