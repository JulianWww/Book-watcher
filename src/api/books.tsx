import { Token } from "denanu-login";
import getJson from "./getJson";

export default async function loadBooks(callback: (books: IBookList) => void, token?: Token) {
  callback(await getJson(process.env.REACT_APP_BACKEND_URL + "/getBooks.php", token));
}

export function setWatchingbook(book: string | undefined, value: boolean, token?: Token, done?: (responce: Record<string, any>)=>void) {
  if (token) {
    var data: Record<string, any> =  {
      value: value,
      ...token
    }
    if (book) {
      data = {...data, book: book}
    }

    getJson(process.env.REACT_APP_BACKEND_URL + "/setWatchingBook.php", data, done)
  }
}

export interface IBook {
  name: string;
  url: string;
  image: string;
  watching: boolean;
}

export type IBookList = IBook[]; 