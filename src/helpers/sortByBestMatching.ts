import { CityData } from 'city-timezones';
import getObjectProperty from './getObjectProperty';

function compareTwoStrings(first: string, second: string): number {
    const one = first.replace(/\s+/g, '');
    const two = second.replace(/\s+/g, '');

    if (one === two) return 1; // identical or empty
    if (one.length < 2 || two.length < 2) return 0; // if either is a 0-letter or 1-letter string

    const firstBigrams = new Map();
    for (let i = 0; i < one.length - 1; i += 1) {
        const bigram = one.substring(i, i + 2);
        const count: number = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

        firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < two.length - 1; i += 1) {
        const bigram = two.substring(i, i + 2);
        const count: number = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

        if (count > 0) {
            firstBigrams.set(bigram, count - 1);
            intersectionSize += 1;
        }
    }

    return (2.0 * intersectionSize) / (one.length + two.length - 2);
}

interface Rating {
    target: CityData;
    rating: number;
}

function sortBestMatch(mainString: string = '', targetObjects: any = [], path: string): Rating[] {
    if (typeof mainString !== 'string') return [];
    if (!Array.isArray(targetObjects) || targetObjects.length === 0) return [];
    const ratings: Rating[] = [];

    for (let i = 0; i < targetObjects.length; i += 1) {
        const element = targetObjects[i];
        let currentTargetString;

        if (typeof element === 'object' && path) {
            currentTargetString = getObjectProperty(element, path);
        } else {
            currentTargetString = element;
        }

        if (!currentTargetString || typeof currentTargetString !== 'string') return [];

        const currentRating = compareTwoStrings(mainString, currentTargetString);
        ratings.push({ target: element, rating: currentRating });
    }
    ratings.sort((a, b) => b.rating - a.rating);

    return ratings;
}

export default sortBestMatch;
