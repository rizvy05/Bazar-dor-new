export default async function CurrentDate() {
  "use cache";

  const dateStr = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <span className="text-xs text-gray-500 font-medium">
      {dateStr}
    </span>
  );
}