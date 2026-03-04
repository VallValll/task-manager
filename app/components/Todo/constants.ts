export const TODO_TITLE_MAX_LENGTH = 30;

export const TODO_CREATE_PLACEHOLDER = 'What needs to be done?';
export const TODO_EDIT_PLACEHOLDER = 'Edit todo title';

export const TODO_TITLE_REQUIRED_ERROR = 'Введите название задачи';
export const TODO_TITLE_MAX_LENGTH_ERROR = `Максимальная длина заголовка ${TODO_TITLE_MAX_LENGTH} символов`;

export const getTodoTitleError = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return TODO_TITLE_REQUIRED_ERROR;
  }

  if (trimmedValue.length > TODO_TITLE_MAX_LENGTH) {
    return TODO_TITLE_MAX_LENGTH_ERROR;
  }

  return '';
};
