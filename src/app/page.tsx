"use client";
import axios from "axios";
import { useState, useEffect } from "react";

/*pseudocode:
1. 
fetch random string dari API random string.

2. Pakai Axios.get buat dapetin URL-nya.

3. 

3. useEffect dua, satu buat fetch data, satu lagi untuk itung per alfabet.

4. Setelah dihitung, dijadiin object, terus disimpen di state.

*/

const apiRandomString =
  "https://www.random.org/strings/?num=10&len=32&upperalpha=on&unique=off&format=plain";

export default function liveCode() {
  //ini buat nampung data dari API.
  const [data, setData] = useState<string[]>([]);
  const [count, setCount] = useState<Record<string, number>>({});

  //useEffect pertama, buat fetch data dari API.
  useEffect(() => {
    async function fetchData() {
      //fetch data:
      const response = await axios.get(apiRandomString);
      //di split dulu per baris, jadiin string.
      const splitString = response.data.split("\n");
      setData(splitString);
    }
    fetchData();
  }, []);

  //useEffect kedua, buat itung per alfabet.
  useEffect(() => {
    //ini akan bisa run kalo udah ada data.
    if (data.length) {
      //setelah di split, di gabungin supaya bisa dihitung per alfabet.
      const combinedString: string = data.join("");
      const count: Record<string, number> = {};

      //looping per karakter
      for (let ch of combinedString) {
        //Jaddin uppercase supaya sama rata.
        const upper = ch.toUpperCase();

        //kasih kondisi kalo uppercase, dari alfabet, kalo selain itu (misalnya angka), skip.
        if (upper >= "A" && upper <= "Z") {
          //count, kalo 0 tambah 1, kalo udah ada, tambah 1 juga.
          count[upper] = (count[upper] || 0) + 1;
        }
        const sortedObject = Object.fromEntries(
          Object.entries(count).sort(([a], [b]) => a.localeCompare(b))
        );
        setCount(sortedObject);
        console.log(setCount);
      }
    }
  }, [data]);
  console.log(data);

  return (
    <main className="flex p-8 justify-center items-center">
      <h1 className="text-2xl">LIVE CODE CHALLANGE!</h1>
      <ul className="w-40 border rounded-md">
        {Object.entries(count).map(([letters, n]) => (
          <li
            key={letters}
            className={`flex justify-between px-3 py-1 ${
              n % 2 === 0 ? "text-red-600" : "text-white"
            }`}
          >
            <span>{letters}</span>
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
