export default () => {
  if (!document) return
  
  document.documentElement.setAttribute(
    "theme",
    localStorage.getItem("theme") || "light"
  );
  document.documentElement.setAttribute(
    "font",
    localStorage.getItem("font") || "medium"
  );
}