import { expect, test } from 'vitest';
import { getTodoTitleError, TODO_TITLE_REQUIRED_ERROR, TODO_TITLE_MAX_LENGTH_ERROR } from './constants';

test('getTodoTitleError: valid length passes', () => {
  expect(getTodoTitleError('a'.repeat(30))).toBe('');
  expect(getTodoTitleError('a'.repeat(29))).toBe('');
});

test('getTodoTitleError: over max length fails', () => {
  expect(getTodoTitleError('a'.repeat(31))).toBe(TODO_TITLE_MAX_LENGTH_ERROR);
});

test('getTodoTitleError: empty string fails', () => {
  expect(getTodoTitleError('')).toBe(TODO_TITLE_REQUIRED_ERROR);
});

test('getTodoTitleError: whitespace-only fails', () => {
  expect(getTodoTitleError('   ')).toBe(TODO_TITLE_REQUIRED_ERROR);
  expect(getTodoTitleError('\t\n  ')).toBe(TODO_TITLE_REQUIRED_ERROR);
});
