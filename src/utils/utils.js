export const scrollToRef = (ref) =>
  window.scroll({ top: ref.current.offsetTop, left: 0, behavior: "smooth" });
