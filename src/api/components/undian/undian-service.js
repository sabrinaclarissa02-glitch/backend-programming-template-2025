const repo = require('./undian-repository');

async function mulaiUndian({ userId }) {
  const hari = new Date();
  hari.setHours(0, 0, 0, 0);

  const count = await repo.hitungPerhari(userId, hari);
  if (count >= 5) {
    throw new Error('Limit Reached');
  }

  const hasil = Math.random() < 0.5;

  if (!hasil) {
    await repo.createLog({ userId, hasil: 'LOSE' });
    return { message: 'Kamu tidak berhasil' };
  }

  const semuahadiah = await repo.ambilHadiah();

  if (semuahadiah.length === 0) {
    await repo.createLog({ userId, hasil: 'LOSE' });
    return { message: 'hadiah habis' };
  }

  const hadiah = semuahadiah[Math.floor(Math.random() * semuahadiah.length)];

  await repo.hadiahMines(hadiah.id);
  await repo.createLog({ userId, namaHadiah: hadiah.nama, hasil: 'WIN' });

  return { message: `Selamat! Anda memenangkan ${hadiah.nama}` };
}

async function jejakUndian({ userId }) {
  const jejak = await repo.ambilJejak(userId);
  return {
    message: 'jejak berhasil diambil',
    data: jejak,
  };
}

function sensorNama(nama) {
  if (!nama) return '';

  return nama
    .split(' ')
    .map((kata) => {
      if (kata.length <= 2) return kata;

      const depan = kata.charAt(0);
      const belakang = kata.charAt(kata.length - 1);
      const bintang = '*'.repeat(kata.length - 2);

      return depan + bintang + belakang;
    })
    .join(' ');
}

async function getlistPemenang() {
  const pemenang = await repo.listPemenang();

  if (pemenang.length === 0) {
    return {
      message: 'Belum ada pemenang',
      data: [],
    };
  }

  const data = pemenang.map((p) => ({
    nama: sensorNama(p.userId),
    hadiah: p.namaHadiah,
  }));

  return {
    message: 'Daftar pemenang berhasil diambil',
    data,
  };
}

async function ambilHadiah() {
  const hadiah = await repo.ambilHadiah();

  return {
    message: 'Daftar hadiah berhasil diambil',
    data: hadiah,
  };
}

module.exports = {
  mulaiUndian,
  jejakUndian,
  sensorNama,
  getlistPemenang,
  ambilHadiah,
};
