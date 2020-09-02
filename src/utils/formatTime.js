export const formatTime = time  => {
  if(time === undefined || isNaN(time) || time < 0){
    return null; 
  }

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time % 60);
  
  return [hours,minutes,seconds]
    .map(v => v < 10 ? '0' + v  : v === 0 ? '00' : v)
    .join(':');
};
