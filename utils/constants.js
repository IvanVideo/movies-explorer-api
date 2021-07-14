const regularLink = /^(http|https):\/\/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/;
const errorNotFound = 'Пользователь не найден';
const invalidData = 'Переданы некорректные данные';
const alreadyUsedEmail = 'Данная почта уже используется';
const notBeEmpty = 'Email или пароль не могут быть пустыми';
const invalidEmail = 'Неправильные почта или пароль';
const notFoundUser = 'Нет пользователя с таким id';
const notFoudCard = 'Карточка не найдена';
const delcard = 'Вы не можете удалять чужие карточки';
const dataBaseUrl = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  link: regularLink,
  notFound: errorNotFound,
  invalid: invalidData,
  alreadyUsed: alreadyUsedEmail,
  empty: notBeEmpty,
  emailInvalid: invalidEmail,
  invalidId: notFoundUser,
  noCard: notFoudCard,
  noDelCard: delcard,
  mongoesUrl: dataBaseUrl,
};
