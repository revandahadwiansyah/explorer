const formatter = require("@helpers/responseFactory");

function reconstructData(data) {
  try {
    return Object.values(data);
  } catch (error) {
    console.error(JSON.stringify(error));
    return false;
  }
}

function removeDuplicates(data) {
  try {
    let uniqueArray = data.filter(function (elem, pos) {
      return data.indexOf(elem) == pos;
    });
    return Object.values(uniqueArray);
  } catch (error) {
    console.error(JSON.stringify(error));
    return false;
  }
}

function dateFormat(date, yearFormat = false, timeFormat = false) {
  try {
    let d = new Date(date);
    let Y = d.getFullYear();
    let M = ("0" + (d.getMonth() + 1)).slice(-2);
    let D = ("0" + d.getDate()).slice(-2);
    //let D = d.getDate()

    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    let ymd = [Y, M, D].join("-");
    let hms = [h, m, s].join(":");
    let ymdhms = [ymd, hms].join(" ");

    if (yearFormat == true && timeFormat == true) {
      return date;
    }

    if (yearFormat == true) {
      return ymd;
    }

    if (timeFormat == true) {
      return hms;
    }

    return false;
  } catch (error) {
    console.error(JSON.stringify(error));
    return false;
  }
}

module.exports = {
  reconstructData,
  removeDuplicates,
  dateFormat,
};
