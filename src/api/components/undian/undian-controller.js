const undianService = require('./undian-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function mulaiUndian(request, response, next) {
  try {
    const { userid: userId, nama } = request.body;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, ' user id is required');
    }
    if (!nama) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, ' nama is required');
    }

    const result = await undianService.mulaiUndian({ userId, nama });

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function jejakUndian(request, response, next) {
  try {
    const { user_id: userId } = request.body;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, ' user id is required');
    }

    const result = await undianService.jejakUndian({ userId });

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function ambilHadiah(request, response, next) {
  try {
    const result = await undianService.ambilHadiah();

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getlistPemenang(request, response, next) {
  try {
    const result = await undianService.getlistPemenang();

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  mulaiUndian,
  jejakUndian,
  ambilHadiah,
  getlistPemenang,
};
