export const scrollToRef = (ref, range = 0) =>
  window.scroll({
    top: ref.current.offsetTop + range,
    left: 0,
    behavior: "smooth",
  });

export const getLocalCart = () =>
  JSON.parse(localStorage.getItem("_cart") || "[]");

export const debounce = (fn, ms) => {
  let timer;
  return (...props) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, ...props);
    }, ms);
  };
};

export const getToken = () => {
  return document.cookie.includes("token")
    ? document.cookie
        .split("; ")
        .filter((value) => value.startsWith("token"))[0]
        .split("=")[1]
    : null;
};

export const getAdminToken = () => {
  return document.cookie.includes("aToken")
    ? document.cookie
        .split("; ")
        .filter((value) => value.startsWith("aToken"))[0]
        .split("=")[1]
    : null;
};
