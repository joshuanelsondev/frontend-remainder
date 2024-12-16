const capitalizeStr = (str) => {
  if (!str) {
    return "";
  }
  let strArr = str.split(/(?=[A-Z])|(?<=\s)/);
  let capitalizedStrArr = strArr.map((strEle) =>
    strEle ? strEle[0].toUpperCase() + strEle.slice(1).toLowerCase() : ""
  );
  return capitalizedStrArr.join(" ");
};

export default capitalizeStr;
