// file ini berisikan object konfigurasi koneksi database yang digunakan pada
// module knex. Silahkan sesuaikan konfigurasi database yang Anda gunakan
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "tutorial_express",
    },
  },
};
