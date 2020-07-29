export const scrollToRef = (ref, range = 0) =>
  window.scroll({
    top: ref.current.offsetTop + range,
    left: 0,
    behavior: "smooth",
  });

export const getLocalCart = () =>
  JSON.parse(localStorage.getItem("_cart") || "[]");
