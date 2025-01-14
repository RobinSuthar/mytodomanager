export function Time() {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = date + "  " + month + " " + year;
  return <div>{currentDate}</div>;
}
