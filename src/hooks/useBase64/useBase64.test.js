import { renderHook } from '@testing-library/react-hooks';
import { useBase64 } from './useBase64';

describe('test cases for useBase64 hook', () => {
    it('returns empty string if encoding string is falsy', () => {
        const {
            result: { current }
        } = renderHook(useBase64);
        const { encode } = current;
        expect(encode(undefined)).toBe('');
        expect(encode(null)).toBe('');
        expect(encode(0)).toBe('');
        expect(encode(false)).toBe('');
        expect(encode('')).toBe('');
    });
    it('encodes string "test"', () => {
        const {
            result: { current }
        } = renderHook(useBase64);
        const encodedString = current.encode('Namangan_21_32');
        expect(encodedString).toBe('TmFtYW5nYW5fMjFfMzI=');
    });
    it('returns parameter itself if decoding string is falsy', () => {
        const {
            result: { current }
        } = renderHook(useBase64);
        const { decode } = current;
        expect(decode(undefined)).toBe(undefined);
        expect(decode(null)).toBe(null);
        expect(decode(0)).toBe(0);
        expect(decode(false)).toBe(false);
        expect(decode('')).toBe('');
    });
    it('decodes and returns "test" string', () => {
        const {
            result: { current }
        } = renderHook(useBase64);
        const encodedString = current.decode('VGFzaGtlbnRfNDVfMzI=');
        expect(encodedString).toBe('Tashkent_45_32');
    });
});
