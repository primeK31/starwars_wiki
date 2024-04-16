import { FilmPipe } from './film.pipe';

describe('FilmPipe', () => {
  it('create an instance', () => {
    const pipe = new FilmPipe();
    expect(pipe).toBeTruthy();
  });
});
