
function format(status, msg, data) {
    let response_code = (status == 'success' || status == true) ? '000000' : false

    return {
        status: status,
        response_code: response_code,
        response_text: msg,
        data: data
    }
}

module.exports = format