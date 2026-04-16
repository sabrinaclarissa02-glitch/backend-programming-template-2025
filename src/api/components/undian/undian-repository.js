const { undian: Undian, Hadiah } = require('../../../models');

async function hitungPerhari(userId, hari) {
  return Undian.countDocuments({ userId, tanggal: { $gte: hari } });
}

async function ambilHadiah() {
  return Hadiah.find({ sisa: { $gt: 0 } });
}

async function hadiahMines(id) {
  return Hadiah.updateOne({ _id: id }, { $inc: { sisa: -1 } });
}

async function createLog(data) {
  return Undian.create(data);
}

async function ambilJejak(userId) {
  return Undian.find({ userId }).sort({ tanggal: -1 });
}

async function listPemenang() {
  return Undian.find({
    hasil: 'WIN',
  })
    .populate('userId', 'nama')
    .sort({ tanggal: -1 });
}

module.exports = {
  hitungPerhari,
  ambilHadiah,
  hadiahMines,
  createLog,
  ambilJejak,
  listPemenang,
};
