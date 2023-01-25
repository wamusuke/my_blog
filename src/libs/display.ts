export function displayTime(time: string): string {
  let timeSplit = time.split('-');
  return timeSplit[0] + '/' + timeSplit[1] + '/' + timeSplit[2].split('T')[0];
}

export function restrictDisplayTitle(title: string): string {
  if (title.length >= 35) {
    return title.substring(0, 35) + '...';
  } else {
    return title;
  }
}
