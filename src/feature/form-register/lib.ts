type AgeCalculator = (birthDate: Date) => number;

export const calculateAge: AgeCalculator = (birthDate) => {
  const today = new Date();
  const birthYear = birthDate.getFullYear();
  const currentYear = today.getFullYear();

  let age = currentYear - birthYear;

  const birthMonth = birthDate.getMonth();
  const currentMonth = today.getMonth();

  if (currentMonth < birthMonth) {
    age--;
  } else if (currentMonth === birthMonth) {
    const birthDay = birthDate.getDate();
    const currentDay = today.getDate();

    if (currentDay < birthDay) {
      age--;
    }
  }

  return age;
};

export function formatDate(date: Date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
