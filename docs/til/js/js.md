# new Date() 객체 다루기

```js
Date.now(); // 1635413511776
new Date().getTime(); // 1635413511776
new Date("2021-10-28"); // 2021-10-28T00:00:00.000Z
new Date(Date.UTC(2021, 9, 28)); //2021-10-28T00:00:00.000Z
new Date("2021-10-28").getDate(); // 28
new Date("2021-10-28").toDateString() // 'Thu Oct 28 2021'
new Date("2021-10-28").toLocaleDateString("en") // '10/28/2021'
new Date("2021-10-28").toLocaleDateString("en", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) // 'Thursday, October 28, 2021'
new Date("2021-10-28").toLocaleDateString("ko") // '2021. 10. 28.'
new Date("2021-10-28").toLocaleDateString('ko', {month: 'long'}) // '10월'
new Date("2021-10-28").toLocaleDateString('ko', {year: 'numeric', month: 'long', day: 'numeric'}) // '2021년 10월 28일'
```
