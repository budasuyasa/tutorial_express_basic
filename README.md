# Tutorial Express Dasar


| Author      | Last Update             |
| ----------- | ------------------------|
| Buda Suyasa |  2023-12-23 19:47 UTC+8 |

Untuk membuat web application dengan menggunakan Javascript, kita bisa
menggunakan ExpressJS atau secara singkat bisa disebut engan Express. ExpressJs
adalah salah satu framework untuk membuat Fullstack web application. Express
sangat meninimal, mudah dipelajari, dan sangat cocok digunakan untuk membuat
berbagai macam aplikasi, baik dari skala kecil hingga skala yang besar.

Express sangat modular dan didukung oleh berbagai macam plugin, sehingga membuat
proses pembuatan aplikasi menjadi lebih mudah dan solid. Express bisa
disandingkan dengan berbagai macam template engine, ORM, ataupun framework lain
untuk membuat aplikasi web yang solid dan prima.

## Prasyarat

Agar dapat mengikuti tutorial ini dengan baik, ada baiknya Anda memahami
beberapa konsep berikut terlebih dahulu:

- Cara kerja web secara umum
  - Cara kerja web browser
  - URL
  - Query parameter
  - Request
    - Request method
    - Response code
- Dasar HTML
- Dasar CSS
- Dasar Javascript yang terdiri dari:
  - Variabel dan tipe data
  - Percabangan
  - Perulangan
  - Function
  - Object
- Dasar SQL Database
- Basic NodeJS

## Memulai Proyek Express

Pertama, mari kita buat sebuah proyek NodeJS dengan menggunakan perintah
`node init`.

```bash
package name: (tutorial-expressjs-)
version: (1.0.0)
description: Tutorial membuat aplikasi web dengan menggunakan Express
entry point: (index.js)
test command:
git repository:
keywords: experss, nodejs, web, aplikasi
author: Buda Suyasa
license: (ISC)
About to write to /Users/budasuyasa/Desktop/Tutorial ExpressJS /package.json:
```

Kemudian, install Express dengan `npm install express --save`.

Dalam tutorial ini, kita menggunakan `index.js` sebagai entry point dari web
server yang akan kita buat dengan Express. Jadi, buatlah sebuah file baru dengan
nama `index.js`. Di dalam `index.js` kita akan membuat sebuah web server dengan
Express.

```javascript
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Emang boleh?");
});

app.listen(port, () => {
  console.log(`Web server berjalan pada http://localhost:${port}`);
});
```

Kemudian, kita bisa menjalankan web server dengan menggunakan perintah
`node index.js`. Buka web browser dan kunjungi `http://localhost:3000`

## Menambahkan Path

Kita bisa menambahkan path dengan menggunakan method `get()` atau `post()`
method pada express object. Pada contoh sebelumnya kita sudah menambahkan path
untuk route `/`. Route `/` merupakan route default atau "home page" dari
aplikasi kita.

Method `get()` dan `post()` menerima 2 buah parameter. Parameter pertama adalah
path apa yang mau kita daftarkan dan parameter kedua yaitu function callback
handler dari path tersebut. Handler adalah istilah yang kita pakai untuk
menunjukan proses apa yang akan terjadi apabila sebuah path dikunjungi.

Handler ditulis dengan menggunakan function. Dalam function handler terdapat 2
buah parameter. Parameter pertama dari handler adalah object `Request` dan
parameter kedua adalah object `Response`. Kedua object ini akan kita bahasa
lebih lanjut nanti.

Mari kita coba tambahkan path baru setelah route `/`.

```javascript
app.get("/profile", (req, res) => {
  res.send("Ini adalah halaman profile");
});
```

Dalam contoh di atas, dalam membuat handler, kita menggunakan arrow function.
Arrow sejatinya adalah sebuah function biasa yang syntaxnya lebih ekspresif.

Jika tanpa arrow function, syntax di atas menjadi sebagai berikut:

```javascript
app.get("/profile", function (req, res) {
  res.send("Ini adalah halaman profile");
});
```

Simpan file index.js, kemudian restart server kembali. Untuk merestart server,
matikan server terlebih dahulu dengan menggunakan Ctrl + C. Kemudian, jalankan
server kembali denngan `node index.js`. Kunjungi http://localhost:3000/profile
melalui web browser.

## Query Parameter

Kita dapat mengakses query parameter yang datang dari URL melalui object `req`.
Misalkan kita ingin mengkases value dari Query paramteer dari URL berikut:

```
http://localhost:3000/profile?nama=Agus
```

Parameter nama dan valuenya dapat kita akses dengan cara seperti berikut:

```javascript
app.get("/profile", function (req, res) {
  // mengakses nama dari URL
  let nama = req.query.nama;
  console.log("Nama dari query parameter adalah: ", nama);
  res.send(`Ini adalah halaman profile ${nama}`);
});
```

Coba akses http://localhost:3000/profile?nama=Agus melalui web browser. Jika
tidak error, Akan tampil teks `Ini adalah halaman profile Agus` pada jendela web
browser.

## Menggunakan template enggine

Template engine merupakan library yang bisa kita gunakan untuk menghasilkan HTML
template. Pada contoh sebelumnya, response yang kita berikan ketika sebuah path
diakses masih berupa teks saja.

Apabila kita mengembalikan kode HTML pada `res.send()`, maka code yang kita
tulis menjadi tidak rapi dan akan sangat sulit untuk dibaca. Apabila sulit
dibaca, tentunya akan sulit untuk dipahami.

Untuk membuat code kita menjadi lebih mudah ditulis dan terorganisir, kita akan
memisahkan logic dan template. Maka dari itu kita memerlukan template engine.

Express bisa disandingkan dengan berbagai template engine. Untuk memudahkan
proses belajar, dalam tutorial ini kita akan menggunakan ejs. ejs adalah salah
satu template engine populer yang digunakan saat menulis aplikasi dengan
express.

Kita akan belajar cara menginstall, mengkonfigurasi, dan menggunakan template
engine express pada bagian selanjutnya.

## Menggunakan EJS

EJS memungkinkan kita untuk menggunakan Javascript di dalam HTML. Misalkan kita
bisa mengeksekusi Javascript statement seperti `for`, `if`, `forEach` dan
berbagai keyword lainnya.

EJS atau ejs perlu kita instal terlebih dahulu dengan menggunakan npm.

```bash
npm install ejs --save
```

Kemudian, daftarkan ejs sebagai template engine default yang akan kita gunakan
oleh express. Ini bisa kita lakukan dengan menggunakan method `set()` pada
object express.

```javascript
const express = require("express");
const app = express();

app.set("view engine", "ejs");
```

Kini kita ejs siap digunakan. Sekarang, buatlah sebuah directory/folder baru
dengan nama **views** pada root directory project. Di dalam directory views,
tambahkan sebuah file baru dengan nama `profile.ejs`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Profile</title>
  </head>
  <body>
    <h1>Ini adalah halaman profile</h1>
  </body>
</html>
```

Selanjutnya mari kita lakukan sedikit perubaha pada handler `/profile`. Ganti:

```javascript
res.send("Ini adalah halaman profile");
```

menjadi:

```javascript
res.render("profile");
```

Pada kode sebelumnya, ketika path `/profile` dikunjungi, ia akan merespon teks
`Ini adalah halaman profile`. Ini kita ganti dengan method `res.render()`.
Method ini akan merender `profile.ejs` yang ada di dalam directory view sebagai
response dan request. Kunjungi kembali path `/profile` untuk melihat hasil
perubahan yang telah dilakukan.

## Membagikan variable ke template ejs

Dalam membuat aplikasi web yang dinamis tentunya kita akan perlu membagikan
variable dari sisi logic ke template. Ini bisa kita lakukan dengan menambahkan
parameter `data` pada method `render()`.

Pada parameter `data`, kita bisa mengirimkan object ke template. Setiap property
object akan menjelma menjadi variabel pada template. Sebagai contoh, lakukan
perubahan berikut pada `index.js`.

```javascript
// index.js
res.render("/profile", {
  nama: "Tugus Ganteng",
  kelas: "Pagi 2",
});
```

Selanjutnya mari kita coba tampilkan value dari property `nama` dan `kelas` di
dalam template.

```html
<!-- kode sebelumnya -->
<h1>Ini adalah halaman profile <%= nama %> dari kelas <%= kelas %></h1>
<!-- kode selanjutnya -->
```

Restart server dan kembali kunjungin path `/profile` dan cek perubahan yang
terjadi.

## Menggunakan database

Dalam membangun aplikasi web yang dinamis, tentu saja kita akan memerlukan
database atau basis data. Kita bisa menghubungkan aplikasi web yang kita buat
dengan database seeprti MySQL, Postgree, Oracle, MongoDB dan lainnya.

Dalam tutorial ini kita akan menggunakan database MySQL untuk mendemonstrasikan
penggunaan experss dan database.

Kita juga akan belajar menggunnakan KnexJs yang merupakan sebuah ORM untuk
memudahkan proses penulisan query.

## Menyiapkan database

Pertama kita akan membuat database terlebih dahulu. Proses ini bisa dilakukan
dengan menggunakan database client seperti PHPMyAdmin, Datagrip, HeidiSQL atau
yang lainnnya. Anda juga bisa menggunakan MySQL console jika lebih prefer cara
tersebut.

Pertama mari kita buat sebuah database dengan nama **buku**.

```sql
-- Buat database dengan nama buku
create database buku;
-- gunakan buku
use buku;
-- buat table buku
CREATE TABLE buku (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255),
    tahun_terbit YEAR,
    pengarang VARCHAR(255)
);
-- insert beberapa data ke dalam database buku
INSERT INTO buku (judul, tahun_terbit, pengarang) VALUES
('Menguasai Laravel dalam 2 Jam', 2001, 'Dukun Sakit'),
('Resep Obat Sakit Kepala Pasca Ngoding', 2002, 'Mantan Programmer Sukses'),
('Cara Singkat Menjadi Sarjana Informatika', 2003, 'Endless Students'),
('Dalam Diam Codingku Sikat', 2004, 'Tereniye'),
('Novel Informatika', 2005, 'Satoru Gotopedia');
```

Di dalam SQL query di atas, kita telah menyiapkan sebuah database dengan nama
buku dan sebuah table dengan nama buku. Kita juga telah memasukan beberapa data
ke dalam table yang nanti kita akan gunakan sebagai data dummy.

## Menyiapkan Knex dan koneksi database

Selanjutnya mari kita install Knex.js dan modul **mysql** ke dalam proyek kita
dengan menggunakan perintah:

```bash
npm install --save knex mysql
```

Selanjutnya, buatlah sebuah sebuah file dengan nama `knexfile.js` di dalam root
directory proyek yabng berisikan konfigurasi koneksi database seperti berikut
ini:

```javascript
// sesuaikan variabel konfigurasi dengan konfigurasi database yang Anda gunakan
module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "buku",
    database: "",
  },
};
```

Selanjutnya, mari kita pakai knex ke dalam index.js. Tambahkan code berikut pada
`index.js`.

```javascript
const knex = require("knex")(require("./knexfile"));
```

## Melakukan query pertama

Mari kita coba melakukan proses query sederhana dengan menggunakan knex. Kita
akan mengambil semua data dari table buku dan menampilkannya pada console.

```javascript
app.get("/buku", (req, res) => {
  // select * from buku
  knex("buku")
    .select("*")
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
```

Pada contoh di atas, kita melakukan query dengan memanggil object knex dengan
memberikan nama table yang akan dilibatkan dalam proses query. Kemudian, kita
bisa melakukan method chaining dalam mengeksekusi atau menambahkan query
selanjutnya. Kita dapat menangkap hasi query dari Promises method `then()` dan
menangkap error (jika terjadi error) pada chainging method `catch()`.

Kunjungi path `/buku` pada web browser dan cek log console web server. Console
akan menampilkan array of object yang berisikan data yang diambil dari table
buku.

## Menampilkan hasil select query ke dalam template

Selanjutnya mari kita tampilkan setiap data yang sudah diambil table buku ke
dalam template atau view.

Kita akan melakukan perubahan pada handler path `/buku` dengan menambahkan code
yang menampilkan hasil query ke dalam template `buku_index.ejs`:

```javascript
app.get("/buku", (req, res) => {
  knex("buku")
    .select("*")
    .then((data) => {
      // load buku_index.ejs dan bagikan data
      // ke template. Perhatikan paramter kedua dari
      // res.render
      res.render("buku_index", {
        buku: data,
      });
    })
    .catch((error) => console.log(error));
});
```

Kemudian Siapkan sebuah file `ejs` dengan nama `buku_index.ejs` pada directory
`views`.

```bash
mkdir views/buku.index.ejs
```

Kemudian isikan kode berikut ini:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Data Buku</title>
  </head>
  <body>
    <!-- Menampilkan data buku yang dishare dari index.js -->
    <h1>Data Buku</h1>
    <ul>
      <!-- Karena buku berupa array, gunakan perulanagan untuk menampilkan setiap data buku -->
      <% for( let index = 0; index < buku.length; index++ ) { %>
      <li><%= buku[index].judul %> - <%= buku[index].pengarang %></li>
      <% } %>
    </ul>
  </body>
</html>
```

Kita bisa lihat pada `buku_index.ejs`, property `buku` dari `index.js` berubah
menjadi variabel. Value dari property `buku` merupakan array yang berisikan
objek hasil dari query database, sehingga kita bisa iterasi dengan menggunakan
statement `for`.

## Menggunakan form

Form adalah salah satu cara mengirimkan data dari frontend ke server selain
menggunakan query parameter. Sejatinya, kita bisa mengirimkan data dari frontend
ke server dengan menggunakan method GET atau method POST. Bedanya, dengan
menggunakan method GET, data yang dikirimkan ke server akan terlihat pada URL,
sedangkan request POST, data dikirim via request body.

Agar lebih jelas, mari kita terapkan penggunaan form dengan method POST pada
proyek kita. Kita akan membuat sebuah form untuk mengirimkan data pembuatan buku
baru. Buatlah sebuah file baru pada directory **views** dengan nama
**buku_create.ejs**. Isi dari form ini adalah sebuah tag form serderhana yang
akan terdiri dari inputan untuk memasukan judul buku, tahun terbit dan
pengarang.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Buat Buku Baru</title>
    <style>
      input {
        display: block;
        margin-top: 5px;
      }
    </style>
  </head>
  <body>
    <form method="post" action="buku/simpan">
      <label>Judul Buku</label>
      <input type="text" name="judul" />
      <label>Tahun Terbit</label>
      <input type="number" name="tahun_terbit" />
      <label>Pengarang</label>
      <input type="text" name="pengarang" />
      <input type="submit" value="Simpan" />
    </form>
  </body>
</html>
```

Dalam `buku_create.ejs` kita menambahkan form yang memiliki attribute action ke
path `buku/simpan`. Selanjutnya kita akan membuat path ini dengan handlernya.
Data yang kita kirimkan terdiri dari beberapa variabel yaitu `judul`,
`tahun_terbit`, dan `pengarang`.

Selanjutnya mari kita buat path `/buku/create` untuk menampilkan template form
yang sudah kita siapkan di atas.

```javascript
app.get("/buku/create", (req, res) => {
  res.render("buku.create");
});
```

Selanjutnya mari kita buat path `/buku/simpan` beserta dengan handler-nya.

```javascript
app.post("/buku/simpan", (req, res) => {
  const judul = req.body.judul;
  const tahun_terbit = req.body.tahun_terbit;
  const pengarang = req.body.pengarang;

  console.log("Judul:", judul);
  console.log("Tahun Terbit:", tahun_terbit);
  console.log("Pengarang:", pengarang);
});
```

Value dari setiap elemen form dapat kita akses melalui object `req.body`. Namun
sebelum itu kita juga harus menambahkan konfigurasi agar express dapat membaca
request body dari object `req.body`.

```javascript
const express = require("express");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
```

Pada perubahan di atas, kita meminta express untuk menambahkan 2 buah middleware
baru pada request dengan method `use()`. Middleware `express.json()` didaftarkan
agar aplikasi dapat menerima request body dengan tipe JSON, sedangkan
`express.urlencoded({ extended: true })` berfungsi untuk URL-encoded body.

Buka web browser dan kunjungi `http://localhost:3000/buku/create`. Isikan form
dan klik Simpan. Perhatikan jendela console, pastikan semua variabel yang
dikirimkan telah berhasil muncul.

Selanjutnya kita akan menambahkan proses menyimpan data ke dalam table buku.
Data yang berhasil kita tangkap dari `req.body` akan kita simpan dengan
mekeksekusi method `knex.insert()`.

Lakukan perubahan berikut pada path `/buku/simpan`.

```javascript
app.post("/buku/simpan", function (req, res) {
  const judul = req.body.judul;
  const tahun_terbit = req.body.tahun_terbit;
  const pengarang = req.body.pengarang;

  knex("buku")
    .insert({
      judul: judul,
      tahun_terbit: tahun_terbit,
      pengarang: pengarang,
    })
    .then(() => {
      res.send("Data berhasil disimpan");
    })
    .catch((err) => {
      console.log(err);
      res.send("Terjadi kesalah saat mennyimpan data");
    });
});
```

Ulangi proses pengisian data pada path `buku/create` dan cek data dalam table
buku. Jika berhasil, data baru akan ditambahkan, jika tidak, error akan tampil
pada jendela console.

## Tips

- Install [extension ejs](https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support) pada Visual Studio Code untuk meningkatkan dukungan terhadap ejs file. Extension ini memiliki beberapa fitur seperti code higlihgt, snippet, linter adn lainnya.
- Gunakan [nodemon](https://nodemon.io/) untuk menghindari restart server setiap melakukan perubahan pada `index.js`. TLDR cara menggunakan nodemon bisa dengan cara sebagai berikut:
  1. Install nodemon dengan `npm install --save-dev nodemon`
  2. Start web server dengan `nodemon index.js`


## Langkah belajar selanjutnya

Tutorial ini hanya mengulas bagian dasar yang perlu diketahui untuk membangun
aplikasi web dinamis dengan Javascript. Lanjutkan proses belajar dengan
mendalami berbagai macam konsep lain seperti:

- Form validation atau validasi form untuk melakukan validasi request body atau
  query parameter agar dapat patuh pada kriteria yang ditentukan. Referensi:
  [Express Validator](https://express-validator.github.io/docs/)
- Security atau keamanan. Memastikan aplikasi yang dibangun dilengkapi dengan
  mekanisme perlindungan untuk menghindari serangan XSS, SQL injection dan jenis
  serangan lainnya. Referensi: [Helmet.js](https://helmetjs.github.io/)
- Arsitektur: mengorganisasikan dan menyusun code dalam aplikasi agar mengikuti
  suatu paradigma tertentu, misalkan MVC. Ini akan membantu proses pengembangan
  jadi lebih mudah untuk dipahami dan dirawat. Referensi:
  [Express.js MVC](https://expressjs.com/en/starter/generator.html)
- Logging: menggunakan framework atau log library untuk memudahkan proses
  debugging sehingga kesalahan pada aplikasi mudah ditelusuri. Referensi:
  [Morgan](https://www.npmjs.com/package/morgan)
- Database Migration: Memudahkan proses pembuatan skema database serta migrasi
  database. Referensi:
  [Knex.js Migrations](https://knexjs.org/guide/migrations.html)

## Referensi:

- [Dasar Javasript](https://teal-sled-175.notion.site/Belajar-JS-9086b9ad5eb44dfebb2da08181fe45d0?pvs=4)
- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Knex.js](https://knexjs.org/)
