module.exports = (db) =>
  db.model(
    'undian',
    db.Schema({
      userId: String,
      namaHadiah: String,
      hasil: String,
      tanggal: {
        type: Date,
        default: Date.now,
      },
    })
  );
