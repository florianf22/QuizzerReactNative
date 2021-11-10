import { decode } from 'html-entities';

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array: any[]): any[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function parser(str: string): string {
  return decode(str);
}

export function calculateMinutesBetweenTwoTimeStamps(
  startTime: number,
  endTime: number
): number {
  return Math.floor((endTime - startTime) / 1000 / 60 / 60 / 1000);
}
