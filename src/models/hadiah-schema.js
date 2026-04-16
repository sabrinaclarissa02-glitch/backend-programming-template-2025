module.exports = (db) =>
  db.model(
    'Hadiah',
    db.Schema({
      nama: String,
      kuota: Number,
      sisa: Number,
    })
  );
