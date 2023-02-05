module.exports.unique_id_nanosecond = () => Number(Date.now() + String(process.hrtime()[1]).slice(3))
