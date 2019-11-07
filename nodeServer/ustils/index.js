const utils = {
  stringfyResp(code, data) {
    code = parseInt(code) || 400
    data = data || {}
    return JSON.stringify({ code, data })
  }
}
module.exports = utils