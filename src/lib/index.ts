import moment from "jalali-moment";

export function separatePrice(price: number): string {
  return price.toLocaleString("fa-IR");
}

export function convertDate(inputDate: Date) {
  const dateObject = new Date(inputDate);
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();
  const gregorianDate = new Date(year, month, day);
  const jalaliDate = moment(gregorianDate).format("jYYYY/jM/jD");
  return jalaliDate;
}

export function removeMatchingFields(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): Record<string, any> {
  const result = { ...obj1 };

  for (const key in result) {
    if (obj2.hasOwnProperty(key) && result[key] === obj2[key]) {
      delete result[key];
    }
  }

  return result;
}

export function removeFalsyValues(
  obj: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (obj[key]) {
      result[key] = obj[key];
    }
  }

  return result;
}
