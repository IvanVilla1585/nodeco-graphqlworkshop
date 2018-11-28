
async function initCache(key, connector, cache) {
  const results = await connector.find()
  console.log(results.data)
  cache.set(key, results.data)
}

module.exports = initCache