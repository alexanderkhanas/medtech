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

export const cartesianProduct = (obj) => {
  function product(args) {
    if (!args.length) return [[]];
    const prod = product(args.slice(1));
    const r = [];
    args[0].forEach((x) => {
      prod.forEach((p) => {
        r.push([x].concat(p));
      });
    });
    return r;
  }
  const keys = Object.keys(obj);

  const values = keys.map((x) => {
    return obj[x];
  });

  return product(values).map((p) => {
    const e = {};
    keys.forEach((k, n) => {
      e[k] = p[n];
    });
    return e;
  });
};
