import { interval, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, switchMap } from "rxjs/operators";

const URL = "https://polling-5piw3r8jk-dmitriy-a76d.vercel.app//unread";

export default function startPolling(callback) {
  return interval(5000)
    .pipe(
      switchMap(() =>
        ajax.getJSON(URL).pipe(catchError(() => of({ messages: [] }))),
      ),
    )
    .subscribe((response) => {
      callback(response.messages);
    });
}
